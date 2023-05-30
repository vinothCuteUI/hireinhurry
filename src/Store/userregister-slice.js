import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cartslice",
    initialState:{
        userItem:[],
        changed:false
    },
    reducers:{
        responseData(state, action){
            state.userItem = action.payload.item
        },
        addUserItem(state, action){
            const newItem = action.payload;
            const existItem = state.item.find(items => items.email === newItem.email);
            state.changed = true;
            
        },
        removeUserItem(state, action){
            const id = action.payload;
            const existItemData = state.item.find(items => items.id === id);
            state.changed = true;
            if(existItemData.qty === 1){
                state.item = state.item.filter(data => data.id !== id);
                state.totalQty--;
            }else{
                existItemData.qty--;
                existItemData.totalPrice = existItemData.totalPrice - existItemData.price;
            }
        }
    }
})


export const sendUserData = (userData) => {
    return async (dispatchUserData) =>{
        const sendData = async () =>{
            const response = await axios.post("https://hihdev.datawomb.com/hihmos/api/company/register", {...userData});
            dispatchUserData(LeadsSlice.actions.addUserItem({...leadItem}));
        }
        try{
            await sendData();
        }
        catch(err){
            console.log(err);
        }
    }
}

export const cartAction = cartSlice.actions;
export default cartSlice;