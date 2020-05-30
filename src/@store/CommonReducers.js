import {combineReducers} from "redux";
import Message from './reducer/MessageReducer';
import Confirm from './reducer/ConfirmReducer';
import Form from './reducer/FormReducer';

import Team from './reducer/team/TeamReducer';
import Plan from './reducer/plan/PlanReducer';

const commonReducers = combineReducers({
    Message,
    Team,
    Plan,
    Confirm,
    Form
});

export default commonReducers;