import React, { useState,useLayoutEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, TouchableOpacity, Alert } from 'react-native'
import { auth, db } from '../firebase';
import {AntDesign} from '@expo/vector-icons';
import {Avatar} from 'react-native-elements';

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([]);

   useLayoutEffect(() => {
     const unsubscribe = db.collection('chats')
     .orderBy('createdAt','desc')
     .onSnapshot(snapshot => 
       setMessages(
        snapshot.docs.map(doc =>({
          _id: doc.data()._id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user:doc.data().user,
         }))
       )
     )
     return unsubscribe
   }, [])
 
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => 
      GiftedChat.append(previousMessages, messages))
      const {_id, createdAt, text, user} = messages[0]
        db.collection('chats').add({ _id, createdAt, text, user})
    }, [])

    useLayoutEffect(() => {
       navigation.setOptions({
        headerLeft:()=>(
       <View style={{marginLeft: 20}}>
         <Avatar
        rounded
        source={{
            uri: auth?.currentUser?.photoURL
        }}
        />
       </View>
        ),
        headerRight:()=>(
            <TouchableOpacity style={{marginRight: 30}} onPress={signOut}>
            <AntDesign 
            name='logout'
            size={24}
            color='black'
            />
           </TouchableOpacity>
        )
       })
    }, [])
    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
            Alert.alert('You Have Logged Out !')
          }).catch((error) => {
            // An error happened.
          });
          
    }
    return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  )
}

export default ChatScreen;
