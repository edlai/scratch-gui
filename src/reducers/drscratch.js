const SET_DRSCRATCH = 'scratch-gui/drScratch/SET_DRSCRATCH';
const GET_DRSCRATCH = 'scratch-gui/drScratch/GET_DRSCRATCH';

const initialState = {
    Abstraction: 0,
    Parallelization: 0,
    Logic: 0,
    Synchronization: 0,
    FlowControl: 0,
    UserInteractivity: 0,
    DataRepresentation: 0,
    TotalScore: 0,
    Level: ''
};

const reducer = function (state, action) {
    console.log('redux-reducer: ', action.type);
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_DRSCRATCH:
        console.log('redux-store-SET_DRSCRATCH: ', action.type);
        return Object.assign({}, state, {
            Abstraction: action.Abstraction,
            Parallelization: action.Parallelization,
            Logic: action.Logic,
            Synchronization: action.Synchronization,
            FlowControl: action.FlowControl,
            UserInteractivity: action.UserInteractivity,
            DataRepresentation: action.DataRepresentation,
            TotalScore: action.TotalScore,
            Level: action.Level
        });
    default:
        return state;
    }
};

const setDrScratch = function (score) {
    console.log('redux-action: ', score);
    console.log('this.state.Level: ');
    return {
        type: SET_DRSCRATCH,
        Abstraction: score.Abstraction,
        Parallelization: score.Parallelization,
        Logic: score.Logic,
        Synchronization: score.Synchronization,
        FlowControl: score.FlowControl,
        UserInteractivity: score.UserInteractivity,
        DataRepresentation: score.DataRepresentation,
        TotalScore: score.TotalScore,
        Level: score.Level

    };
};

export {
    reducer as default,
    initialState as drScratchInitialState,
    setDrScratch
};
