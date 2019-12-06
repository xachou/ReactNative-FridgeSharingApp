import React, {Component} from 'react';
import { View, Text, FlatList, Platform, Image, TouchableOpacity } from 'react-native';
import { Button, Card, ListItem, Icon } from 'react-native-elements';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';

// format the time
import Moment from 'moment';


const firebaseConfig = {
    apiKey: "AIzaSyAK4Tn8HNnIbrdfh5e1uR5JECM3T4J99N0",
    authDomain: "finalproj-fridge.firebaseapp.com",
    databaseURL: "https://finalproj-fridge.firebaseio.com",
    projectId: "finalproj-fridge",
    storageBucket: "finalproj-fridge.appspot.com",
    messagingSenderId: "601009921612",
    appId: "1:601009921612:web:fc4ecc77b48d4cd6409ee9"
  };

export class MainScreen extends React.Component {
    
    constructor(props) {

        super(props);
        let theList = [];
        let theLabelList = []
        this.defaultThumbNail = require('./images/cake.jpg')
        
        this.labels = [
            {key: 'h', name: 'Home'},
            {key: 'w', name: 'Work'},
            {key: 's', name: 'School'}
          ];

        this.state = {
          entries: theList,
          labels: theLabelList,
        }

        // Setting up the firebase and fire storage
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
        const storage = firebase.storage();
        this.storageRef = storage.ref();

        // fetch all the data from firebase, and update state
        this.entriesRef = this.db.collection('entries'); 
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
        console.log(imageObject);
        if (imageObject.uri === 25) {
            return this.defaultThumbNail;
          } else {
            console.log('has thumbnail')
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
        console.log(entryToComment)
        this.props.navigation.navigate('Comment', {
          entry: entryToComment,
          mainScreen: this
        });
      }



    render() {
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
                      <View style={styles.bodyListItem}>
                        <Card
                          title={item.text}
                          image={this.conditionalThumbNail(item.image)}>
                          <Text style={styles.bodyListItemDate}>{item.timestamp.toLocaleString()}</Text>
                          <Button
                            onPress={()=>{this.handleDelete(item)}}
                            icon={<Icon name='delete' color='black' />}
                            type="clear" />
                          <Button
                            onPress={()=>{this.handleEdit(item)}}
                            icon={<MaterialCommunityIcons name="square-edit-outline" color='black' size="24"/>}
                            type="clear"
                            />
                          <Button
                            onPress={()=>{this.handleComment(item)}}
                            icon={<MaterialCommunityIcons name="chat" color='black' size="24"/>}
                            type="clear"
                            />
                          <MaterialCommunityIcons
                            name="chat"
                            size={24}
                            color="black"
                            onPress={()=>{this.handleComment(item)}}/>
                        </Card>
                      </View>
                    );
                  }} 
              />
            </View>
            <View style={styles.footerContainer}>
              <Button
                title='Add Entry'
                onPress={() => {
                  this.props.navigation.navigate('Details', {mainScreen: this});
                }}
              />
            </View>
          </View>
        );
      }
}