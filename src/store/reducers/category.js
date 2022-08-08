import * as actionTypes from '../actionTypes/category';
import { updateObject } from '../utility';

const initialState = {
    categories:[],
    selectedCategory:{
        parentCategory:'',
        childCategory:''
    }
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CATEGORIES:
            return updateObject(state,{
                    categories:action.payload
                })
        default: 
            return state
    
    }
}

export default categoryReducer;