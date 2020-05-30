export const SHOW_FORM = "SHOW_FORM";

export const showForm = (form) =>{
    return {
        type : SHOW_FORM,
        form : form
    }
}