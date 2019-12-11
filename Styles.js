import { StyleSheet } from 'react-native';


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
    justifyContent: 'center',
    marginTop: 10
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
  bodyListItem: {
    width: '100%'
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
    flex: 0.5
  },
  optionContainers: {
    marginTop: 10,
    marginBottom: 40,
  },
  labelSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelSelectCheckBoxContainer: {
    padding: 1,
    margin: 1
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
    marginTop: 10,
  },
  commentContainer: {
    marginTop: 10,
    flex: 0.8,
    width: '100%',
    alignContent: 'center'
    },
  commentBody:{
    marginLeft: 10,
    marginRight: 10,
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
    margin: 20,

  }
});