export const showMessage = "SHOW_MESSAGE";

export const showMessageHandle = (messageState) => {
    return {
        type : showMessage,
        messageBox : messageState
    }
}