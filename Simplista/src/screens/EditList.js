import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setList} from '../redux/actions';
import {GlobalStyle} from '../utils/GlobalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';

export default function CreateList({navigation}) {
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [bellTime, setBellTime] = useState('1');
  const [showModal, setShowModal] = useState(false);

  const {list, listId} = useSelector(state => state.smpList);

  const dispatch = useDispatch();

  useEffect(() => {
    getListItem();
  }, []);

  const setAlarm = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'task-channel',
      title: listTitle,
      message: listDescription,
      date: new Date(Date.now() + parseInt(bellTime) * 60 * 1000),
      allowWhileIdle: true,
    });
  };

  const getListItem = () => {
    const selectedList = list.find(list => list.ID === listId);
    if (selectedList) {
      setListTitle(selectedList.Title);
      setListDescription(selectedList.Description);
      setCompleted(selectedList.Completed);
    }
  };

  const updateList = () => {
    try {
      var List = {
        ID: listId,
        Title: listTitle,
        Description: listDescription,
        Completed: completed,
      };
      let newList = [];
      const index = list.findIndex(list => list.ID === listId);
      if (index > -1) {
        newList = [...list];
        newList[index] = List;
      } else {
        console.log('found');
        newList = [...list, List];
      }
      AsyncStorage.setItem('List', JSON.stringify(newList))
        .then(() => {
          dispatch(setList(newList));
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  function handleSubmit() {
    updateList();
    setTimeout(() => {
      Keyboard.dismiss();
    }, 220);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => {
              handleSubmit();
              navigation.goBack();
            }}>
            <FontAwesome name={'chevron-left'} size={20} color={'#324B4C'} />
            <Text style={{color: '#324B4C', paddingLeft: 10}}>Back</Text>
          </TouchableOpacity>
          {/* Btn that opens the modal component */}
          <TouchableOpacity
            style={{paddingRight: 20}}
            onPress={() => {
              // Set the state to 0 to open the modal
              setShowModal(true);
            }}>
            <FontAwesome name={'bell'} size={20} color={'#324B4C'} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                GlobalStyle.title,
                {width: '100%', fontSize: 20, paddingHorizontal: 20},
              ]}
              value={listTitle}
              placeholder="Title"
              onChangeText={setListTitle}
              multiline={true}
            />
            <TextInput
              style={{color: '#324B4C', paddingHorizontal: 20}}
              value={listDescription}
              placeholder="Description"
              onChangeText={setListDescription}
              multiline={true}
            />
          </View>
        </ScrollView>
        {/* Modal component */}
        <Modal
          visible={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
          transparent={true}
          animationType="fade"
          hardwareAccelerated={true}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalCard}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowModal(false)}>
                <FontAwesome
                  name={'times-circle'}
                  size={20}
                  color={'#324B4C'}
                />
              </TouchableOpacity>
              <Text>Remind me After</Text>
              <View style={styles.scheduleTimeWrapper}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={bellTime}
                  onChangeText={value => setBellTime(value)}
                />
                <Text style={GlobalStyle.description}>minute(s)</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.okayBtn}
                  onPress={() => {
                    setAlarm();
                    setShowModal(false);
                  }}>
                  <LinearGradient
                    start={{x: 0, y: 0.75}}
                    end={{x: 1, y: 0.25}}
                    colors={['#F4CDBB', '#FFC5B9']}
                    style={[styles.gradientBtn, StyleSheet.absoluteFillObject]}>
                    <FontAwesome
                      name={'check-circle'}
                      size={25}
                      color={'#F6F6F6'}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backBtn: {
    flexDirection: 'row',
    width: 60,
    alignItems: 'center',
    marginLeft: 20,
  },
  inputWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  updateBtn: {
    width: 120,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#F4CDBB',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    padding: 20,
    width: 320,
    height: 180,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    elevation: 24,
  },
  scheduleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  closeBtn: {
    width: 20,
    margin: 10,
    right: 0,
    position: 'absolute',
  },
  scheduleTimeWrapper: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  gradientBtn: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
