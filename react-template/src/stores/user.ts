import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name
      state.token = action.payload.token
    },
    logout: state => {
      state.name = ''
      state.token = ''
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
