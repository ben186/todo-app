import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import { Task } from '../stores/task-store';

export type NavigatorParamList = {
  home: undefined,
  task: { item: Task }
}

export type AppNavigatorScreenProps<T extends keyof NavigatorParamList> = NativeStackScreenProps<NavigatorParamList, T>

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='home'
    >
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='task' component={TaskScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const AppNavigator = (props: NavigationProps) => {
  return (
    <>
      <NavigationContainer
        {...props}
      >
        <AppStack/>
      </NavigationContainer>
    </>
  );
}

export default AppNavigator;