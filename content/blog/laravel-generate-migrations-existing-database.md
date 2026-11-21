---
title: "Generating Laravel Migrations When Production Has Drifted"
seo_title: "Laravel Generate Migrations From an Existing Database"
seo_description: "Generate a Laravel migration with make:migration; from an existing database, use migrate:generate or schema:dump. If production drifted, guard the gaps instead."
slug: laravel-generate-migrations-existing-database
target_query: laravel generate migration
service: full-stack-development
case_study: the-gala-events-marketplace
status: published
published: 2026-11-21
updated: null
---

> **Short answer**
> - One new migration: `php artisan make:migration create_flights_table`. From an existing database: `composer require --dev kitloong/laravel-migrations-generator`, then `php artisan migrate:generate`. Laravel's own option is `php artisan schema:dump`.
> - Both of those replace your history with a snapshot. That is fine for a project with no migrations. It is risky when servers already have a `migrations` table pointing at the old files.
> - On an inherited booking marketplace whose tables had been changed by hand, we kept the history instead: about a dozen guarded migrations plus one alignment migration.
> - It was proven three ways: an empty database built from the migrations matched staging on about 55 tables with **0 differences**, and on copies of staging and production the new migrations changed **nothing**.

To generate a migration in Laravel, run `php artisan make:migration` with a name that describes the
change. To generate migrations from a database that already exists, install a generator such as
`kitloong/laravel-migrations-generator` and run `php artisan migrate:generate`, or let Laravel write a
single SQL snapshot with `php artisan schema:dump`. Those answers assume the database is the only truth.
The rest of this post is about the harder case: a production database that had drifted away from
migrations that already existed, on a Saudi booking marketplace I took over in 2026, and how the
migrations were made to rebuild it without throwing the history away.

## How do you generate a migration in Laravel?

`make:migration` writes a timestamped file to `database/migrations`. Laravel reads the name to guess the
table, and `--create` or `--table` set it explicitly:

```bash
php artisan make:migration create_flights_table
php artisan make:migration add_votes_to_users_table --table=users
php artisan make:migration create_flights_table --create=flights
```

The timestamp in the filename decides the order the migrations run in. That detail matters later in
this post. Run them with `php artisan migrate`; Laravel records each file it ran in the `migrations`
table, with a batch number, so it never runs the same file twice.

## How do you generate Laravel migrations from an existing database?

There are two tools people reach for. They do different things.

**A generator package.** `kitloong/laravel-migrations-generator` reads the live schema and writes one
migration per table, then a separate pass for foreign keys. It supports MySQL, MariaDB, PostgreSQL,
SQL Server and SQLite:

```bash
composer require --dev kitloong/laravel-migrations-generator

# every table
php artisan migrate:generate

# only some tables, or skip some
php artisan migrate:generate --tables="flights,airports"
php artisan migrate:generate --ignore="logs"

# record the new files in the migrations table as batch 0, or don't record them at all
php artisan migrate:generate --log-with-batch=0
php artisan migrate:generate --skip-log
```

> **Note:** The current 7.x releases (7.1 onwards) need Laravel 11, 12 or 13 and PHP 8.2. On Laravel 10,
> Composer will pick an older release that fits; check the version it installs before relying on an option.

**Laravel's schema dump.** `schema:dump` writes the current schema to an SQL file in `database/schema/`,
named after the connection (`mysql-schema.sql`). When you migrate a database where no migrations have run,
Laravel loads that file first and then runs any migrations newer than the dump. `--prune` also deletes the
existing migration files:

```bash
php artisan schema:dump
php artisan schema:dump --prune
```

It works on MySQL, MariaDB, PostgreSQL and SQLite, and it shells out to the database's command-line
client, so `mysqldump` (or `pg_dump`) has to be installed wherever you run it.

## When generating migrations is the wrong fix

Both tools answer "what does the database look like right now?" and turn the answer into the new
starting point. If the project has no migrations at all, that is exactly what you want.

It gets awkward when the project already has migrations and environments that ran them. A generator
writes new files with new timestamps; every existing server needs those files marked as already run, or
the next `migrate` tries to create tables that exist. A pruned schema dump deletes the files those servers'
`migrations` tables refer to. And both snapshot **one** database. If staging and production differ from each
other, a snapshot of one quietly becomes the truth for both.

That was the situation on the marketplace.

## What does schema drift look like on an inherited Laravel app?

The app is Laravel 10 on MySQL, built by a previous team. Their whole history arrived as a single commit on
12 September 2025, with under 40 migration files. For years, tables had been changed by hand on the servers
while the migration files kept describing the original design.

Nobody noticed, because nothing ever built the database from empty. The signs came one at a time:

- **The first Git-based deploy failed** (4 June 2026), straight after we imported the old server's database
  into a managed one: `SQLSTATE[42S01]: Base table or view already exists: 1050 Table 'promo_codes' already
  exists`. A handful of tables existed without a row in `migrations`. The fix for that part was to insert the
  missing rows, so Laravel knew those files had already run:

  ```sql
  INSERT INTO migrations (migration, batch)
  VALUES ('2024_05_02_101500_create_promo_codes_table', 1);
  ```

- **Staging and production disagreed** (20 September 2026). Staging had columns production lacked. They traced
  back to three migrations whose files had never been committed, and production was about 20 migrations
  behind staging.
- **`php artisan migrate` on an empty database failed** (24 September 2026) at a newer migration that placed a
  column `after()` an `orders` column no migration had ever created. Two old migrations also created foreign
  keys to tables that a later-dated migration creates, so even the order was wrong.

## How to make migrations match a drifted production database (and keep history)

