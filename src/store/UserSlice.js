import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'axioscrud',
  initialState,
  reducers: {
    getAll(state , action){
      //state.users.push(action.payload)
      state.users = action.payload
    },
    addUser(state, action){
      const newdata = action.payload;
     return {...state, users : [...state.users,newdata]}
    },
    removeUser(state, action){
      const removedata = action.payload
      state.users = state.users.filter((user)=>user.id!== removedata)
    },
    updateUser(state,action){
      const update = action.payload;
      console.log('updated data : ' , update);
      state.users = state.users.map((user)=> user.id === update.id ? update : user)      
    }
 
  },
});

export const { getAll,removeUser,addUser,updateUser} = userSlice.actions;

export default userSlice.reducer;
    // try {
      //   axios.put(`/users/${update.id}`);
      //   // Update the specific user in the state with the updated data
      //   state.users = state.users.map((user) =>
      //     user.id === update.id ? update : user
      //   );
      // } catch (error) {
      //   console.log(error);
      // }