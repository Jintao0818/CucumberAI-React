import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import dataReducer from "./modules/data"
import settingsReducer from "./modules/settings"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
  data: dataReducer,
  settings: settingsReducer
})

const persistConfig = {
  key: 'cucumber_redux_store',
  storage: storage,
  whitelist: ['settings']
}

const persistedRedcer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedRedcer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)


// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type RootDispatch = typeof store.dispatch;


// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store
