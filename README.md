# Morpheus Dashboard Plugins

This project contains plugins for custom dashboards in the MorpheusData Appliance UI.

### Building

This is a Morpheus plugin that leverages the `morpheus-plugin-core` which can be referenced by visiting [https://developer.morpheusdata.com](https://developer.morpheusdata.com). It is a groovy plugin designed to be uploaded into a Morpheus environment via the `Administration -> Integrations -> Plugins` section. To build all projects in this repo from scratch simply run the shadowJar gradle task on java 17:

```bash
gradlew shadowJar
```

A jar will be produced in the `build/lib` folder that can be uploaded into a Morpheus environment.

To build individual projects use a scoped build command:

```bash
gradlew <project-name>:shadowJar
```

For example, to build the `morpheus-home-dashboard` plugin:

```bash
gradlew morpheus-home-dashboard:shadowJar
```
