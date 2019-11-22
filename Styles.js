import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },  
  headerContainer: {
    flex: 0.2,
    justifyContent: 'flex-end'
  },
  headerText: {
    fontSize: 44
  },
  bodyContainer: {
    flex: 0.6,
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
    width: '100%',
    justifyContent: 'flex-start',
  },
  detailsInputContainer: {
    flex: 0.5
  },
  detailsLabelsContainer: {
    flex: 0.5
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
  mediumButtonContainer: {
    flex: 0.5,
    margin: 3,
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
    width: '50%',
    justifyContent: 'center'
  }
});