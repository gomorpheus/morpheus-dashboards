# Morpheus Standard Dashboard Plugin

The Morpheus Standard Dashboard Plugin provides a collection of customisable home dashboard widgets (items) for the Morpheus UI. It adds dashboard item providers for workload counts, cloud summaries, cluster capacity, backup statistics, log counts, task and job execution stats, recent activity, and user favourites.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Repository structure](#repository-structure)
- [Building the plugin](#building-the-plugin)
- [License](#license)
- [Installing](#installing)
- [Detailed Usage Steps](#detailed-usage-steps)
- [API Endpoints](#api-endpoints)

---

## Features

### Home Dashboard Widgets

Adds the following dashboard item providers to the Morpheus home dashboard:

- **Recent Activity** — summary of recent platform events
- **User Favourites** — quick-access links saved by the current user
- **Instance Count** — total running instances
- **Instance Count by Cloud** — instances grouped by cloud
- **Log Count** — recent log entry summary
- **Cloud Count by Type** — number of clouds grouped by cloud type
- **Cloud Workload Count** — workload distribution across clouds
- **Group Workload Count** — workload distribution across groups
- **Cluster Workload Count** — workload distribution across clusters
- **Cluster Type Count** — clusters grouped by type
- **Cluster Capacity** — cluster resource utilisation
- **Job Execution Stats** — automation job execution statistics
- **Task Execution Stats** — task execution statistics
- **Task Failures** — recent task failure summary
- **Backup Stats** — backup job summary and status
- **Current Alarms** — active monitoring alarms
- **Current Health** — platform health summary
- **Environment Count** — environments by status
- **Workflow Executions Over Time** — workflow execution trends

### Dashboard Provider

Provides a **Cluster List** dashboard view and a **Cloud List** dashboard view as additional dashboard layout options.

---

## Requirements

| Requirement | Version |
|-------------|---------|
| Morpheus | 8.1.0 or later |
| Java | 11 or later |
| Gradle | Use the included Gradle wrapper (`./gradlew`) |

---

## Repository structure

```
morpheus-home-dashboard-plugin/
├── build.gradle, gradle.properties    - Sub-module build configuration
└── src/main/groovy/com/morpheusdata/dashboard/
    ├── MorpheusHomeDashboardPlugin.groovy  - Plugin entry point; registers all item providers
    ├── *ItemProvider.groovy                - Individual dashboard widget implementations
    ├── clouds/
    │   └── CloudListDashboardProvider.groovy - Cloud list dashboard layout provider
    └── clusters/
        ├── ClusterListDashboardProvider.groovy  - Cluster list dashboard layout provider
        ├── ClusterTypeCountItemProvider.groovy
        ├── ClusterWorkloadCountItemProvider.groovy
        └── ClusterCapacityItemProvider.groovy
settings.gradle                            - Multi-module build definition
build.gradle, gradle.properties            - Root build configuration
```

---

## Building the plugin

Run the following command to compile and package the plugin jar:

```bash
./gradlew clean build
```

The packaged jar will be written to `morpheus-home-dashboard-plugin/build/libs/`.

To execute tests, use the following command:

```bash
./gradlew test
```

---

## License

This project is licensed under the Apache License 2.0.

See the [LICENSE](LICENSE) file for details.

---

## Installing

1. Build the plugin (see [Building the plugin](#building-the-plugin)) or download a released jar.
2. In Morpheus, navigate to **Administration > Integrations > Plugins**.
3. Click **Add** and upload the `morpheus-home-dashboard-plugin-<version>.jar` from `morpheus-home-dashboard-plugin/build/libs/`.
4. Navigate to the Morpheus home dashboard. The new widget types will be available when customising the dashboard layout.

---

## Detailed Usage Steps

### Adding a Widget to the Dashboard

1. Go to the Morpheus home dashboard.
2. Click **Customise** (or the edit icon).
3. Select **Add Item** and choose from the available widget types provided by this plugin (e.g. Instance Count, Backup Stats, Cluster Capacity).
4. Configure any widget-specific options and save.

### Viewing a Cluster or Cloud List Dashboard

1. From the home dashboard, select the **Cluster List** or **Cloud List** dashboard layout from the dashboard selector.
2. These views provide at-a-glance summaries of cluster and cloud health and workload distribution.

---

## API Endpoints

This plugin does not communicate with any external API. All dashboard data is retrieved from the Morpheus platform internally via the Morpheus plugin API (MorpheusContext). No outbound HTTP calls are made.
