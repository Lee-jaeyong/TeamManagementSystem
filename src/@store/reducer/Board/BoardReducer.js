import {
  READ_BOARD_LIST,
  READ_BOARD,
  INSERT_BOARD,
} from "../../actions/Board/BoardAction";

const init = {
  boardList: [],
  totalCount: 0,
  board: {},
};

export default function BoardReducer(
  state = init,
  { boardList, board, totalCount, type }
) {
  switch (type) {
    case READ_BOARD_LIST:
      return Object.assign({}, state, {
        boardList: boardList,
        totalCount: totalCount,
      });
    case READ_BOARD:
      return Object.assign({}, state, {
        board: board,
      });
    case INSERT_BOARD:
      return Object.assign({}, state, {
        totalCount: state["totalCount"] + 1,
        boardList: state["boardList"].concat(board),
      });
    default:
      return state;
  }
}
