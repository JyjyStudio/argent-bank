import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from '../../features/authentication/authenticationSlice'
import { userSlice } from '../../features/user/userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'


// creation et configuration du store

const persistConfig = {
	key: 'state',
	storage: sessionStorage,
	version: 1,
}

const rootReducer = combineReducers({
	authentication: authenticationSlice.reducer,
	userInfos: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
	devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
