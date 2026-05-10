## Quick Reference — CVR Sports Analytics (Rugby League Platform)
- Built a rugby league analytics platform for NRL, Super League, and NSW Cup with a CQRS-style architecture: metrics materialized at XML ingestion time, not recomputed on every read
- Computed event-derived metrics (yardage errors, penalties, team tackles) once during ingestion and persisted on team records — eliminating repeated raw-event scans and reducing query complexity substantially
- Upgraded frontend from Angular 9 to Angular 17: removed legacy OpenSSL dependency, updated AG Grid, fixed visual regressions in competition tables, and improved build tooling
- Added async XML upload with background job polling (`uploadJob` model), decoupling upload latency from data processing and improving reliability for large match files
- Implemented PDF export across all major report views using html2canvas + jsPDF with cloned DOM mutation — live page is never modified during export
- Designed compound MongoDB indexes aligned to real filter query shapes; used `distinct()` + parallel execution for filter endpoints to minimize UI latency
- Stack: Node.js, MongoDB, Angular 17, PDF export (html2canvas + jsPDF)

---

# CVR / NRL Platform Analysis


Developed a comprehensive sports analytics system for professional rugby league. The platform analyzes match data from major competitions like the NRL, Super League, and NSW Cup, transforming raw game statistics into meaningful insights for coaches and analysts. What makes this system unique is its ability to calculate complex performance metrics like player coverage (CVG) and conduct precise yardage error analysis by tracking team field positions throughout matches. The application features intelligent filtering that lets users drill down through competitions, seasons, and individual rounds.



Skills and deliverables

Node.js
MongoDB
Database Optimization
Data Analysis
Angular 17
PDF Export

## Scope

This analysis is based on:

- Frontend repo: `CVR-NRL-FE`
- Backend/API repo: `/Users/capital/Documents/Lancing/qasim/will/workspace/2022354wRv-API`

The system is a reporting and data-management platform for rugby league performance data. The core value is not CRUD alone. It is the ability to ingest raw XML or CSV match data, normalize it, pre-calculate rugby-specific KPIs, and expose read-optimized report endpoints for coaches, analysts, and admins.

## Executive Summary

The architecture shows a clear senior-engineering direction:

1. Raw match data is transformed into analytics-ready collections instead of forcing every report to scan raw event data.
2. The backend is organized around report-specific read models, not generic endpoints.
3. MongoDB usage is intentionally optimized around actual filter combinations and aggregation shapes.
4. The frontend is structured as a report client, with stateful filters, typed service contracts, and async upload orchestration.
5. A major storage and compute-cost improvement was to stop treating event data as the primary reporting store. Instead, important team metrics are derived during XML processing and persisted once.

The result is a pragmatic CQRS-style shape:

- Write path: ingest, normalize, calculate, persist at useful grains.
- Read path: query already-shaped collections with focused aggregations.

## Product / Domain Model

The platform works across several data grains:

- `player`: one record per player per match
- `team`: one record per team per match
- `teamquarter`: one record per team per quarter
- `teamtenmin`: one record per team per 10-minute period
- `match-event`: optional raw event grain, now de-emphasized in the main XML ingestion path
- `uploadJob`: operational metadata for async upload processing

This is a strong domain modeling decision. Different report screens need different grains. Instead of making every request derive quarter or period summaries from raw events, the system materializes those views during ingestion.

## Frontend Architecture

The frontend was upgraded from Angular 9 to Angular 17.3.x. The upgrade moved the app off `NODE_OPTIONS=--openssl-legacy-provider` (previously required due to legacy OpenSSL dependencies), pinned Node to 20.15.1 via `.nvmrc`, and removed a number of unused packages from the dependency tree (including old AG Grid community packages, `ng2-date-picker`, `mdb-ui-kit`, `xml-js`, and others). AG Grid was updated to match the Angular 17 ecosystem and required scoped grid theme overrides to correct visual regressions on the competitions table (header height, row spacing, progress-bar cell sizing).

### 1. Angular application is organized around workflows, not just pages

`src/app/app-routing.module.ts` wires the system into clear analyst/admin flows:

- admin data upload and competition restriction management
- competition/team/player exploration
- new team reports
- new player reports
- Top 10s ranking workflows

This is not a toy Angular app. It is effectively an internal analytics console with role-gated operations.

### 2. Cross-cutting concerns are centralized

`src/app/app.module.ts` registers:

- `JwtInterceptor`
- `LoaderInterceptor`
- `ErrorInterceptor`

This is a standard senior pattern: auth, loading state, and error handling are enforced once rather than repeated in every component.

### 3. Service layer acts as an API facade

The frontend does not let components manually build URLs everywhere. It centralizes API communication in:

