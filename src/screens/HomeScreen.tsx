import { Alert, FlatList, KeyboardAvoidingView, Platform, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Crypto from 'expo-crypto';

import Button from '../components/Button';
import ListItem from '../components/ListItem';
import useTaskStore, { Task } from '../stores/task-store';
import { AppNavigatorScreenProps } from '../navigators/AppNavigator';
import CheckBox from '../components/CheckBox';

interface HomeScreenProps extends AppNavigatorScreenProps<'home'> {}

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const itemList = useRef<FlatList<Task>>(null);

  const [
    tasks, 
    addTask, 
    updateTask, 
    clearTasks
  ] = useTaskStore((state) => [state.tasks, state.addTask, state.updateTask, state.clear]);

  const renderItem = ({ item }: { item: Task }) =>(
    <ListItem 
      onPress={() => navigation.navigate('task', { item })} 
      style={item.completed ? $itemCompleted : $item} 
      textStyle={$itemText} 
      text={item.text}
    >
      <CheckBox size={35} checked={item.completed} onCheckToggled={checked => updateTask({ ...item, completed: checked })}/>
    </ListItem>
  );

  const handleAddTask = () => {
    addTask({ id: Crypto.randomUUID(), text: inputText, completed: false });
    setInputText('');

    // Potential alternative approach for onContentSizechange
    // when scroll to end is not working would be setTimeout 
    // after this line
  };

  const handleClearTasks = () => {
    Alert.alert(
      'Delete all task(s)', 
      'Proceed to delete all task(s)?', [
        { text: 'Yes', onPress: () => clearTasks() },
        { text: 'No'}
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={$root}>
      <View style={$container}>
        <View style={$header}>
          <Text style={$headerText}>Todo 📋</Text>
          {tasks.length !== 0 && <Ionicons onPress={handleClearTasks} color={'red'} name='trash-outline' size={28}/>}
        </View>
        <FlatList
          renderItem={renderItem}
          data={tasks}
          keyExtractor={t => t.id}
          ref={itemList}
          onContentSizeChange={()=> itemList.current?.scrollToEnd()}
        />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={$inputView}>
        <TextInput placeholder='Add your task here...' onChangeText={setInputText} value={inputText} style={$textInput}/>
        <Button disabled={inputText === ''} style={$button} onPress={handleAddTask}>Add Task</Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#DCDCDC'
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: '2%',
}

const $header: ViewStyle = {
  flex: 0,
  flexDirection: 'row',
  paddingVertical: 4,
  justifyContent: 'space-between',
  alignItems: 'center'
}

const $headerText: TextStyle = {
  fontSize: 25,
  fontWeight: 'bold',
  lineHeight: 28,
  paddingVertical: '2%'
}

const $textInput: TextStyle = {
  fontSize: 16,
  paddingVertical: 8,
  borderRadius: 5,
  backgroundColor: 'white',
  marginVertical: 10,
  paddingHorizontal: 4
}

const $inputView: ViewStyle = {
  borderTopWidth: 1.5,
  borderTopColor: '#C0C0C0',
  paddingHorizontal: '2%'
}

const $item: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8
}

const $itemCompleted: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
  backgroundColor: '#4daf7c'
}

const $itemText: TextStyle = {
  fontSize: 18,
  fontWeight: '500',
  paddingHorizontal: 4
}

const $button: ViewStyle = {
  borderRadius: 5,
  marginBottom: 8,
  paddingVertical: 8
}
