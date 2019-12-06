import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Input} from 'react-native-elements';
import { styles } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';
import Moment from 'moment';


export class CommentScreen extends React.Component {
    
    constructor(props) {
        super(props);

        let initComment = [];
        let initText = ''

        this.entrytoComment = this.props.navigation.getParam('comment', undefined);
        this.blankScreen = (typeof this.entrytoComment.comments === 'undefined');
        if (!this.blankScreen) { //is to add new comment
            console.log('=======get comment key')
            console.log(this.entrytoComment.key)
            initComment = this.entrytoComment.comments;
            this.name = this.entrytoComment.text;
            this.timestamp = this.entrytoComment.timestamp;
            // this.labels = this.entrytoComment.labels; //label should have values
            console.log('get entry to comment')
        }else{
            this.name = this.entrytoComment.text;
            this.timestamp = this.entrytoComment.timestamp;
            console.log('brand new comment screen')
        }

        this.state = {
          comments : initComment,
          inputText: initText,
          name: this.name,
          timestamp: this.timestamp,
        //   labels: this.labels,
        }
        console.log(this.state)
    }

    // ########## update entry ##########
    // updateEntry(entryToUpdate) {
        //let entryKey = entryToUpdate.key;
        // this.entriesRef.doc(entryToUpdate.key).set({
        //     text: entryToUpdate.text,
        //     timestamp: entryToUpdate.timestamp,
        //     labels: entryToUpdate.labels
        //   }).then(() => {
        //     let newEntries = [];
        //     for (entry of this.state.entries) {
        //       if (entry.key === entryToUpdate.key) {
        //         newEntries.push(entryToUpdate);
        //       } else {
        //         newEntries.push(entry);
        //       }
        //     }
        //     this.setState({entries: newEntries});
        //   });
        // }
    // ########## update entry ##########
    getConciseTimeStamp(timestamp){
        let t = timestamp.toLocaleString()
        formatTime = Moment(t).format('MM/DD/YYYY');
        return formatTime
      }
    
    handleCommentSave = () => {
        let newComments = this.state.comments.slice()
        let newComment = {
            commentText : this.state.inputText,
            timestamp : this.timestamp,
        }
        newComments.push(newComment);
        let newEntry = {
        //   text: this.state.name,
        //   timestamp : this.timestamp,
        // //   labels: this.state.labels,
          comments: newComments,
        };
        let mainScreen = this.props.navigation.getParam('mainScreen');
        newEntry.key = this.entrytoComment.key;
        mainScreen.updateComment(newEntry);
        this.setState({
            comments:newComments,
            inputText:''
        })
        // if (this.isAdd) {
        //   mainScreen.addEntry(newEntry);
        // } else {
        //   newEntry.key = this.entryToUpdate.key;
        //   mainScreen.updateEntry(newEntry);
        // }
        // // this.props.navigation.goBack();
      }

    render() {
        if (this.blankScreen === true){
            console.log(this.blankScreen)
            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Comment</Text>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.timestamp.toLocaleString()}</Text>
                        <Text>------Add new comment-------</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                    <Input
                        multiline={false}
                        placeholder=""
                        inputContainerStyle={styles.smallInput}
                        containerStyle={{justifyContent: 'flex-start'}}
                        value={this.state.inputText}
                        onChangeText={(value)=>{this.setState({inputText: value})}}
                    />
                    </View>
                    <View style={styles.footerContainer}>
                        <Button
                            title='Comment'
                            onPress={() => {
                                this.handleCommentSave();
                            }}
                        />
                    </View>
                </View>
            );
        }else {
            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Comment</Text>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.timestamp.toLocaleString()}</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        
                    <FlatList
                        data={this.state.comments}
                        renderItem={
                        ({item}) => {
                            return (
                            <View style={styles.bodyListItem}>
                                <View style={styles.bodyListItemLeft}>
                                <Text style={styles.bodyListItemDate}>{item.timestamp.toLocaleString()}</Text>
                                <Text style={styles.bodyListItemText}>{item.commentText}</Text>
                                </View>
                                <View style={styles.bodyListItemRight}>
                                <Button
                                    title='Delete'
                                    containerStyle={styles.smallButtonContainer}
                                    titleStyle={styles.mediumButtonTitle}
                                    onPress={()=>{this.handleDelete(item)}}
                                />
                                </View>
            
                            </View>
                            );
                        }} 
                    />
                    <Input
                        multiline={false}
                        placeholder=""
                        inputContainerStyle={styles.smallInput}
                        containerStyle={{justifyContent: 'flex-start'}}
                        value={this.state.inputText}
                        onChangeText={(value)=>{this.setState({inputText: value})}}
                    />
                    </View>
                    <View style={styles.footerContainer}>
                    <Button
                        title='Comment'
                        onPress={() => {
                            this.handleCommentSave();
                        }}
                    />
                    </View>
                </View>
                );
            }
        }     
}