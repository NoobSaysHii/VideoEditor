## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About

VideoEditor package for Public.

## Getting Started

These instructions will help you integrate the package into your application.

### Prerequisites

React Native version >= 0.63.4

### Installing

Use the provided tarball to install.
```
yarn add file:/path/to/local/tarball.tgz
```

```
    "react": "*",
    "react-native": "*",
    "react-native-camera": "*",
    "react-native-video": "*"
```

## Usage

You have to use the following components to completely integrate with your application.

## Register


```

### Screens

- #### **Main Screens**

Wrap your app with `Provider` just below the redux provider. Pass authetication details to it like in the example below.

There are three exports for screens that have to be used with `react-navigation`.

   - **Modals**: Call `modalGroup` function in the root of your app, preferably just inside `Provider`.
   - **Screens without bottom bar**: Call `stackScreenGroup` function in main `Stack.Navigator` of your app.
   - **Screens with bottom bar**: Call `tabScreenGroup` function in main `Tab.Navigator` of your app.

- #### **Video Screen**

Follow previous integration steps (before redux update) except you now also need to manually wrap it.