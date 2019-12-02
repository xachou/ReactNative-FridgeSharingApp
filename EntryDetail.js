import React from 'react';
import { View, Text, FlatList, Image} from 'react-native';
import { Button, Input, CheckBox } from 'react-native-elements';
import { styles } from './Styles';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export class EntryDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    this.entryToUpdate = this.props.navigation.getParam('entry', undefined);
    this.mainScreen = this.props.navigation.getParam('mainScreen');
    this.isAdd = (typeof this.entryToUpdate === 'undefined');

    let initText = '';
    let initExpDate = 5;
    let initServing = 2;
    let initLabels = [];
    let initComments = [];

    //this check if we are going to use this page for adding or editing
    if (!this.isAdd) {
      initText = this.entryToUpdate.text;
      initLabels = this.entryToUpdate.labels;
      initComments = this.entryToUpdate.comments;
      initExpDate = this.entryToUpdate.expDate;
      initServing = this.entryToUpdate.servings;
    } else {
      for (lbl of this.mainScreen.labels) {
        initLabels.push({
          key: lbl.key,
          name: lbl.name,
          value: false
        })
      }
    }

    // state
    this.state = {
      inputText: initText,
      labels: initLabels,
      expDate: initExpDate,
      servings: initServing,
      comments: initComments,
      image: require('./images/ImageNotAvailable.png'),
      imageWidth: 240,
      imageHeight: 180,
    }

  }

  updateImage = (imageObject) => {
    let aspectRatio = imageObject.width / imageObject.height;
    let w = 240;
    let h = 180;
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
    console.log(this.state)
    let newEntry = {
      text: this.state.inputText,
      timestamp: new Date(Date.now()),
      labels: this.state.labels,
      comments: this.state.comments,
      servings: this.state.servings,
      expDate: this.state.expDate,
    };
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
        <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Log food</Text>
        </View>
          <View style={styles.detailsHeaderContainer}>
            <Image
              style={{width: this.state.imageWidth, height: this.state.imageHeight}}
              source={this.state.image}
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
              placeholder="Add your food item here"
              placeholderStyle={styles.placeholderStyle}
              inputContainerStyle={styles.smallInput}
              value={this.state.inputText}
              onChangeText={(value)=>{this.setState({inputText: value})}}
            />
            <MaterialCommunityIcons
              name="camera"
              size={25}
              color="black"
              onPress={()=>{
                this.props.navigation.navigate('Camera', {
                  EntryDetailScreen: this
                })
              }}/>
          </View>
          <View>
          <View style={styles.optionContainers}>
            {/* Expiration Dates */}
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Expired in {this.state.expDate} days</Text>
              <View style={styles.detailButtons}>
                <Button
                  title='-1'
                  titleStyle={{
                    color: "#00D098",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    borderRadius: 2,
                    backgroundColor: "white",
                    borderColor: "#00D098",
                    borderWidth: 1,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleDecrementDate()}}
                />
                <Button
                  title='+2'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementDate(2)}}
                />
                <Button
                  title='+5'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementDate(5)}}
                />
                <Button
                  title='+14'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementDate(14)}}
                />
                <Button
                  title='+30'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementDate(30)}}
                />
              </View>
          </View>
          <View>
            {/* Serving Times*/}
            <Text style={{ fontSize: 14, textAlign: 'center' }}>About {this.state.servings} Servings</Text>
              <View style={styles.detailButtons}>
                <Button
                  title='-1'
                  titleStyle={{
                    color: "#00D098",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    borderRadius: 2,
                    backgroundColor: "white",
                    borderColor: "#00D098",
                    borderWidth: 1,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleDecrementServings()}}
                />
                <Button
                  title='+2'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementServings(2)}}
                />
                <Button
                  title='+5'
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                  }}
                  buttonStyle={{
                    backgroundColor: "#00D098",
                    borderRadius: 2,
                    height: 38,
                    width: 50,  
                  }}
                  containerStyle={styles.smallButtonContainer}
                  onPress={()=>{this.handleIncrementServings(5)}}
                />
              </View>
              </View>
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
            titleStyle={{
              color: "#00D098",
              fontSize: 14,
            }}
            buttonStyle={{
              borderRadius: 19,
              backgroundColor: "white",
              borderColor: "#00D098",
              borderWidth: 1,
              height: 38,
              width: 122,  
            }}
            containerStyle={styles.mediumButtonContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Button
            title='Save'
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
            containerStyle={styles.mediumButtonContainer}
            onPress={this.handleSave}
          />
        </View>
      </View>
    );
  }

}