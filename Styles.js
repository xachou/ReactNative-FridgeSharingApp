import { StyleSheet } from 'react-native';
import { Row } from 'native-base';


export const styles = StyleSheet.create({
  deleteButton: {
    color: 'blue',  
  },
  container: {
    flex: 1.0,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  headerContainer: {
    flex: 0.1,
    flexDirection: "column",
    justifyContent: 'center'
  },
  detailsHeaderContainer: {
    justifyContent: 'center', 
  },
  headerText: {
    fontSize: 28
  },
  bodyContainer: {
    flex: 0.8,
    padding: 10, 
    width: '100%',
    justifyContent: 'flex-start',
  },
  loginBodyContainer: {
    flex: 0.4,
    padding: 20,
    width: '100%',
    justifyContent: 'flex-end',
    
  },
  bodyListItem: {
    marginLeft: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 15,
    width: '95%',
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 6,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 4, //IOS
  },
  cardTag: {
    backgroundColor: '#03203f',
    borderRadius: 20,
    height: 17, 
    flexDirection: 'row',
    alignSelf:'flex-start',
    marginLeft: -4,
    paddingRight: 8,
    paddingLeft: 8,
    marginTop: 5,
  },
  cardTagText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    margin: 20,
  },
  cardLeft: {
    flex: 0.2,
    height: 80,
    width: 40,
    alignSelf:'center',
    marginLeft: -6,    
    borderRadius: 6,
  },
  cardMiddle: {
    flex: 0.6,
    padding: 13,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 0.5,
    paddingBottom: 20,
  },
  cardTime: {
    fontSize: 12,
    color: "#666666",
    paddingTop: 5
  },
  cardRight: {
    flex: 0.2,
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop:3,
    paddingBottom:3
  },
  cardRightServing: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  cardServing: {
    fontSize: 14,
    color: "#666666",
    paddingTop: 10
  },
  bodyListItemLeft: {
    flex: 0.5,
    margin: 10,
    flexDirection: 'column',
  },
  bodyListItemRight: {
    flex: 0.5,
    margin: 10,
    flexDirection: 'row',
  },
  bodyListItemDate: {
    fontSize: 12
  },
  bodyListItemText: {
    fontSize: 18
  },
  detailsBodyContainer: {
    flex: 0.6,
    padding: 20, 
    width: '65%',
  },
  detailsInputContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderStyle: {
    fontSize: 40
  },
  smallInput: {
    borderBottomWidth: 0,
    width: 200
  },
  commentInput: {
    borderBottomWidth: 1,
  },
  detailsLabelsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  optionContainers: {
    marginBottom: 20,
  },
  labelSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  labelSelectCheckBoxContainer: {
    padding: 1,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  labelSelectText: {
    fontSize: 16
  },
  mediumButtonTitle: {
    fontSize: 14
  },
  largeInput: {
    borderWidth: 1,
    borderColor: 'black',
    height: '95%'
  },
  footerContainer: {
    flex: 0.15,
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center'
  },
  loginFooterContainer: {
    flex: 0.5,
    flexDirection: 'column',
    width: '100%',
    padding: 30,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonContainer: {
    paddingBottom: 10,
  },
  mediumButtonContainer: {
    margin: 3,
  },
  detailButtons: {
    flexDirection: 'row',
    // paddingLeft: 50,
    // paddingRight: 50,
    justifyContent: 'center',
  },
  smallButtonContainer: {
    margin: 3,
  },
  commentContainer: {
    marginTop: 10,
    flex: 0.8,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'space-around'
    },
  commentBody:{
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    backgroundColor: "#00D098",
    borderRadius: 19,
    flexDirection: 'row',
    alignSelf:'flex-start',
    marginBottom: 13,
    justifyContent: "space-between"
  },
  commentText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    margin: 10,
  },
  separator: {
    // marginTop: 3,
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  bodyRow: {
    paddingBottom: 10
  },
});