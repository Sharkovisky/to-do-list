import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Home from './Home';
import NovaAtividade from './NovaAtividade.js';

enableScreens();

const Stack = createNativeStackNavigator();

async function iniciarProjeto(){
  await db
}

iniciarProjeto();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Nova Atividade"
          component={NovaAtividade}
        />
        {/* <Stack.Screen
          options={{ headerLargeTitle: true }}
          name="Signin"
          component={Signin}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;