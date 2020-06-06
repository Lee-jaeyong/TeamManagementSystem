export const READ_USER = "READ_USER";

export const readUserOne = (user)=>{
    return{
        type:READ_USER,
        user : user
    }
}