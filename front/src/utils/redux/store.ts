import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from '../../features/authentication/authenticationSlice'
import { userSlice } from '../../features/user/userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// creation et configuration du store

const rootPersistConfig = {
	key: 'state',
	storage,
	version: 1,
	blacklist: ['authentication']
}
const authPersistConfig = {
	key: 'auth',
	storage,
	version: 1,
	blacklist: ['response']
}

const rootReducer = combineReducers({
	authentication: persistReducer(authPersistConfig, authenticationSlice.reducer),
	userInfos: userSlice.reducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

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
