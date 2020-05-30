export const SHOW_CONFIRM = "SHOW_CONFIRM";

export const showConfirmHandle = (confirm) => {
    return {
        type : SHOW_CONFIRM,
        confirm : confirm
    }
}