- `src/app/_services/account.service.ts`
- `src/app/_services/report.service.ts`
- `src/app/_services/player-report.service.ts`
- `src/app/_services/top10s.service.ts`
- `src/app/_services/upload.service.ts`

This gives three benefits:

- shared parameter handling
- stable contracts between UI and API
- easier future backend changes

`report.service.ts` is especially important. It maps selection state into API params and converts API responses into UI-friendly structures. This is evidence of a frontend acting as a composition layer, not a dump of HTTP calls.

### 4. Filter UX is stateful and server-driven

The newer report flows depend on server-generated filter sets instead of hardcoded dropdowns:

- `account.service.ts` calls `/filter/players/enhanced` and `/filter/players/report`
- `new-report.component.ts` loads and reloads filters based on user selection
- `new-player-reports.component.ts` refreshes filters only when competition/season/player state actually changes
- `filter-state.service.ts` persists selections in localStorage

This is an important design choice:

- the backend owns valid filter combinations
- the frontend owns interaction state and persistence

That separation reduces invalid query states and cuts down unnecessary requests.

### 5. PDF export is supported across all major report views

PDF export was added to the platform using `html2canvas` + `jsPDF` + `jsPDF-autotable`. A shared `pdf.service.ts` centralizes the export logic and supports:

- progress callbacks for UI feedback
- per-page sequence capture
- cloned DOM mutation via `onclone` (spacers are injected before export so the live page is never permanently modified)
- export timing logs in the browser console for performance inspection

Views with PDF export:

- `/new-reports` — `all-reports` sections are marked with `data-pdf-section`, page-break spacers are inserted into the cloned DOM, and a time-based progress bar is displayed near the toolbar
- `/top10s` — uses timed progress behavior calibrated to measured `html2canvas` durations (~13–18s per page)
- `/competitions` and `/new-player-reports` — export supported

Key performance finding: `html2canvas` DOM rasterization is the dominant cost. `jsPDF.save()` and JPEG encoding are negligible. Multi-page exports using per-page `html2canvas` calls degrade quickly on chart-heavy views, so the current approach prefers single-capture exports with page-break preparation over repeated per-page captures.

### 7. Async upload UX is a serious operational improvement

`upload.service.ts` and `rowdata/add-file.component.ts` show that file upload is no longer treated as a naive synchronous request. The frontend:

- submits XML uploads once
- receives a `jobId`
- polls `/upload-status/:jobId`
- updates progress based on actual backend processing

This is a strong operational pattern for long-running ingestion. It improves user trust, avoids browser timeouts, and decouples upload latency from data processing latency.

## Backend Architecture

### 1. Express app is tuned for heavy file ingestion and analytics workloads

`/Users/capital/Documents/Lancing/qasim/will/workspace/2022354wRv-API/app.js` shows several production-oriented choices:

- long request/response/server timeouts for large uploads
- large body limits
- upload middleware with explicit file count and size limits
- Mongo connection pooling with tuned timeouts
- route separation by feature area

This is a backend built for ingestion + analytics, not only request/response CRUD.

### 2. The backend uses specialized controllers, not one generic reporting endpoint

Important read controllers include:

- `analytics.controller.js`
- `player-report.controller.js`
- `filters.controller.js`
- `top10s.controller.js`

This matters because analytics workloads often need endpoint-specific pipelines. Trying to hide all of this behind one generic reporting endpoint usually produces slow queries, over-fetching, or unmaintainable query builders.

### 3. Helper layer standardizes reporting logic

`player-report-helper.js` centralizes:

- query parameter normalization
- case-insensitive player matching
- gender-aware filtering
- date sorting expressions
- default-position resolution
- selected filter response shaping

This is a mature pattern. It keeps controller logic from fracturing into slightly different interpretations of the same rule.

## MongoDB Data Modeling Strategy

The most important backend design decision is that MongoDB is used as an analytics store with pre-shaped documents, not just a raw event archive.

### Collections by reporting grain

- `player` supports player tables, comparisons, Top 10s, positional reports
- `team` supports team comparison, season progress, KPI rankings
- `teamtenmin` supports period-based analytics
- `teamquarter` supports quarter breakdown reporting
- `match-event` exists for specific event-level workflows, but is no longer the default source for mainstream reporting

This reduces query complexity substantially. A team-season report should not have to reconstruct itself from tens of thousands of tackle, penalty, and error events every time.

## MongoDB Query Patterns and Optimizations

### 1. Materialized analytics views instead of repeated raw-event scans

The strongest optimization is in `/Users/capital/Documents/Lancing/qasim/will/workspace/2022354wRv-API/script/index.js`.

During XML processing, the script computes:

- `yardageErrors`
- `yardagePenalties`
- `teamTackles`

These are calculated from `eventDump` before the team CSV is written, then injected into team records.

