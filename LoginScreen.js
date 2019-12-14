import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { styles } from './Styles';

import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgOHyI-bGALzplTqTG9I_XtqUyR7c5JJs",
  authDomain: "fridge-demo-33bef.firebaseapp.com",
  databaseURL: "https://fridge-demo-33bef.firebaseio.com",
  projectId: "fridge-demo-33bef",
  storageBucket: "fridge-demo-33bef.appspot.com",
  messagingSenderId: "396830472525",
  appId: "1:396830472525:web:07a2b2b4d6f0bf454d5f04"
};

export class LoginScreen extends React.Component {
    constructor(props)  {
      super(props);
      if (firebase.apps.length == 0) {
        console.log('before config###########')
        console.log(firebase.apps.length)
        firebase.initializeApp(firebaseConfig);
        console.log('after config###########')
        console.log(firebase.apps.length)
      }
      this.db = firebase.firestore(); 
      this.usersRef = this.db.collection('users');

      this.state = {
        errorMessage: '',
        usernameText: '',
        passwordText: '',
      }
    }
  
    handleLogin = () => {
      let username = this.state.usernameText;
      this.usersRef.where('username', '==', username).get().then(querySnapshot => {
        if (querySnapshot.empty) {
          this.setState({errorMessage: 'no such user'});
        } else {
          let user = querySnapshot.docs[0].data();
          user.key = querySnapshot.docs[0].id;
          if (user.password === this.state.passwordText) {
            this.props.navigation.navigate('Home', {
                mode: 'returning', 
                user: user,
                login: this,
            });
          } else {
            this.setState({errorMessage: 'wrong password'});
          }
        }
      });
    }
  
    handleCreateAccount = () => {
      let username = this.state.usernameText;
      this.usersRef.where('username', '==', username).get().then(queryRef => {
        if (queryRef.empty) {
          let newUser = {
            username: username, 
            password: this.state.passwordText
          };
          this.usersRef.add(newUser).then(docRef => {
            newUser.key = docRef.id;
            this.props.navigation.navigate('Home', {
                mode: 'new', 
                user: newUser,
                login: this,
            });
            this.setState({      
              errorMessage: '',
              usernameText: '',
              passwordText: ''})
          });
        } else {
          this.setState({errorMessage: 'user already exists'});
        }
      });
    }
  
    render() {
      return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Log in</Text>
          </View>
          <View style={styles.loginBodyContainer}>
            <Text>{this.state.errorMessage}</Text>
            <View style={styles.bodyRow}>
              <Input
                placeholder="Username"
                autoCapitalize="none"
                value={this.state.usernameText}
                onChangeText={(text)=>{this.setState({usernameText: text})}}
              />
            </View>
            <View style={styles.bodyRow}>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
                value={this.state.passwordText}
                onChangeText={(text)=>{this.setState({passwordText: text})}}
              />
            </View>
          </View>
          <View style={styles.loginFooterContainer}>
            <Button
              title="Log in"
              titleStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                backgroundColor: "#00D098",
                borderRadius: 10,
                height: 38,
                width: 340,  
              }}
              containerStyle={styles.buttonContainer}
              onPress={this.handleLogin}
            />
            <Button
              title="Create Account"
              titleStyle={{
                color: "#00D098",
                fontSize: 14,
                fontWeight: 'bold',
              }}
              buttonStyle={{
                backgroundColor: "white",
                borderRadius: 10,
                borderColor: "#00D098",
                borderWidth: 1,
                height: 38,
                width: 340,  
              }}
              containerStyle={styles.buttonContainer}
              onPress={this.handleCreateAccount}
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }