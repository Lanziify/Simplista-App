import react from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setList, setListID} from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {GlobalStyle} from '../utils/GlobalStyle';

export default function Completed({navigation}) {
  const {list} = useSelector(state => state.smpList);
  // dispatch
  const dispatch = useDispatch();
  // useEffect

  const checkList = (id, newValue) => {
    const index = list.findIndex(list => list.ID === id);
    if (index > -1) {
      let newList = [...list];
      newList[index].Completed = newValue;
      AsyncStorage.setItem('List', JSON.stringify(newList))
        .then(() => {
          dispatch(setList(newList));
        })
        .catch(err => console.log(err));
    }
  };

  const deleteList = id => {
    const filteredList = list.filter(list => list.ID !== id);
    AsyncStorage.setItem('List', JSON.stringify(filteredList))
      .then(() => {
        dispatch(setList(filteredList));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={[styles.container]}>
      {/* Home content which list should be put */}
      <View style={styles.listWrapper}>
        <FlatList
          data={list.filter(list => list.Completed === true)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                dispatch(setListID(item.ID));
                navigation.navigate('List');
              }}>
              <View style={styles.itemWrapper}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CheckBox
                    tintColors={{true: '#324B4C80'}}
                    value={item.Completed}
                    onValueChange={newValue => {
                      checkList(item.ID, newValue);
                    }}
                  />
                  <View style={{width: '80%', paddingLeft: 10}}>
                    <Text
                      style={[
                        GlobalStyle.title,
                        {
                          textDecorationLine: 'line-through',
                          color: '#324B4C80',
                        },
                      ]}>
                      {item.Title}
                    </Text>
                    <Text
                      style={[
                        GlobalStyle.description,
                        {
                          textDecorationLine: 'line-through',
                          color: '#324B4C80',
                        },
                      ]}
                      numberOfLines={1}>
                      {item.Description}
                    </Text>
                  </View>
                </View>
                <View style={{padding: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteList(item.ID);
                    }}>
                    <FontAwesome name={'trash'} size={15} color={'#324B4C80'} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listWrapper: {
    flex: 1,
    width: '100%',
  },
  list: {
    marginVertical: 8,
    marginHorizontal: 26,
    padding: 10,
    backgroundColor: '#94B0B280',
    borderRadius: 10,
    justifyContent: 'center',
  },
});
