import {combineReducers} from "redux";
import Message from './reducer/MessageReducer';
import Confirm from './reducer/ConfirmReducer';
import Form from './reducer/FormReducer';

import Team from './reducer/team/TeamReducer';
import Plan from './reducer/plan/PlanReducer';
import Board from './reducer/Board/BoardReducer';

const commonReducers = combineReducers({
    Team,
    Plan,
    Board,
    /////////////////////
    Message,
    Confirm,
    Form
});

export default commonReducers;