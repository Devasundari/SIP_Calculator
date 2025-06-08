// const redux=require('redux')
// const configureStore = redux.configureStore


// //state
// const theme ="THEME"

// //action
// // {
// //     type:theme
// // }

// //action creator
// function theme(){
//     return {
//         type: theme,
//         payload: theme
//     }
// }

// //reducer
// const initialState = {
//     theme: 'light'
// }

// function themeReducer(state=initialState,action){
//     switch(action.type){
//         case theme:
//             return{
//                 ...state,
//                 theme: action.payload
//             }

//             default:
//                 return state 
//     }
// }


// const store = configureStore(themeReducer)//holds the state of the app
// console.log(store.getState())//allows access to the state of the app
// store.dispatch(theme())//dispatches the action creator to the store
// const unsubscribe=store.subscribe(()=>{
//     console.log(store.getState())//register listener
// })
// unsubscribe()//unregister listener