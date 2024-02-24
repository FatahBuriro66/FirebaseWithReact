import { createSlice, nanoid } from '@reduxjs/toolkit'


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [{ id: 1, title: 'I have to do a meet at 10pm' }]
    },
    reducers: {
        addItem: (state, action) => {
            const { payload } = action
            state.todos = [...state.todos, { id: nanoid(), title: payload.title }]
        },
        removeItem: (state, action) => {
            const { payload } = action
            state.todos = state.todos.filter(todo => {
                return todo.id !== payload.id
            })
        },
        updateItem : (state, action) => {
            
        }
    }
})

export const { addItem, removeItem } = todoSlice.actions

export default todoSlice.reducer

