import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },  
  headerContainer: {
    flex: 0.1,
    justifyContent: 'flex-end'
  },
  detailsHeaderContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10
  },
  headerText: {
    fontSize: 28
  },
  bodyContainer: {
    flex: 0.4,
    padding: 40, 
    width: '100%',
    justifyContent: 'flex-start',
  },
  bodyListItem: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
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
    flex: 0.3,
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
  }
});