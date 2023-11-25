import { ScrollView, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, useState } from 'react'

import { AppNavigatorScreenProps } from '../navigators/AppNavigator';
import useTaskStore from '../stores/task-store';
import Button from '../components/Button';
import CheckBox from '../components/CheckBox';

interface TaskScreenProps extends AppNavigatorScreenProps<'task'> {}

export const TaskScreen: FC<TaskScreenProps> = ({ navigation, route }) => {
  const [inputText, setInputText] = useState(route.params.item.text);
  const [isCompleted, setIsCompleted] = useState(route.params.item.completed);

  const [updateTask, removeTask] = useTaskStore((state) => [state.updateTask, state.removeTask]);

  const handleUpdateTask = () => {
    updateTask({ id: route.params.item.id, text: inputText, completed: isCompleted });
    navigation.navigate('home');
  };

  const handleDeleteTask = () => {
    removeTask(route.params.item.id);
    navigation.navigate('home');
  };

  return (
    <SafeAreaView style={$root}>
      <ScrollView keyboardShouldPersistTaps='handled' scrollEnabled={false} contentContainerStyle={$container}>
        <View>
          <Text style={$headerText}>Edit Task</Text>
          <TextInput onChangeText={setInputText} style={$textInput} value={inputText}/>
          <View style={$checkBoxContainer}>
            <CheckBox checked={isCompleted} onCheckToggled={setIsCompleted} size={32}/>
            <Text style={$checkBoxText}>Completed</Text>
          </View>
        </View>
        <View>
          <Button style={$button} disabled={inputText === ''} onPress={handleUpdateTask}>Save</Button>
          <Button style={$deleteButton} onPress={handleDeleteTask}>Delete</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TaskScreen;

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: '#DCDCDC'
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
  paddingHorizontal: '2%',
}

const $headerText: TextStyle = {
  fontSize: 25,
  fontWeight: 'bold',
  lineHeight: 28,
  paddingVertical: '2%'
}

const $checkBoxContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center'
}

const $checkBoxText: TextStyle = {
  fontSize: 18,
  marginLeft: 4
}

const $textInput: TextStyle = {
  fontSize: 18,
  paddingVertical: 8,
  borderRadius: 5,
  backgroundColor: 'white',
  marginBottom: 5,
  paddingHorizontal: 4
}

const $deleteButton: ViewStyle = {
  backgroundColor: 'red',
  borderRadius: 5,
  marginBottom: 8,
  paddingVertical: 8
}

const $button: ViewStyle = {
  borderRadius: 5,
  marginBottom: 8,
  paddingVertical: 8
}