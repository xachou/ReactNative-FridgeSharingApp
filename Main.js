import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';

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
        
        this.labels = [
            {key: 'h', name: 'Home'},
            {key: 'w', name: 'Work'},
            {key: 's', name: 'School'}
          ];

        this.state = {
          entries: theList,
          labels: theLabelList,
        }
        // console.log(this.state.labels)
    
        firebase.initializeApp(firebaseConfig);
        this.db = firebase.firestore();
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
        console.log(entryToUpdate)
        console.log(1)
        this.entriesRef.doc(entryToUpdate.key).set({
          text: entryToUpdate.text,
          timestamp: entryToUpdate.timestamp,
          comments: entryToUpdate.comments,
          expDate:  entryToUpdate.expDate,
          servings: entryToUpdate.servings,
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
                        <View style={styles.bodyListItemLeft}>
                          <Text style={styles.bodyListItemDate}>{item.timestamp.toLocaleString()}</Text>
                          <Text style={styles.bodyListItemText}>{item.text}</Text>
                        </View>
                        <View style={styles.bodyListItemRight}>
                          <Button
                            title='Delete'
                            containerStyle={styles.smallButtonContainer}
                            titleStyle={styles.mediumButtonTitle}
                            onPress={()=>{this.handleDelete(item)}}
                          />
                          <Button
                            title='Edit'
                            containerStyle={styles.smallButtonContainer}
                            titleStyle={styles.mediumButtonTitle}
                            onPress={()=>{this.handleEdit(item)}}
                          />
                          <Button
                            title='Comment'
                            containerStyle={styles.smallButtonContainer}
                            titleStyle={styles.mediumButtonTitle}
                            onPress={()=>{this.handleComment(item)}}
                          />
                        </View>
    
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