import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Input} from 'react-native-elements';
import { styles } from './Styles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import '@firebase/firestore';
import Moment from 'moment';


export class CommentScreen extends React.Component {
    
    constructor(props) {
        super(props);

        let initComment = [];
        let initText = ''

        this.entrytoComment = this.props.navigation.getParam('comment', undefined);
        this.blankScreen = (typeof this.entrytoComment.comments === undefined);
        if (!this.blankScreen) { //is to add new comment
            console.log('=======get comment key')
            console.log(this.entrytoComment.key)
            initComment = this.entrytoComment.comments;
            this.name = this.entrytoComment.text;
            this.timestamp = this.entrytoComment.timestamp;
            this.expDate = this.entrytoComment.expDate;
            this.servings = this.entrytoComment.servings;
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
      }
    
    deleteComment(index,itemtoDelete){
        console.log(index)
        // console.log(itemtoDelete)
        let newComments = this.state.comments.slice()

        if (index > -1) {
            newComments.splice(index, 1);
            }
        console.log('==========')
        console.log(newComments)
        
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
    }
    render() {
        if (this.blankScreen === true){
            console.log(this.blankScreen)
            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Comment</Text>
                        <Text>{this.state.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                        <Text>{this.state.timestamp.toLocaleString()}</Text>
                        <Text>Expire in {this.state.expDate}} Days</Text>
                        </View>
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
                        <Text style={{fontWeight: 600, fontSize: 20}}>{this.state.name}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: '#5f6368'}}>{this.state.timestamp.toLocaleString()} | </Text>
                            <Text style={{fontWeight: 700, color: '#5f6368'}}>Expire in {this.expDate} Days |</Text>
                            <Text style={{fontWeight: 700, color: '#5f6368'}}>{this.servings} servings left</Text>
                        </View>
                    </View>

                    <View style={styles.commentContainer}>
                        
                    <FlatList
                        data={this.state.comments}
                        renderItem={
                        ({item,index}) => {
                            return (
                                <View style={{width:'100%'}}>
                                <View style={styles.commentBody}>
                                    <Text style={styles.commentText}>{item.commentText}</Text>
                                    <Button
                                        title='Delete'
                                        type="clear"
                                        containerStyle={styles.smallButtonContainer}
                                        titleStyle={{fontSize: 12}}
                                        onPress={()=>{this.deleteComment(index,item)}}
                                    />
                                </View>
                                </View>
                            );
                        }} 
                    />
                    <View style={{flexDirection:'row'}}>
                        <Input
                            multiline={false}
                            placeholder="  Leave your comment here!"
                            inputContainerStyle={ {backgroundColor: '#f2f2f2', borderRadius: 30, borderBottomWidth: 0} }
                            containerStyle={{justifyContent: 'flex-start', padding: 5, width: '90%'}}
                            value={this.state.inputText}
                            onChangeText={(value)=>{this.setState({inputText: value})}}
                        />
                        <Button
                            type="clear"
                            icon={<MaterialCommunityIcons name="send" color='#00D098' size="24"/>}
                            onPress={() => {
                                this.handleCommentSave();
                            }}
                        />
                    </View>
                    </View>
                    <View style={styles.footerContainer}>
                    </View>
                </View>
                );
            }
        }     
}