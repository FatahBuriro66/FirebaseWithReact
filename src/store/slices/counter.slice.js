import {
    createSlice
} from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 'black'
    },
    reducers: {
        
    }
})


export const {  } = counterSlice.actions
export default counterSlice.reducer
