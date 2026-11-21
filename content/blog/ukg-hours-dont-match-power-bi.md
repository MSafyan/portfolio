---
title: "Dashboard Hours Don't Match UKG? Reconcile First"
seo_title: "UKG Hours Don't Match Your Power BI Report? Reconcile First"
seo_description: "If Power BI hours don't match UKG, reconcile the raw table to UKG's report first. Then check the view for dropped overhead, broken job numbers and Premium Pay."
slug: ukg-hours-dont-match-power-bi
target_query: ukg hours don't match power bi report
service: data-engineering
case_study: palmetto-data-warehouse
status: published
published: 2026-11-27
---

> **Short answer**
> - Start by totalling the raw UKG table by year and comparing it with UKG's own report. Ours matched to two decimal places for 2023, 2024 and 2025 to date, so the copy wasn't the problem.
> - Then check what the reporting view drops. Ours skipped every row without a job number, which was overhead and admin time and about a quarter to a third of all hours.
> - One project showed around 80 hours on the dashboard and about 790 in UKG. The view rebuilt job numbers from separate fields, and the leading zeros were missing.
> - UKG's Premium Pay counters repeat hours that are already counted. Keep them in their own columns, out of the total.

A US mechanical contractor tracks field and office time in UKG. Its Power BI dashboards compare those hours with each project's budget. In late 2025 the dashboard said the company was beating its labour estimates by more than 1,700%. No crew is that fast. The hours were wrong, and the first question was where.

## Why don't the hours in Power BI match UKG?

Because there are several steps between the timecard and the chart, and each one can lose or add hours. Here the path was:

1. UKG produces a time report with one row per employee, day and pay counter (Regular, Overtime, Premium Pay and so on).
2. The vendor that runs the company's project-management app imports that report into its PostgreSQL database.
3. Azure Data Factory copies those tables into the Azure SQL warehouse every night.
4. A SQL view sums the hours per project and department, a weekly procedure snapshots them, and Power BI reads the snapshot.

I didn't call the UKG API. The data arrived as a report someone else imported. So "the dashboard is wrong" could mean a bad import, a failed copy, a wrong view or a wrong measure. Guessing is slow. Reconciling one step at a time is quick.

## Step 1: reconcile the raw UKG table to the UKG report

Before you touch a view or a DAX measure, prove the raw data is complete. Ask whoever owns UKG for the total hours per year from UKG itself, then total the raw table the same way:

```sql
SELECT YEAR(counter_date) AS yr,
       SUM(counter_hours) AS hours,
       COUNT(*)           AS rows
FROM ukg_time_raw
WHERE counter_date < '2025-09-01'
GROUP BY YEAR(counter_date)
ORDER BY yr;
```

The raw table matched UKG to two decimal places for 2023, 2024 and January to August 2025. That one query ruled out the import and the copy for the whole history, and it took minutes.

> **Note:** Our first version added approved time off from a separate table and came out about 17,000 hours too high for 2024. UKG's figure didn't include that time off. Make sure you know exactly what the number you're matching includes before you call it a mismatch.

## Step 2: find the hours your view drops

The raw table was right, but the view was low: about 83,000 hours short for 2024. The reason was the job number. Every UKG row carries a branch, a project number, a month and a year in separate fields, and the view joined them into a job number. Overhead time doesn't belong to a project, so those fields are empty, and the view dropped the row.

```sql
SELECT YEAR(counter_date) AS yr,
       SUM(counter_hours) AS all_hours,
       SUM(CASE WHEN ISNULL(branch_path, '') = '' OR ISNULL(number_path, '') = ''
                OR month_path IS NULL OR year_path IS NULL
                THEN counter_hours ELSE 0 END) AS hours_without_job
FROM ukg_time_raw
GROUP BY YEAR(counter_date);
```

Between a quarter and a third of all hours each year had no job number. These were overhead hours not assigned to a project; the rows we sampled were field, office/admin, pre-construction and estimating time booked to a branch with no project number. Leaving it out of a project-hours chart is correct. Leaving it out of a total-hours chart is not. Decide which question each visual answers, and label the overhead instead of hiding it.

## Why did one project show 80 hours instead of 790?

The 1,700% figure came from project hours, so we took one project and went down to row level. UKG's timecard report showed about 790 hours for job `HOU017-03-25`. The dashboard showed around 80, about 90% missing.

First, we ruled out the copy. Both PostgreSQL and Azure SQL had roughly 170,000 raw rows going back to October 2022, the same count on each side. Nothing was lost in transit.

Then we compared job numbers. Projects are stored with padded numbers like `HOU017-03-25`. Many raw UKG rows held the parts without padding: project `17` instead of `017`, month `3` instead of `03`. The view joined them as they were and got `HOU17-3-25`, which doesn't match any project. Those hours stayed in the warehouse but belonged to no project, so the dashboard never counted them. The 80 hours that did match were all from the last week the UKG report covered, which suggests only the newest rows arrived padded.

On another project the pattern was exact: `SAT3-8-25` existed only in one table and `SAT003-08-25` only in the other, with the same total of about 320 hours in each.

To find every affected row, match on the numbers, not the text:

```sql
SELECT counter_date, counter_hours, counter_name,
       CONCAT(branch_path, number_path, '-', month_path, '-', year_path) AS as_built,
       CONCAT(branch_path,
              RIGHT('000' + CAST(CAST(number_path AS int) AS varchar), 3), '-',
              RIGHT('00'  + CAST(CAST(month_path  AS int) AS varchar), 2), '-',
              year_path) AS padded
FROM ukg_time_raw
WHERE branch_path = 'HOU'
  AND TRY_CAST(number_path AS int) = 17
  AND TRY_CAST(month_path  AS int) = 3
  AND year_path = '25';
```

Then join the rebuilt job numbers to the project table and list the ones that don't match. That list is the size of the problem across every project, not just the one someone noticed.

> **Tip:** Fix formatting where the data comes in, not in every report. Here the import was corrected at the source, and the check afterwards is one query comparing the raw and logged hours for the same job number. If you can't change the import, pad the parts in the view before the join, once.

## Do Premium Pay hours count twice?

They can. A UKG counters report has one row per pay counter, and Premium Pay is extra pay on hours already worked, not more hours. In a sample export, every Premium Pay row sat on a day when the same person already had regular hours, and almost all of them carried exactly the same number of hours. Add up every counter and those hours count twice. In that sample, total hours came out about half as high again as they should have.

The fix in the view was to keep Premium Pay and Premium Pay OT in their own columns and leave them out of the department and total hours:

```sql
CASE WHEN department_path = 'Field'
      AND (counter_name IS NULL OR counter_name NOT LIKE '%Premium Pay%')
     THEN counter_hours ELSE 0 END                                       AS field_hours,
CASE WHEN counter_name = 'Premium Pay'    THEN counter_hours ELSE 0 END  AS premium_pay_hours,
CASE WHEN counter_name = 'Premium Pay OT' THEN counter_hours ELSE 0 END  AS premium_pay_ot_hours,
CASE WHEN counter_name IS NULL OR counter_name NOT LIKE '%Premium Pay%'
     THEN counter_hours ELSE 0 END                                       AS total_hours
```

Finance still sees the premium hours. They just aren't added to the hours worked.

> **Warning:** Your UKG setup may name its counters differently or have other combined codes. List the distinct `counter_name` values in your raw table and ask payroll which ones are hours worked and which are pay on top.

## What if timecards change after the import?

After the job numbers and Premium Pay were fixed, a few hours on one day still differed between UKG and the database for two employees. UKG had more hours than the copy. We didn't confirm the cause, but the likeliest one is a timecard edited in UKG after the report was imported. An import that only adds new rows never picks up the change. If you see small, date-specific gaps like this, ask whether the import reloads past pay periods and how far back.

## A checklist for UKG hours in Power BI

| Check | What it rules out |
|---|---|
| Raw table total per year = UKG report total | Import and copy problems |
| Row counts match between source and warehouse | Failed or partial syncs |
| Hours with no job number, per year | Overhead silently dropped by the view |
| Rebuilt job numbers that match no project | Formatting gaps such as missing leading zeros |
| Distinct counter names, and which ones are hours | Premium or combined pay counted twice |
| Small gaps on specific dates | Timecards edited after the import |

Each check is one query, and you run them in order. By the time you reach the DAX, the numbers going in are already right.

## Work with me

I build and fix Azure data warehouses where hours, projects and money come from different systems and still have to add up. See my [data engineering service](/services/data-engineering) and the [case study for this contractor's warehouse](/work/palmetto-data-warehouse). If your dashboard and UKG disagree, send me both numbers and I'll help you find where the hours go.
