import React, {Component} from 'react';
import { View, Text, FlatList, Platform, Image, TouchableOpacity } from 'react-native';
import { Button, Card, ListItem, Icon } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';

// format the time
import Moment from 'moment';


export class MainScreen extends React.Component {
    
    constructor(props) {
        super(props);
        let theList = [];
        let theLabelList = []
        let theUsersList = []
        this.defaultThumbNail = require('./images/cake.jpg')
        
        this.labels = [
            {key: 'h', name: 'Home'},
            {key: 'w', name: 'Work'},
            {key: 's', name: 'School'}
          ];

        this.state = {
          entries: theList,
          labels: theLabelList,
          users: theUsersList,
        }
        // inherit the database initiated in log in screen
        this.login =  this.props.navigation.getParam('login');
        this.currentUser = this.props.navigation.getParam('user');
        console.log('current User========')
        console.log(this.currentUser)
        
        // Setting up the firebase and fire storage
        this.db = this.login.db;
        const storage = firebase.storage();
        this.storageRef = storage.ref();

        // fetch users from database
        this.entriesRef = this.db.collection('entries'); 
        this.usersRef = this.db.collection('users')
        this.usersRef.get().then(queryRef=>{
          let newUsers = [];
          queryRef.forEach(docRef=>{
            let docData = docRef.data()
            let user = {
              key : docRef.id,
              name : docData.username,
              value : false,
            }
            newUsers.push(user);
            console.log(newUsers)
          })
          this.setState({users:newUsers})
        })

        // fetch the entries in database to state
        this.entriesRef.get().then(queryRef=>{
          let newEntries = [];
          queryRef.forEach(docRef=>{
            let docData = docRef.data();
            let newEntry = {
              text: docData.text,
              timestamp: docData.timestamp.toDate(),
              key: docRef.id, 
              labels: docData.labels,
              comments: docData.comments,
              servings:docData.servings,
              expDate:docData.expDate,
              image: docData.image,
              owners: docData.owners,
            }
            newEntries.push(newEntry);
            
          })
          this.setState({entries: newEntries});
        });
      }
      
      //  use key of label to render the name of label in JSX 
      getLabelName(labelKey) {
        for (lbl of this.state.labels) {
          if (lbl.key === labelKey) {
            return lbl.name;
          }
        }
        return undefined;
      }

      conditionalThumbNail(imageObject) { // if user doesn't take picture while logging, return default picture
        console.log('thumbnail---')
        if (imageObject.uri === 25) {
            return this.defaultThumbNail;
          } else {
            return imageObject;
          }
      }

      getConciseTimeStamp(timestamp){
        let t = timestamp.toLocaleString()
        formatTime = Moment(t).format('MM/DD/YYYY');
        return formatTime
      }
      
      // add a new entry  
      addEntry(newEntry) {
        this.entriesRef.add(newEntry).then(docRef=> {
          newEntry.key = docRef.id;
          let newEntries = this.state.entries.slice(); // clone the list
          newEntries.push(newEntry);
          this.setState({entries: newEntries});
        })
      }
    
      //save label, will be called by LabelDetail Screen
      addLabel(newLabel) {
        // this.labelsRef.add(newLabel).then(docRef=> {
          let newLabels = this.state.labels.slice(); // clone the list
          newLabels.push(newLabel);
          this.setState({labels: newLabels});
          // console.log('saved')
      }
      
      deleteEntry(entryToDelete) {
        let entryKey = entryToDelete.key;
        // console.log(entryKey);
        this.entriesRef.doc(entryKey).delete().then(()=> {
          let newEntries = [];
          for (entry of this.state.entries) {
            if (entry.key !== entryKey) {
              newEntries.push(entry);
            }
          }
          this.setState({entries: newEntries});
        });
      }

      updateEntry(entryToUpdate) {
        this.entriesRef.doc(entryToUpdate.key).set({
          text: entryToUpdate.text,
          timestamp: entryToUpdate.timestamp,
          comments: entryToUpdate.comments,
          expDate:  entryToUpdate.expDate,
          servings: entryToUpdate.servings,
          image: entryToUpdate.image,
          owners: entryToUpdate.owners,
          // labels: entryToUpdate.labels,
          // comments: entryToUpdate.comments,
        }).then(() => {
          let newEntries = [];
          for (entry of this.state.entries) {
            if (entry.key === entryToUpdate.key) {
              newEntries.push(entryToUpdate);
            } else {
              newEntries.push(entry);
            }
          }
          this.setState({entries: newEntries});
        });
      }

