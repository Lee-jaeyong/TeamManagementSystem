import {combineReducers} from "redux";
import Message from './reducer/MessageReducer';
import Confirm from './reducer/ConfirmReducer';
import Form from './reducer/FormReducer';

import Team from './reducer/team/TeamReducer';
import Plan from './reducer/plan/PlanReducer';
import Board from './reducer/Board/BoardReducer';
import User from './reducer/User/UserReducer';

const commonReducers = combineReducers({
    Team,
    Plan,
    Board,
    User,
    /////////////////////
    Message,
    Confirm,
    Form
});

export default commonReducers;