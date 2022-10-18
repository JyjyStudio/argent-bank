import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from '../../features/authentication/authenticationSlice'
import { userSlice } from '../../features/user/userSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSliceV2 } from '../../features/user/userSliceV2'
import { themeSlice } from '../../features/theme/themeSlice'

// creation et configuration du store

const userPersistConfig = {
	key: 'user',
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
const themePersistConfig = {
	key: 'theme',
	storage,
	version: 1,
}

const rootReducer = combineReducers({
	authentication: persistReducer(authPersistConfig, authenticationSlice.reducer),
	userInfos: persistReducer(userPersistConfig, userSliceV2.reducer),
	theme: persistReducer(themePersistConfig, themeSlice.reducer)
})

export const store = configureStore({
	reducer: rootReducer,
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
