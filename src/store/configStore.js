import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import thunkMiddleware from 'redux-thunk';


import reducers from "../reducers";
const persistConfig = {
    key: "@APP:state",
    storage: AsyncStorage,
    writeFailHandler: function (err) {
        console.log("writeFailHandler::::", err);
    }
}
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
export const persistor = persistStore(store);