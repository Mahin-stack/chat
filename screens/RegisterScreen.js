import React,{useState, } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Input, Button} from 'react-native-elements';
import {auth, db} from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [imageURL, setImageURL] = useState('');

  const register = () => {
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    db.collection('usersadd').add({
      'first_name': firstName,
      'last_name' : lastName
    })
  var user = userCredential.user;
  user.updateProfile({
  displayName: firstName + ' ' + lastName,
  photoURL: imageURL ? imageURL: "https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png"
  }).then(function() {
  // Update successful.
  }).catch(function(error) {
  // An error happened.
  });
  navigation.navigate('User');
  Alert.alert('You Have Registerd Successfully!')
  })
  .catch((error) => {
  var errorMessage = error.message;
  Alert.alert(errorMessage)
  });
  }
    return (
        <View style={styles.container}>
            <Input 
              placeholder='Enter Your Name'
              label="Name"
              leftIcon={{type:'material', name: 'badge'}}
              onChangeText={(text)=>{setFirstName(text)}}
              value={firstName}
            /> 
            <Input 
              placeholder='Enter Your Surname'
              label="Surname"
              leftIcon={{type:'material', name: 'badge'}}
              onChangeText={(text)=>{setLastName(text)}}
              value={lastName}
          />
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
              <Input 
              placeholder='Enter Your Image URL'
              label="Profile Picture"
              leftIcon={{type:'material', name: 'face'}}
              onChangeText={(text)=>{setImageURL(text)}}
              value={imageURL}
            />
          
            <Button
             title='Register' 
             style={styles.input}
             onPress={register}
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
export default RegisterScreen
