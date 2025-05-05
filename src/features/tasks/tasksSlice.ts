import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface Task {
    id: number
    title: string
    completed: boolean
}

interface TasksState {
    tasks: Task[]
}

const initialState: TasksState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask = {
                id: Math.random(),
                title: action.payload,
                completed: false
            }
            state.tasks.push(newTask)
        },
        toggleCompleted: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id == action.payload)
            if (task) {
                task.completed = !task.completed
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => {
                return task.id !== action.payload
            })
        }
    }
})

export const { addTask, toggleCompleted, removeTask } = tasksSlice.actions
export default tasksSlice.reducer