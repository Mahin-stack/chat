import React,{useState, useEffect} from 'react'
import { View, StyleSheet,  Alert } from 'react-native'
import { Input, Button} from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const login = () => {
      auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
      var errorMessage = error.message;
    Alert.alert(errorMessage)
      });
    }
    useEffect(() => {
      const unsuscribe= auth.onAuthStateChanged(function(user) {
         if (user) {
          navigation.replace('User')
         } else {
           navigation.canGoBack() &&
           navigation.popToTop();
           // No user is signed in.
         }
       });
        return unsuscribe
      }, [])
    return (
        <View style={styles.container}>
            <Input 
              placeholder='Enter Your Email'
              label="Email"
              leftIcon={{type:'material', name: 'email'}}
              onChangeText={(text)=>{setEmail(text)}}
              value={email}
            />
            <Input 
              placeholder='Enter Your Pasword'
              label="Password"
              leftIcon={{type:'material', name: 'lock'}}
              onChangeText={(text)=>{setPassword(text)}}
              value={password}
              secureTextEntry
            />
            <Button 
            title='Sign In' 
            style={styles.input}
            onPress={login}
            /> 
            <Button
             title='Register' 
             style={styles.input}
             onPress={()=> navigation.navigate('Register')}
             />

        </View>
    )
}

const styles= StyleSheet.create({
input :{
width:200 ,
marginTop: 10 ,
},
container:{
flex: 1 ,
alignItems: 'center',
padding: 10

},
})


export default LoginScreen
