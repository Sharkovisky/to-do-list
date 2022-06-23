import { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NovaAtividade from './NovaAtividade.js';
import { throws } from 'assert';

const Stack = createNativeStackNavigator();

class HomeComponent extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Lista de afazeres</Text>
                <TouchableHighlight
                    style={[styles.btn, styles.columnContainer]}
                    onPress={() => this.props.navigation.navigate('NovaAtividade')}
                >
                    <Text style={styles.btnText}>Lista de afazeres</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class Home extends Component {
    render(){
        console.log(styles);
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeComponent}/>
                    <Stack.Screen name="NovaAtividade" component={NovaAtividade}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    columnContainer: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      alignContent: "center",
    },
    rowContainer: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flexDirection: 'row',
    },
    btn: {
      borderRadius: 10,
      backgroundColor: '#0373F3',
      width: 250,
      height: 30,
      margin: 5
    },
    btnGoogle: {
      borderRadius: 10,
      backgroundColor: 'white',
      width: 250,
      height: 30,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    btnFB: {
      borderRadius: 10,
      backgroundColor: '#3B5998',
      width: 250,
      height: 30,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    btnText: {
      color: "white",
      fontWeight: 'bold',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 36,
    },
    input: {
      height: 40,
      width: 250,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    line: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: 0.5,
    }
  });

  export default Home;