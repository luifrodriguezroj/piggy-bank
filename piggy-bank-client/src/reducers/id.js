const idReducer = (state = 0, action)=> {
    switch(action.type) {
        case 'CHANGE':
            return action.id;
        default:
            return state;
    }
};

export default idReducer;