That means expensive event interpretation is done once during ingestion, not repeatedly during every report query.

This is then persisted onto the `team` model as:

- `yardage_errors`
- `yardage_penalties`
- `team_tackles`

This directly improves:

- storage cost, because raw event persistence can be avoided in the main path
- query latency, because team reports can aggregate already-derived numeric fields
- compute cost, because the event-to-metric transformation is paid once at write time

### 2. Main XML ingestion path intentionally skips match-event persistence

In `/Users/capital/Documents/Lancing/qasim/will/workspace/2022354wRv-API/app/controllers/xml.controller.js`, player, team, quarter, and ten-minute records are processed, but match-event ingestion is commented out in the async XML path.

That is the clearest proof of the storage/cost optimization:

- the platform still generates `-Match-Events.csv`
- the backend keeps a `match-event` model and controller for targeted use cases
- but the normal XML upload flow does not persist match events into MongoDB

This is a strong senior tradeoff:

- keep raw events available as an escape hatch
- do not pay permanent database cost for data that most product screens do not need

### 3. Report-specific compound indexes based on real filter shapes

The models contain targeted compound indexes, for example:

- `player`: `competition_name + season`, `source_team + season`, `player + competition_name + season`, `competition_name + season + source_team + round`
- `team`: `competition_name + season`, `source_team + season`, `match_name + source_team`, `file_name`
- `teamtenmin`: `competition_name + season`, `source_team + season`, `ten_min_period + result`
- `match-event`: indexes centered around `file_name`, `level_0`, `team`, `period`
- `uploadJob`: `status + createdAt`, `userId + createdAt`

These are not random indexes. They align with actual filters seen in:

- filter endpoints
- team comparison lookups
- linespeed and period endpoints
- upload status polling

This is the correct MongoDB mindset: index the access patterns, not every field.

### 4. Use of projections to reduce document transfer and memory pressure

Many read paths intentionally project only the fields the frontend needs.

Examples:

- player season progress selects only round, result, CVG, negs, position, team, season, competition
- team season progress selects only round, opponent, result, CVG, and negs
- analytics match endpoints define explicit projection objects before querying

This reduces:

- network payload
- Node memory pressure
- Mongoose hydration overhead

### 5. `lean()` is used where model instances are unnecessary

Examples include:

- helper-level existence checks
- export / batch query paths
- multi-model fetches for deletion/export workflows

This is a practical optimization. When there is no need for document methods or change tracking, `lean()` avoids expensive Mongoose document construction.

### 6. Parallel query execution for independent reads

The code uses `Promise.all` in several important places:

- source team and opponent player queries
- enhanced filter distinct queries
- multi-model retrieval for team/teamquarter/teamtenmin workflows

This lowers end-to-end latency because independent MongoDB operations are not serialized unnecessarily.

### 7. `distinct()` is used heavily for filter endpoints

The filter controllers favor `distinct()` plus targeted query objects over fetching full documents and deduplicating in memory.

That is the correct approach for:

- competitions
- seasons
- positions
- rounds
- player names

The enhanced player-report filter endpoint also applies `maxTimeMS(60000)` to each distinct query and executes them in parallel. That is a deliberate stability improvement for large datasets.

### 8. Aggregation pipelines are aligned with report semantics

The backend does not over-normalize analytics logic into application code. It pushes grouping, averaging, sorting, and rank preparation into MongoDB pipelines across specialized controllers:

**`analytics.controller.js`**
- `getTeamComparison`
- `getTeamLinespeed`
- `getTeamSummaryStatsData`
- `getTeamPlayerRankings`
- `getTeamSeasonProgress`
- `getTeamKpiRankings`
- `getTeamKpiHistory`
- `getTenMinuteAnalytics`
- `getPlayerAnalyticsOneMatch`
- `getPlayerAnalyticsOneSeason`

**`player-report.controller.js`**
- `getPlayerSeasonProgress`
- `getPositionalTop10`
- `getPerformancesVsOpposition`
- `getPositionPercentile`
- `getPlayerByPosition`
- `getRoundByRound`
- `getPlayerStatsComparison`
- `getCareerBySeason`
- `getCareerByCompetition`
- `getCumulativeCVG`

**`top10s.controller.js`**
- `getTop10s`

This is a good use of MongoDB aggregation because:

- the data is already denormalized enough for pipeline work
- group/avg/sort operations belong close to the data
- it avoids shipping raw rows to Node for re-aggregation

### 9. Bounded execution for expensive pipelines

Heavy aggregations commonly use:

- `allowDiskUse: true`
- `maxTimeMS: 60000`

That is an important operational guardrail. It prevents a single report from turning into an unbounded memory or time sink.

### 10. Self-join strategy is optimized for opponent comparison

