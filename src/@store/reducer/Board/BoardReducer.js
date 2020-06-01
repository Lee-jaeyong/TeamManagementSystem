import {
  READ_BOARD_LIST,
  READ_BOARD,
  INSERT_BOARD,
  DELETE_BOARD,
  UPDATE_BOARD,
} from "../../actions/Board/BoardAction";

const init = {
  boardList: [],
  totalCount: 0,
  board: {},
};

const updateBoardList = (boardList, board) => {
  let result = [];
  boardList.map((_board) => {
    if (board["seq"] === _board["seq"]) {
      result.push(board);
    } else {
      result.push(_board);
    }
  });
  return result;
};

function parseDate(day) {
  let date = new Date(day);
  return (
    date.getFullYear() +
    "-" +
    plusZeroDate(date.getMonth() + 1) +
    "-" +
    plusZeroDate(date.getDate())
  );
}

function plusZeroDate(day) {
  return day < 10 ? "0" + day : day;
}

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
      board = {
        ...board,
        date : parseDate(board['date'])
      }
      return Object.assign({}, state, {
        totalCount: state["totalCount"] + 1,
        boardList: state["boardList"].concat(board),
      });
    case DELETE_BOARD:
      return Object.assign({}, state, {
        board: {},
        boardList: state["boardList"].filter(
          (_board) => _board["seq"] !== board["seq"]
        ),
        totalCount: state["totalCount"] - 1,
      });
    case UPDATE_BOARD:
      return Object.assign({}, state, {
        board: board,
        boardList: updateBoardList(state["boardList"], board),
      });
    default:
      return state;
  }
}
