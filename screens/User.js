import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';

const User =({navigation})=> {
  const [userToAdd, setUserToAdd] = useState();
  const [displayedUser, setDisplayedUser] = useState([]);

  const addUser = () => {
   setDisplayedUser([...displayedUser, userToAdd])
    setUserToAdd('');
  }   
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>add User</Text>
        <View style={styles.items}>
          {
            displayedUser.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.replace('Chat')}>
           <Text style={styles.item}>{item}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>
      </ScrollView>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput
            style={styles.input}
            placeholder={'Add'}
            value={userToAdd} 
            onChangeText={text => setUserToAdd(text)}
        />
        <TouchableOpacity
         onPress={() => addUser()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
        }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
export default User ;