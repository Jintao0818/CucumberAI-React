import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CheckboxValueType } from "antd/es/checkbox/Group"


interface settingsStore {
  modeValue: string,
  characterValue: CheckboxValueType[],
  compressionSize: string,
  checkAll: boolean,
  indeterminate: boolean
}

const initialState: settingsStore = {
  modeValue: 'pulp',
  characterValue: [],
  compressionSize: '640',
  checkAll: false,
  indeterminate: false

}

const settingsStore = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setModeValue(state, action: PayloadAction<string>) {
      state.modeValue = action.payload
    },
    setCharacterValue(state, action: PayloadAction<CheckboxValueType[]>) {
      state.characterValue = action.payload
    },
    setCompressionSize(state, action: PayloadAction<string>) {
      state.compressionSize = action.payload
    },
    setCheckAll(state, action: PayloadAction<boolean>) {
      state.checkAll = action.payload
    },
    setIndeterminate(state, action: PayloadAction<boolean>) {
      state.indeterminate = action.payload
    }
  }
})

export const { setModeValue, setCharacterValue, setCompressionSize, setCheckAll, setIndeterminate } = settingsStore.actions

const settingsReducer = settingsStore.reducer
export default settingsReducer