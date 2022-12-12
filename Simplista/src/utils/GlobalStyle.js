import {StyleSheet} from 'react-native';

export const GlobalStyle = StyleSheet.create({
  input: {
    margin: 5,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
  },
  headerTitle: {
    fontFamily: 'Lato-Black',
    color: '#324B4C',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Lato-Black',
    color: '#324B4C',
  },
  description: {
    paddingTop: 5,
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    color: '#324B4C',
    textAlign: 'justify'
  },
  text: {
    fontFamily: 'Lato-Bold',
    color: '#324B4C',
  },
  disabled: {
    fontFamily: 'Lato-Regular',
    color: 'gray',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 6,
  },
});
