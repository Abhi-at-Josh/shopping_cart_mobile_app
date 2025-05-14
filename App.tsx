import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/LoginSreen';
import DrawerNavigator from './src/navigation/DrawerNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect ,useState} from 'react';
import { QueryClientProvider , QueryClient } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store , persistor } from './src/redux/Store';
import LogoutAlertModal from './src/components/LogoutAlertModal';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect (()=>{
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("isLoggedIn");
        setIsLoggedIn(value === "true");
          } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  },[])

  if (isLoggedIn === null) return null;

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
           { isLoggedIn ? (
            <Stack.Screen name="Main">
              {() => <DrawerNavigator/>}
            </Stack.Screen>
           ) : (
            <Stack.Screen name="Login">
              {() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
           )}
        </Stack.Navigator>
        <LogoutAlertModal setIsLoggedIn={setIsLoggedIn}/>
      </NavigationContainer>
      </QueryClientProvider>
    </PersistGate>
    </Provider>
  );
}