The direction mattered most. The servers' shape won, not the migration files. The app runs on that shape, and
some of it can't be converted without rewriting code: one column holds comma-separated ids in a `varchar`, a
booking date is stored as a `varchar`, and one table had been reshaped into a copy of another. "Fix the
database to match the code" was not an option.

I did it in four steps, on 24 September 2026, all against copies or over a read-only connection.

**1. Dump both schemas.** Columns, types, nullability, defaults, indexes and foreign keys for staging and
production, plus each `migrations` table. For production that meant the schema only, no data, copied locally
with `SHOW CREATE TABLE` over the read-only connection. If you want to diff two servers yourself, a query like
this gives you one comparable line per column:

```sql
SELECT table_name, column_name, column_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = DATABASE()
ORDER BY table_name, column_name;
```

**2. Guarded migrations for what only the servers had.** About a dozen of them, each dated to sit right after
the migration that creates its table, so a fresh build adds the column before anything later refers to it.
Each one checks before it adds, so on staging and production, which already have the column, it does nothing:

```php
// Dated just after the orders table's create migration.
public function up(): void
{
    if (! Schema::hasColumn('orders', 'venue_notes')) {
        Schema::table('orders', function (Blueprint $table) {
            $table->text('venue_notes')->nullable();
        });
    }
}

/** Nothing to undo: on deployed databases this column predates the migration and holds real data. */
public function down(): void
{
}
```

The same pattern, with `Schema::hasTable`, created the few tables that existed only on the servers.

**3. One alignment migration for definitions changed by hand.** Columns that existed in both places but
differed in type, nullability or default. It lists about 30 column definitions exactly as the servers have
them, reads each live definition from `information_schema`, and alters only the ones that differ. It also drops
five foreign keys, three indexes and eight columns that the old files create but the servers never had. Every
change it makes is logged. A trimmed version:

```php
/** [table, column, type, nullable, default] exactly as on the deployed databases. */
private const COLUMNS = [
    ['bookings', 'event_date', 'varchar(255)', false, null],
    ['listings', 'category_ids', 'varchar(255)', true, null],
    ['settings', 'vat', 'smallint unsigned', false, '0'],
    // ...
];

public function up(): void
{
    foreach (self::COLUMNS as [$table, $column, $type, $nullable, $default]) {
        $current = DB::selectOne(
            'SELECT column_type, is_nullable, column_default FROM information_schema.columns
              WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?',
            [$table, $column]
        );

        if ($current === null || $this->matches($current, $type, $nullable, $default)) {
            continue; // already the deployed shape: a no-op on staging and production
        }

        $definition = $type.($nullable ? ' NULL' : ' NOT NULL')
            .($default === null ? '' : ' DEFAULT '.DB::getPdo()->quote($default));
        Log::info("align: MODIFY $table.$column $definition");
        DB::statement("ALTER TABLE `$table` MODIFY `$column` $definition");
    }
}
```

> **Warning:** A migration that queries `information_schema` is MySQL-specific. When the team tried running
> this app's test suite on in-memory SQLite (14 September 2026), migrations that query `information_schema`
> produced dozens of errors and the idea was dropped. If your tests use SQLite, guard these checks by driver or test on MySQL.

**4. Prove it three ways.** This is the step the generator posts skip, and the only reason to trust the result:

| Check | Result |
|---|---|
| Empty database → `php artisan migrate` → compare with staging | Identical on about 55 tables, **0 differences** |
| Copy of staging → run the new migrations | **0 changes** logged |
| Production's schema + its pending migrations (about 45) → compare with staging | Identical to staging |

The third check rehearses production's next deploy: production lands exactly where staging is.

## Did the guarded migrations break existing environments?

No, and by design. On a server that already has a column, `Schema::hasColumn` returns true and the migration
only adds a row to `migrations`. The alignment migration compares before it alters, so on staging and on the
production rehearsal it logged no changes at all. Their `down()` methods are empty on purpose: on a live
database those columns hold real bookings, and rolling back must never drop them.

Two things were left open deliberately and written down: the foreign keys the servers lack (adding them needs
the data checked first, so it is a separate change), and column collations and column order, which were not
compared. A proof is only as wide as what you compared; say what you didn't.

> **Tip:** Write the rule down once the gap is closed. The project's schema notes now say every schema change
> goes through a migration, never by hand on a server. That one line is what stops the drift coming back.

## What about Laravel schema drift tools?

Laravel Schema Sentinel (covered by Laravel News on 1 May 2026) builds a shadow database from your migrations,
diffs it against the live schema and can write a corrective migration. It is worth a look on Laravel 11 to 13.
Two caveats: it treats the migrations as the truth and corrects the database toward them, which is the
opposite of what this app needed, and the app runs Laravel 10, which it doesn't support.

## Which way should you generate your Laravel migrations?

- **No migrations at all, one database:** run `migrate:generate` (or `schema:dump`), commit the result, and log
  it as already run on that server.
- **Migrations exist but are bloated, no drift:** `schema:dump --prune` is the built-in way to squash them.
- **Migrations exist, servers were edited by hand:** keep the history. Add guarded migrations for what only the
  servers have, align changed definitions with a compare-then-alter migration, and prove an empty build matches
  the servers before you call it done.

The repo now has about 170 migration files, and a new environment builds from empty with
`php artisan migrate`.

## Taking over a Laravel app with a database nobody can rebuild?

This was one part of taking over the marketplace: the deploys, the database and the money flow were rebuilt
around it. Work like this is part of my [full-stack development service](/services/full-stack-development),
and the whole project is in the [events marketplace case study](/work/the-gala-events-marketplace).

If your migrations no longer build your database, [get in touch](/contact) and tell me what `migrate` says on
an empty one.