      updateComment(commentToUpdate){
        this.entriesRef.doc(commentToUpdate.key).update({
            comments: commentToUpdate.comments,
        }).then(function() {
        }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        }).then(() => {
          let newEntries = [];
          for (entry of this.state.entries) {
            if (entry.key === commentToUpdate.key) {
              entry.comments = commentToUpdate.comments;
              newEntries.push(entry)
            } else {
              newEntries.push(entry);
            }
          }
          this.setState({entries: newEntries});
        })
      }
    
      handleDelete(entryToDelete) {
        this.deleteEntry(entryToDelete);
      }
    
      handleEdit(entryToEdit) {
        this.props.navigation.navigate('Details', {
          entry: entryToEdit,
          mainScreen: this
        });
      }

      handleComment(entryToComment) {
        this.props.navigation.navigate('Comment', {
          comment: entryToComment,
          mainScreen: this,
          user: this.currentUser,
        });
      }

      handleUserDisplay(ownerToDisplay){
        let displayOwners = [];
        let usercount  = 0
        for (owner of ownerToDisplay){
          if (owner.value === true){
            displayOwners.push(owner.name)
            usercount+=1
          }
        }
        if(usercount ==0){
          return 'household'
        }
        return displayOwners.join(' ')
      }

      handleDecrementServings(servingsToUpdate){
        console.log(servingsToUpdate)
        serv = servingsToUpdate.servings
        console.log('servings +++++++++')
        console.log(serv)
        if (serv > 1){
          serv -= 1
        } else{
          serv = 1
        }
        this.entriesRef.doc(servingsToUpdate.key).update({
          servings: serv,
        }).then(function() {
        }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        }).then(() => {
          let newEntries = [];
          for (entry of this.state.entries) {
            if (entry.key === servingsToUpdate.key) {
              entry.servings = serv;
              newEntries.push(entry)
            } else {
              newEntries.push(entry);
            }
          }
          this.setState({entries: newEntries});
          })
        }
      
      handleIncrementServings(servingsToUpdate){
        console.log(servingsToUpdate)
        serv = servingsToUpdate.servings
        console.log('servings +++++++++')
        console.log(serv)
        if (serv > 0){
          serv += 1
        } else{
          serv = 1
        }
        this.entriesRef.doc(servingsToUpdate.key).update({
          servings: serv,
        }).then(function() {
        }).catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        }).then(() => {
          let newEntries = [];
          for (entry of this.state.entries) {
            if (entry.key === servingsToUpdate.key) {
              entry.servings = serv;
              newEntries.push(entry)
            } else {
              newEntries.push(entry);
            }
          }
          this.setState({entries: newEntries});
          })
        }

      conditonalIcon(expDate){
        if (expDate>3){
          return  'checkbox-marked-circle-outline';
        } else if(expDate>0 && expDate<=3){
          return 'alert-circle-outline';
        } else {
          return 'alert-octagram';
        }
      }

      conditonalColor(expDate){
        if (expDate>3){
          return  '#00FF33';
        } else if(expDate>0 && expDate<=3){
          return "#FFBF00";
        } else {
          return '#FF6633';
        }
      }
      


    render() {
        console.log(this.state.user)
        return (
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Fridge</Text>
            </View>
            {/* <View style={styles.headerContainer}>
              <Button
                title='Config'
                onPress={() => {
                  this.props.navigation.navigate('LabelList', {mainScreen: this});
                }}
              />
            </View> */}
            <View style={styles.bodyContainer}>
              <FlatList
                data={this.state.entries}
                renderItem={
                  ({item}) => {
                    return (
                        <TouchableOpacity 
                          style={styles.bodyListItem}
                          onPress={()=>{this.handleEdit(item)}}
                          >
                          <MaterialCommunityIcons 
                                  name={this.conditonalIcon(item.expDate)} 
                                  color={this.conditonalColor(item.expDate)}  
                                  size="15"/>
                          <Image
                            style={styles.cardLeft}
                            source={this.conditionalThumbNail(item.image)}/>
                          <View style={styles.cardMiddle}>
                            <Text style={styles.cardTitle}>{item.text}</Text>
                            <Text style={styles.cardTime}>Logged on {this.getConciseTimeStamp(item.timestamp)}</Text>
                            <Text style={styles.bodyListItemDate}>Expire in {item.expDate} Days</Text>
                            <View style={styles.cardTag}>
                            <Text style={{ color:'white', size: 12 }}>{this.handleUserDisplay(item.owners)}</Text>
                            </View>
                            </View>
                          <View style={styles.cardRight}>
                            <Button
                              onPress={()=>{this.handleDelete(item)}}
                              icon={<Icon name='delete' color='#00D098' />}
                              type="clear" />
                            <Button
                              onPress={()=>{this.handleComment(item)}}
                              icon={<MaterialCommunityIcons name ='chat' color='#00D098' size="24"/>}
                              type="clear"
                              />
                            <View style={styles.cardRightServing}>
                              <Button
                                onPress={()=>{this.handleDecrementServings(item)}}
                                icon={<MaterialCommunityIcons name='minus-box' color='#00D098' size="24"/>}
                                type="clear"
                              />
                              <Text style={styles.cardServing}>{item.servings}</Text>
                              <Button
                                onPress={()=>{this.handleIncrementServings(item)}}
                                icon={<MaterialCommunityIcons name='plus-box' color='#00D098' size="24"/>}
                                type="clear"
                              />
                            </View>     
                          </View>                     
                        </TouchableOpacity>
                    );
                  }} 
              />
            </View>
            <View style={styles.footerContainer}>
              <Button
                title='Add Food'
                titleStyle={{
                  color: "white",
                  fontSize: 14,
                }}
                buttonStyle={{
                  backgroundColor: "#00D098",
                  borderRadius: 19,
                  height: 38,
                  width: 122,  
                }}
                onPress={() => {
                  this.props.navigation.navigate('Details', {mainScreen: this});
                }}
              />
            </View>
          </View>
        );
      }
}