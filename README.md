# Morpheus Standard Dashboard Plugin

This plugin provides dashboard integration between [Morpheus Standard Dashboard](https://morpheusdata.com) and [Morpheus](https://morpheusdata.com). It enables standard home dashboards, cloud dashboards, cluster dashboards, activity widgets, workload widgets, task widgets, health widgets, backup widgets, and log widgets from within the Morpheus platform.

## Requirements

| Component | Minimum Version |
|-----------|----------------|
| Morpheus | 8.1.0 |

## Installation

1. Download the latest `.jar` from the [Releases](https://github.com/HewlettPackard/morpheus-dashboards/releases) page, or [build it yourself](#building).
2. In Morpheus, navigate to **Administration → Integrations → Plugins**.
3. Click **Browse** and upload the `.jar` file.
4. The **Morpheus Home Dashboard** dashboards and dashboard widgets will appear after the plugin loads.

## Configuration

No connection settings are required. Once the plugin loads, the standard dashboards and dashboard widgets are available in the Morpheus UI.

## Features

### Dashboard Providers
The plugin registers the following dashboard providers:

- **Default Home Dashboard** — standard home dashboard layout
- **Default Cloud List Dashboard** — cloud-focused dashboard layout
- **Default Cluster List Dashboard** — cluster-focused dashboard layout

### Activity and User Widgets
The following dashboard item providers are registered for activity and user context:

- **Recent Activity** — recent Morpheus activity
- **User Favorites** — user favorites widget

### Workload, Cloud, and Group Widgets
The following dashboard item providers summarize workload and cloud inventory:

- **Instance Count** — total instance count
- **Instance Count by Cloud** — instance count grouped by cloud
- **Cloud Count by Type** — cloud count grouped by cloud type
- **Cloud Workload Counts** — workload counts grouped by cloud
- **Group Workload Counts** — workload counts grouped by group

### Cluster Widgets
The following dashboard item providers summarize cluster usage:

- **Cluster Workload Counts** — workload counts grouped by cluster
- **Cluster Type Counts** — cluster counts grouped by cluster type
- **Cluster Capacity** — cluster capacity summary

### Automation, Backup, Health, and Log Widgets
The following dashboard item providers expose operational summaries:

- **Job Execution Statistics** — job execution status counts
- **Backup Statistics** — backup status counts
- **Task Executions Over Time** — task execution trend widget
- **Workflow Executions Over Time** — workflow execution trend widget
- **Task Failures** — recent task failure summary
- **Task Execution Statistics** — task execution status counts
- **Current Alarms** — active alarm summary
- **Environment Count** — environment count summary
- **Current Health** — current Morpheus health summary
- **Log Count** — log count summary

## Building

```bash
./gradlew morpheus-home-dashboard-plugin:shadowJar
```

The plugin JAR will be written to `morpheus-home-dashboard-plugin/build/libs/`.

## License

Copyright 2024 Morpheus Data, LLC. Licensed under the [Apache License, Version 2.0](LICENSE).
