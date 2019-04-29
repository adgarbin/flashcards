import React from "react";
import { Platform, StatusBar, View } from "react-native";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView";
import AddDeck from "./components/AddDeck";
import AddQuestion from "./components/AddQuestion";
import QuizView from "./components/QuizView";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { blue, white } from "./utils/colors";
import { Constants } from "expo";
import { setLocalNotification } from "./utils/helpers";
import middleware from "./middleware";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const RouteConfigs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-list-box" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const TabNavigatorConfig = {
  navigationOptions: {
    header:
      Platform.OS === "ios" ? (
        <UdaciStatusBar backgroundColor={blue} barStyle="light-content" />
      ) : null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? blue : white,
    style: {
      height: 66,
      backgroundColor: Platform.OS === "ios" ? white : blue,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      paddingTop: 10,
      paddingBottom: 10,
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
    : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: "Deck View"
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      title: "Quiz View"
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: "Add Card"
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <AppContainer />
      </Provider>
    );
  }
}
