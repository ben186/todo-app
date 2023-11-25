import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string,
  text: string,
  completed: boolean
}

interface TaskState {
  tasks: Task[],
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  removeTask: (id: string) => void;
  clear: () => void;
}

const useTaskStore = create<TaskState>()(
  persist((set, get) => ({
    tasks: [],
    addTask: (task: Task) => {
      set((state) => ({ tasks: [...state.tasks, task] }));
    },
    updateTask: (task: Task) => {
      const tasks = get().tasks;
      const index = tasks.findIndex(t => t.id === task.id);
      tasks[index] = {...tasks[index], text: task.text, completed: task.completed};

      set(() => ({ tasks: [...tasks] }));
    },
    removeTask: (id: string) => {
      const tasks = get().tasks;
      const filteredTasks = tasks.filter(t => t.id !== id);

      set(() => ({ tasks: filteredTasks }));
    },
    clear: () => {
      set(() => ({ tasks: [] }));
    }
  }), 
  { 
    name: 'task-storage',
    storage: createJSONStorage(() => AsyncStorage)
  })
)

export default useTaskStore;