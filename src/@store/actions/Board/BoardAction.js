export const READ_BOARD_LIST = "READ_BOARD_LIST";
export const READ_BOARD = "READ_BOARD";
export const INSERT_BOARD = "INSERT_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";

export const readBoardList = (boardList, totalCount) => {
  return {
    type: READ_BOARD_LIST,
    boardList: boardList,
    totalCount: totalCount,
  };
};

export const readBoard = (board) => {
  return {
    type: READ_BOARD,
    board: board,
  };
};

export const insertBoard = (board) => {
  return {
    type: INSERT_BOARD,
    board: board,
  };
};

export const deleteBoard = (board) => {
  return {
    type : DELETE_BOARD,
    board : board
  }
}

export const updateBoard = (board) => {
  return {
    type : UPDATE_BOARD,
    board :board
  }
}
