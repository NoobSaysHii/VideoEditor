# jioliv-nm

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About

JioLiv package for JioGames

## Getting Started

These instructions will help you integrate the package into JioGames.

### Prerequisites

React Native version >= 0.63.4

### Installing

Use the provided tarball to install.
```
yarn add file:/path/to/local/tarball.tgz
```

Install all peer dependencies. For most updated list see [`package.json`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/package.json?region=us-east-1)

```
    "@react-native-community/masked-view": "^0.1.10",
    "lottie-ios": "3.1.8",
    "lottie-react-native": "^3.5.0",
    "react": "*",
    "react-native": "*",
    "react-native-camera": "*",
    "react-native-gesture-handler": "^1.9.0",
    "react-native-modal": "*",
    "react-native-orientation-locker": "^1.2.0",
    "react-native-pager-view": "^5.1.2",
    "react-native-qrcode-scanner": "*",
    "react-native-reanimated": "^2.0.0",
    "react-native-safe-area-context": "^3.1.9",
    "react-native-screens": "^3.1.1",
    "react-native-svg": "^12.1.1",
    "react-native-tab-view": "^3.0.0",
    "react-native-vector-icons": "^7.0.0",
    "react-native-video": "*"
```

## Usage

You have to use the following components to completely integrate with JioGames.

## Register

You have to call the following function inside your main index file.(Where you register the main application).
```js
// your imports
import {registerPlayer} from 'jioliv-nm';
// more of your imports

// AppRegistry.registerComponent(yourAppName, () => yourApp);
registerPlayer();

```

### Screens

- #### **Main Screens**

Wrap your app with `Provider` just below the redux provider. Pass authetication details to it like in the example below.

There are three exports for screens that have to be used with `react-navigation`.

   - **Modals**: Call `modalGroup` function in the root of your app, preferably just inside `Provider`.
   - **Screens without bottom bar**: Call `stackScreenGroup` function in main `Stack.Navigator` of your app.
   - **Screens with bottom bar**: Call `tabScreenGroup` function in main `Tab.Navigator` of your app.


```js
import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, Platform, Linking} from 'react-native';
import {
  Provider as WatchProvider,
  tabScreenGroup,
  stackScreenGroup,
  modalGroup,
  moreSectionScreens,
  useSessionLogin,
  usePasswordLogin,
  useSafeLinking,
  useAnalyticsListener,
} from 'jioliv-nm';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {configureStore} from '@reduxjs/toolkit';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import {envType} from '../src/envConstants';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import _ from 'lodash';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = ({}) => {
  const navigation = useNavigation();

  const envSetup = {
    envType: 'prod',
    envCloud: 'gcp',
  }

  const analyticsCallback = useCallback((event) => {
    console.log('analytics event --------> ', event);
  }, []);
  useAnalyticsListener(analyticsCallback);

  const isMainSectionLoggedIn = true;//this represents whether your application is logged in or not
  const safelinkingCallback = useCallback((event) => {
    console.log('safelinking event --------> ', event);
  }, []);
  useSafeLinking(isMainSectionLoggedIn, safelinkingCallback);//use this where the link while be available when launching the app. eg: splash screen, tab bar

  const callback = useCallback(
    (success) => {
      if (success) {
        console.log('successfully initialized watch section');
      } else {
        console.log('failed to initialize watch section');
      }
    },
    [navigation],
  );

  const initWatchSession = useSessionLogin(callback, envSetup);

  const initWatch = useCallback(() => {
    const sessionId = sessionIds[envSetup?.envType];
    initWatchSession(sessionId, userDetails);
  }, [envSetup, initWatchSession, navigation]);

  useEffect(() => {
    initWatch();
  }, [initWatch]);

  return (
    <Tab.Navigator>
      {```your code```}
      {tabScreenGroup()}
      {```more code```}
    </Tab.Navigator>
  );
};

const WatchWrapper = () => {
  return (
    <WatchProvider>
      <View style={StyleSheet.absoluteFill}>
        {modalGroup()}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {```your stack```}
          <Stack.Screen key={'ExampleStack'} name={'ExampleStack'} component={Tabs} />
          {stackScreenGroup()}
        </Stack.Navigator>
      </View>
    </WatchProvider>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <WatchWrapper />
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaProvider>
  );
};

export default App;
```

- #### **Video Screen**

Follow previous integration steps (before redux update) except you now also need to manually wrap it with the same `store` created above (This used to happen automatically inside the `Provider` previously, but since now both JioGames and JioLiv will use the same store, it has to be done manually)

See this [`file`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/example/HelloWorld.js?region=us-east-1) for an example

For more on integration, see the [`example/`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/example?region=us-east-1) folder of JioLivNM repository. Mainly [`App.js`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/example/App.js?region=us-east-1), [`HelloWorld.js`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/example/HelloWorld.js?region=us-east-1), and [`index.js`](https://console.aws.amazon.com/codesuite/codecommit/repositories/JioLivNM/browse/refs/heads/develop/--/example/index.js?region=us-east-1)
