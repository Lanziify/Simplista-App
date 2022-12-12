import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setList, setListID} from '../redux/actions';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {GlobalStyle} from '../utils/GlobalStyle';

export default function Home({navigation}) {
  // states for inputfield
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  // selector
  const {list, listId} = useSelector(state => state.smpList);
  // dispatch
  const dispatch = useDispatch();
  // useEffect
  useEffect(() => {
    // AsyncStorage.clear()
    getList();
  }, []);

  const getList = () => {
    AsyncStorage.getItem('List')
      .then(list => {
        const parsedList = JSON.parse(list);
        if (parsedList && typeof parsedList === 'object') {
          dispatch(setList(parsedList));
        }
      })
      .catch(err => console.log(err));
  };

  const createList = () => {
    try {
      var List = {
        ID: listId,
        Title: listTitle,
        Description: listDescription,
        Completed: completed,
      };
      let newList = [...list, List];
      AsyncStorage.setItem('List', JSON.stringify(newList))
        .then(() => {
          dispatch(setList(newList));
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
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

  // function for submiting, opening, and closing the bottom sheet
  function handleSubmit() {
    createList();
    handleClosePress();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 220);
    setListTitle('');
    setListDescription('');
  }
  function handleOpenSheet() {
    dispatch(setListID(list.length + 1));
    handleOpenPress(0);
    focusInput();
  }
  function handleCloseSheet() {
    handleClosePress();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 220);
    setListTitle('');
    setListDescription('');
  }

  const sheetRef = useRef(null);
  const inputRef = useRef(null);

  // variables that set the height of the bottom sheet
  const snapPoints = useMemo(() => ['30%'], []);

  // callbacks that performs opening and closing the bottom sheet
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);
  const handleOpenPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // Focus list title input
  function focusInput() {
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handleClosePress();
        Keyboard.dismiss();
      }}>
      <View style={[styles.container]}>
        {/* Home content which list should be put */}
        <View style={styles.listWrapper}>
          {/* render list */}
          <FlatList
            data={list.filter(list => list.Completed === false)}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.list}
                onPress={() => {
                  handleCloseSheet();
                  dispatch(setListID(item.ID));
                  navigation.navigate('List');
                }}>
                <LinearGradient
                  start={{x: 0, y: 0.75}}
                  end={{x: 1, y: 0.25}}
                  colors={['#F4CDBB', '#FFC5B9']}
                  style={[
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    },
                    StyleSheet.absoluteFillObject,
                  ]}></LinearGradient>
                <View style={styles.itemWrapper}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      tintColors={{true: '#94B0B2', false: '#F6F6F6'}}
                      value={item.Completed}
                      onValueChange={newValue => {
                        checkList(item.ID, newValue);
                      }}
                    />
                    <View style={{width: '80%', paddingLeft: 10}}>
                      <Text style={[GlobalStyle.title, {color: '#F6F6F6'}]}>{item.Title}</Text>
                      <Text style={[GlobalStyle.description, {color: '#F6F6F6'}]} numberOfLines={1}>
                        {item.Description}
                      </Text>
                    </View>
                  </View>
                  <View style={{padding: 10}}>
                    <TouchableOpacity
                      onPress={() => {
                        deleteList(item.ID);
                      }}>
                      <FontAwesome name={'trash'} size={15} color={'#F6F6F6'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Button that opens the bottom sheet panel */}
        <TouchableOpacity
          style={[styles.createListBtn, GlobalStyle.shadow]}
          onPress={() => {
            handleOpenSheet();
          }}>
          <LinearGradient
            start={{x: 0, y: 0.75}}
            end={{x: 1, y: 0.25}}
            colors={['#F4CDBB', '#FFC5B9']}
            style={[styles.gradientBtn, StyleSheet.absoluteFillObject]}>
            <FontAwesome name={'plus'} size={25} color={'#F6F6F6'} />
          </LinearGradient>
        </TouchableOpacity>
        {/* Bottom sheet that creates that list*/}
        <BottomSheet
          style={styles.bottomsheet}
          ref={sheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          keyboardBlurBehavior={'restore'}
          backgroundStyle={{borderRadius: 25}}
          enablePanDownToClose={true}>
          <BottomSheetView style={styles.bottomsheetview}>
            <View style={styles.bottomsheet_contents}>
              {/* Button that exits the bottom sheet */}
              <TouchableOpacity
                onPress={() => {
                  handleCloseSheet();
                }}>
                <Text style={GlobalStyle.text}>Cancel</Text>
              </TouchableOpacity>
              <View>
                {/* Title of the bottom sheet */}
                <Text style={GlobalStyle.headerTitle}>Create List</Text>
              </View>
              {/* Button that creates the list */}
              {listTitle.trim().length > 0 ? (
                <TouchableOpacity
                  disabled={!listTitle}
                  onPress={() => {
                    // This will create the list after pressing
                    handleSubmit();
                  }}>
                  <Text style={[GlobalStyle.text]}>Create</Text>
                </TouchableOpacity>
              ) : (
                <Text style={GlobalStyle.disabled}>Create</Text>
              )}
            </View>
            {/* List Title/Name */}
            <BottomSheetTextInput
              ref={inputRef}
              style={GlobalStyle.input}
              value={listTitle}
              placeholder="Title"
              onChangeText={setListTitle}
            />
            {/* List Description */}
            <BottomSheetTextInput
              style={[GlobalStyle.input, {textAlignVertical: 'top'}]}
              value={listDescription}
              placeholder="Description"
              onChangeText={setListDescription}
              multiline={true}
              height={80}
              maxHeight={80}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  createListBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  },
  gradientBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  bottomsheet: {
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 24,
  },
  bottomsheetview: {
    padding: 15,
    alignItems: 'center',
  },
  bottomsheet_contents: {
    // paddingBottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginVertical: 6.5,
    marginHorizontal: 18,
    padding: 10,
    justifyContent: 'center',
  },
});
