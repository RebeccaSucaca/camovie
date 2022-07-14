import  { useReducer } from 'react';
const initialState = { movieNo: null, showingNo: null, seatNo: [] };

const useRecordSelect=()=>{

    const reducer = (state, action) => {
        switch (action.type) {
            case 'MOVIENO': return { ...state, movieNo: action.movieNo};
            case 'SHOWINGNO': return { ...state, showingNo: action.showingNo};
            case 'SEATSNO': return { ...state, seatNo: action.seatNo};
            default: return state;
        }
    };
    const [data, dispatch] = useReducer(reducer, initialState);
    // dispatch(what);

    return [data,dispatch]
}

export default useRecordSelect;