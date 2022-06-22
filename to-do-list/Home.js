import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {
  return(
    <View style={styles.body}>
      <Text style={styles.text}>Lista de afazeres</Text>
    
      <View style={{width: '75%', marginTop: 30}}>
        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('Signin')}>
          <Text style={{ fontSize: 20, color: 'white' }}>Sign in</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={()=>navigation.navigate('Signup')}>
          <Text style={{ fontSize: 20, color: 'white' }}>Sign up</Text>
        </TouchableHighlight>
      </View>
    </View>
)}
export default Home;

const styles = StyleSheet.create({
  body: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
      paddingTop: '50px',
  },
  logo: {
      width: 200,
      height: 100,
      margin: 20,
  },
  text: {
    fontSize: 30,
    color: '#000000',
    marginBottom: 30,
  },
  input: {
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 10,
  },
  button:{
    width: '100%',
    backgroundColor: '#0373f3',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  }
})