`analytics.controller.js` uses `$lookup` from `teams` back into `teams` using:

- `match_name`
- `source_team`
- `season`
- `competition_name`
- `file_name`

This supports team-vs-opponent metrics without requiring a second query from the frontend or expensive application-side joins. The supporting index on `team.match_name + source_team` is a direct design match.

## MongoDB Performance / Cost Improvements Implemented

### A. Biggest win: do event interpretation once, not on every read

The XML script computes team-level event-derived metrics during ingestion:

- yardage errors
- yardage penalties
- team tackles

These are stored on the `team` document and then aggregated cheaply later.

This is a classic shift from repeated read-time compute to write-time materialization.

### B. Biggest storage win: main XML flow does not persist match events

The current async XML upload pipeline skips `match-event` insertion. This means:

- far fewer documents written per upload
- lower index bloat
- lower storage cost
- lower backup/restore cost
- less write amplification during ingestion

The system still preserves the option to process event data separately when a specific workflow truly requires it.

### C. Split collections by report grain

Instead of forcing reports to derive quarter and ten-minute summaries dynamically, the system persists:

- team match grain
- team quarter grain
- team 10-minute grain

This is both a performance optimization and a product optimization. Reports become simpler, faster, and more deterministic.

### D. Filter endpoints optimized for user interaction speed

Filter APIs are some of the most frequently hit endpoints in analytics UIs. The system improves them by:

- using `distinct()`
- querying in parallel
- indexing filter fields
- applying competition restrictions server-side
- returning sorted, normalized data

This reduces UI latency and avoids loading large result sets just to populate dropdowns.

### E. Operational scalability via upload jobs

`uploadJob` introduces an operational read model for ingestion state. That does not directly optimize analytical queries, but it does improve system throughput and reliability by moving long-running work off the critical request path.

## Senior Engineering Patterns Observed

### 1. Materialized read model pattern

The clearest pattern in the backend is materialized read models:

- `player`, `team`, `teamquarter`, and `teamtenmin` are purpose-built for report consumption
- event-derived team metrics are persisted on the read model

This is the right pattern for analytics-heavy products.

### 2. CQRS-like separation

This is not formal CQRS, but the direction is similar:

- ingestion path focuses on calculation and persistence
- read path focuses on endpoint-specific aggregations and projections

That separation keeps report logic fast and predictable.

### 3. Backend-owned defaults and interpretation

Examples:

- most frequent player position defaults
- gender-aware competition filtering
- `selectedFilters` reflecting actual applied filters

This is senior-level API design because the backend remains the source of truth for analytics semantics. The frontend displays what was actually applied instead of guessing.

### 4. Server-driven UI options

Enhanced filters and player-report filters are generated by the backend according to data availability and user restrictions. This avoids hardcoded frontend assumptions and keeps UX aligned with the data.

### 5. Operational resiliency over naive sync flows

Async XML uploads plus polling show good operational judgment. Large uploads and transformations should not rely on a single synchronous request finishing quickly.

### 6. Progressive modernization without throwing away legacy code

The codebase still contains older CRUD-style controllers and newer analytics/reporting controllers. Instead of a full rewrite, improvements were layered onto the parts that matter most:

- new analytics endpoints
- new player-report API contract
- async uploads
- new Top 10s flow
- enhanced filter APIs

That is a practical senior approach in a working product.

## Areas Where Frontend and Backend Fit Well Together

The newer parts of the system show good contract design:

- frontend services send explicit filters
- backend returns data shaped for each view
- `selectedFilters` tells the UI what was actually applied
- filter endpoints return only valid, restricted options
- upload jobs expose operational progress for the UI

This reduces ambiguity and makes the product more explainable to end users.

## Notable Technical Debt Still Present

There is clear quality in the architecture, but some legacy debt remains:

- some write paths still use `Promise.all` with many `save()` calls rather than `insertMany` or bulk writes
- some legacy controllers still fetch hydrated documents where `lean()` could help
- the codebase mixes older and newer API styles
- `match-event` infrastructure still exists even though the main flow now avoids it

None of that invalidates the design. It just means the platform has evolved incrementally rather than through a full platform rewrite.

## Final Assessment

This project demonstrates solid senior-engineering decisions in the areas that matter most for an analytics platform:

- shape data at ingestion time
- store only the grains required for reporting
- avoid paying read-time cost for repeatedly derived metrics
- index for real query shapes
- use specialized aggregation endpoints instead of generic data dumps
- keep the frontend thin on business logic but strong on state management and UX

The strongest MongoDB improvement is the move away from raw event persistence as the primary reporting strategy. By computing important event-derived metrics in `script/index.js` and storing them directly on team records, the platform reduced MongoDB storage, reduced query complexity, and improved report response times while keeping raw-event support available only where it is genuinely needed.
