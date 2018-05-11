import { Provider } from 'react-redux'
import React from 'react'
import { View } from 'react-native'
import store from './store'
import { GenerateAccount, ImportAccount } from './CreateAccount'
import Notification from './Notification'
import { Balances } from './Balances'
import { Transactions } from './Transactions'
import { WalletList } from './WalletList'
import { Settings } from './Settings'
import { Transfer } from './Transfer';
let { StackNavigator, TabNavigator, TabBarBottom } = require('react-navigation')
let SimpleLineIconsIcon = require('react-native-vector-icons/SimpleLineIcons').default;

export const enum Routes {
  accountScreen = 'Account Screen',
  walletScreen = 'Wallet Screen',
  dashboardScreen = 'Dashboard Screen',
  settingsScreen = 'Settings Screen',
  accountGenerate = 'Generate',
  accountImport = 'Import',
  selectNetwork = 'Select Network',
  dashboardBalances = 'Balances',
  dashboardTransfer = 'Transfer',
  dashboardTransactions = 'Transactions',
  walletList = 'Wallet List',
}

let CreateAccount = TabNavigator(
  {
    [Routes.accountGenerate]: { screen: GenerateAccount },
    [Routes.accountImport]: { screen: ImportAccount },
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === Routes.accountImport) {
          iconName = `login`;
        } else if (routeName === Routes.accountGenerate) {
          iconName = `user-follow`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <SimpleLineIconsIcon name={iconName} size={18} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',
      activeBackgroundColor: '#2e4458',
      inactiveTintColor: '#d1edff',
      style: {
        backgroundColor: '#2b3e50',
        height: 65,
      },
      tabStyle: {
        marginVertical: 8,
      },
      labelStyle: {
        marginVertical: 2
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

let SettingsScreen = TabNavigator(
  {
    [Routes.selectNetwork]: { screen: Settings }
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === Routes.selectNetwork) {
          iconName = `globe`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <SimpleLineIconsIcon name={iconName} size={18} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',
      activeBackgroundColor: '#2e4458',
      inactiveTintColor: '#d1edff',
      style: {
        backgroundColor: '#2b3e50',
        height: 65,
      },
      tabStyle: {
        marginVertical: 8,
      },
      labelStyle: {
        marginVertical: 2
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

let DashboardScreen = TabNavigator(
  {
    [Routes.dashboardBalances]: { screen: Balances },
    [Routes.dashboardTransfer]: { screen: Transfer },
    [Routes.dashboardTransactions]: { screen: Transactions }
  },
  {
    navigationOptions: ({ navigation }: any) => ({
      tabBarIcon: ({ focused, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === Routes.dashboardBalances) {
          iconName = `wallet`;
        } else if (routeName === Routes.dashboardTransfer) {
          iconName = `logout`;
        } else if (routeName === Routes.dashboardTransactions) {
          iconName = `tag`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <SimpleLineIconsIcon name={iconName} size={18} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'yellow',
      activeBackgroundColor: '#2e4458',
      inactiveTintColor: '#d1edff',
      style: {
        backgroundColor: '#2b3e50',
        height: 65,
      },
      tabStyle: {
        marginVertical: 8,
      },
      labelStyle: {
        marginVertical: 2
      }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

let WalletStack = StackNavigator({
    [Routes.walletList]: {
      screen: WalletList
    },
    [Routes.dashboardScreen]: {
      screen: DashboardScreen
    },
  },{
    initialRouteName: Routes.walletList,
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#2b3e50'
    }
  }
);


let RootStack = StackNavigator({
    [Routes.settingsScreen]: {
      screen: SettingsScreen
    },
    [Routes.walletScreen]: {
      screen: WalletStack
    },
    [Routes.accountScreen]: {
      screen: CreateAccount
    },
  },{
    initialRouteName: Routes.accountScreen,
    headerMode: 'float',
    cardStyle: {
      backgroundColor: '#2b3e50'
    }
  }
);

export default class App extends React.Component<null, null> {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1, backgroundColor: '#2b3e50'}}>
          <Notification />
          <RootStack />
        </View>
      </Provider>
    )
  }
}
