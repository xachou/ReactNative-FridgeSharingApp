import React from 'react';
import { View, Text, FlatList, Image} from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { styles } from './Styles';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'


export class EntryDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.entryToUpdate = this.props.navigation.getParam('entry', undefined);
    console.log(this.entryToUpdate)
    this.mainScreen = this.props.navigation.getParam('mainScreen');
    
    this.isAdd = (typeof this.entryToUpdate === 'undefined');

    let initText = '';
    let initExpDate = 5;
    let initServing = 2;
    let initLabels = [];
    let initComments = [];

    if (!this.isAdd) {
      initText = this.entryToUpdate.text;
      initLabels = this.entryToUpdate.labels;
      initComments = this.entryToUpdate.comments;
      console.log(initComments[0])
    } else {
      for (lbl of this.mainScreen.labels) {
        initLabels.push({
          key: lbl.key,
          name: lbl.name,
          value: false
        })
      }
    }

    this.state = {
      inputText: initText,
      // labels: initLabels,
      expDate: initExpDate,
      servings: initServing,
      comments: initComments,
      image: require('./images/ImageNotAvailable.png'),
      imageWidth: 100,
      imageHeight: 100,
      
    }
    console.log(this.state)
  }

  updateImage = (imageObject) => {
    let aspectRatio = imageObject.width / imageObject.height;
    let w = 100;
    let h = 100;
    this.setState({
      image: {uri: imageObject.uri},
      imageWidth: w,
      imageHeight: h
    });
    console.log(imageObject.uri);

    let mainScreen = this;
    let uriParts = imageObject.uri.split('/');
    let fname = uriParts[uriParts.length - 1];
    fetch(imageObject.uri).then(response => {
      return response.blob();
    })
    .then(blob => {
      return mainScreen.storageRef.child(fname).put(blob);
    })
    .then(uploadTaskSnapshot => {
      return uploadTaskSnapshot.ref.getDownloadURL();
    })
    .then(downloadURL => {
      mainScreen.currentImageRef.set({imageURI: downloadURL});
    });
  }
  
  handleSave = () => {
    let comments_copy = this.state.comments;
    let newEntry = {
      text: this.state.inputText,
      timestamp: new Date(Date.now()),
      // labels: this.state.labels,
      
      servings: this.state.servings,
      expDate: this.state.expDate,
    };
    console.log('what')
    let mainScreen = this.props.navigation.getParam('mainScreen');
    if (this.isAdd) {
      mainScreen.addEntry(newEntry);
    } else {
      newEntry.key = this.entryToUpdate.key;
      mainScreen.updateEntry(newEntry);
    }
    this.props.navigation.goBack();
  }

  handleLabelToggle = (labelToToggle) => {
    this.setState(prevState => {
      let theLabels = prevState.labels.slice();
      for (label of theLabels) {
        if (label.key === labelToToggle.key) {
          label.value = !label.value;
        }
      }
      return {labels: theLabels};
    });
  }
  
  handleDecrementDate = () =>{
    let expDate = this.state.expDate
    if (expDate > 1){
      expDate =  expDate - 1
    } else{
      expDate = 1
    }
    this.setState({expDate:expDate})
  }
  handleIncrementDate = (value) =>{
    let expDate = this.state.expDate
    console.log(value)
    expDate += value
    this.setState({expDate:expDate})
  }
  handleDecrementServings = (value) =>{
    let serv = this.state.servings
    console.log(value)
    if (serv > 1){
      serv -= 1
    } else{
      serv = 1
    }
    this.setState({servings:serv})
  }
  handleIncrementServings = (value) =>{
    let serv = this.state.servings
    console.log(value)
    serv += value
    this.setState({servings:serv})
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.headerText}>Log food</Text>
            <Image
              style={{width: this.state.imageWidth, height: this.state.imageHeight}}
              source={this.state.image}
            />
            <Button
              title="Take New Pic"
              onPress={()=>{
                this.props.navigation.navigate('Camera', {
                  EntryDetailScreen: this
                })
              }}
            />
          </View>
        <View style={styles.detailsBodyContainer}>
          <View style={styles.detailsInputContainer}>
            {/* <FormLabel>Name</FormLabel> */}
            {/* <FormInput 
              onChangeText={(value)=>{this.setState({inputText: value})}}
              value={this.state.inputText}
            /> */}
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
            <Input
              multiline={false}
              placeholder="Food Name"
              inputContainerStyle={styles.smallInput}
              containerStyle={{justifyContent: 'flex-start'}}
              value={this.state.inputText}
              onChangeText={(value)=>{this.setState({inputText: value})}}
            />
          
          </View>
          <View>
            {/* Expiration Dates */}
            <Text>Expired in {this.state.expDate} days</Text>
              <Button
                title='-1 days'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleDecrementDate()}}
              />
              <Button
                title='+2 days'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementDate(2)}}
              />
              <Button
                title='+5 days'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementDate(5)}}
              />
              <Button
                title='+14 days'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementDate(14)}}
              />
              <Button
                title='+30 days'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementDate(30)}}
              />
          </View>
          <View>
            {/* Serving Times*/}
            <Text>About {this.state.servings} Servings</Text>
              <Button
                title='-1 servings'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleDecrementServings()}}
              />
              <Button
                title='+2 servings'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementServings(2)}}
              />
              <Button
                title='+5 servings'
                containerStyle={styles.smallButtonContainer}
                onPress={()=>{this.handleIncrementServings(5)}}
              />
              
          </View>
          {/* <View style={styles.detailsLabelsContainer}>
            <FlatList
              data={this.state.labels}
              renderItem={({item})=>{
                return(
                  <View style={styles.labelSelectContainer}>
                    <CheckBox
                      containerStyle={styles.labelSelectCheckBoxContainer}
                      checked={item.value}
                      onPress={()=>{this.handleLabelToggle(item)}}
                    />
                    <Text style={styles.labelSelectText}>{item.name}</Text>
                  </View>
                );
              }}
            />
          </View> */}
        </View>
        <View style={styles.footerContainer}>
          <Button
            title='Cancel'
            containerStyle={styles.mediumButtonContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Button
            title='Save'
            containerStyle={styles.mediumButtonContainer}
            onPress={this.handleSave()}
          />
        </View>
      </View>
    );
  }

}