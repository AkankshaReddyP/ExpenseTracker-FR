export const useGetUserInfo=()=>{
    const{profilePhoto,name,userID,isAuth}=JSON.parse(localStorage.getItem("auth"));

    return {name,profilePhoto,userID,isAuth};
}