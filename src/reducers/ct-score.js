const SET_CT_SCORE = 'scratch-gui/cpScore/SET_CT_SCORE';

const initialState = {
    logic: 0
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_CT_SCORE:
        return {
            logic: action.logic
        };
    default:
        return state;
    }
};

const setCtScore = function (ctScoreLogic) {
    return {
        type: SET_CT_SCORE,
        logic: ctScoreLogic
    };
};

export {
    reducer as default,
    initialState as cpScoreInitialState,
    setCtScore
};
