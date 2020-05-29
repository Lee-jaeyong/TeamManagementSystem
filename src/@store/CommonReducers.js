import {combineReducers} from "redux";
import Message from './reducer/MessageReducer';
import Team from './reducer/team/TeamReducer';

const commonReducers = combineReducers({
    Message,
    Team
});

export default commonReducers;