import React from 'react';
import * as Permissions from 'expo-permissions';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Button } from 'react-native-elements';
export class CameraScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
      };  
    }
  
    componentDidMount() {
      Permissions.askAsync(Permissions.CAMERA).then(permStatus => {
        this.setState({ hasCameraPermission: permStatus.status === 'granted' });
      });
  
    }
  
    handleTakePicture = () => {
      let EntryDetailScreen = this.props.navigation.getParam('EntryDetailScreen');
      console.log(EntryDetailScreen)
      this.camera.takePictureAsync().then((picData)=>{
        EntryDetailScreen.updateImage(picData);
        this.props.navigation.goBack();
      })
    }
  
    render() {
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Camera 
              style={{ flex: 1 }} 
              type={this.state.type}
              ratio={'4:3'}
              ref={cameraRef => {
                this.camera = cameraRef;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 
                    Flip 
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
            <Button
              title='Take Picture'
              onPress={this.handleTakePicture}
            />
          </View>
        );
      }
    }
  }