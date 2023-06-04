import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ContactState {
  firstName: string,
  lastName: string,
  status: string,
  id: number
}

const initialState: ContactState[] = []

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addOrUpdate: (state, action: PayloadAction<ContactState>) => {
      // Check if contact already exists
      if(state.length > 0) {
        const index = state.findIndex((contact) => (contact.id === action.payload.id))
        if(index !== -1) {
          state[index] = {...action.payload, id: state[index].id + 1}
          return
        }
      }
      // If contact does not exist, add it
      state.push({...action.payload, id: state.length + 1})
    },
    delete: (state, action: PayloadAction<ContactState['id']>) => {
      const index = state.findIndex((contact) => contact.id === action.payload)
      if(index !== -1) {
        state.splice(index, 1)
      }
    }
  }
})

export const { addOrUpdate, delete: deleteContact } = contactSlice.actions

export default contactSlice.reducer