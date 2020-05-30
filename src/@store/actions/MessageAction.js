export const SHOW_MESSAGE = "SHOW_MESSAGE";

export const showMessageHandle = (messageState) => {
    return {
        type : SHOW_MESSAGE,
        messageBox : messageState
    }
}