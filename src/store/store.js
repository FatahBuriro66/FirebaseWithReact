// import { configureStore } from '@reduxjs/toolkit'
// import counterSlice from './slices/counter.slice'


// const store = configureStore({
//     reducer: {
//         counter : counterSlice
//     }
// })

// export default store



import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slices/todo.slice';


const store = configureStore({
    reducer : {
        todo : todoReducer
    }
})

export default store