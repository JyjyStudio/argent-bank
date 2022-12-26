import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useTsSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTsDispatch = () => useDispatch<AppDispatch>() 