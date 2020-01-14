import { onSuccess } from "../Api/AuthApi"
import {getRepos,getFollowers,getFollowing,getStarredRepos, getAllUsers,getUser } from "../Api/Api"
import History from '../History'

export const signIn=(response)=>async dispatch=>{
   
    History.push('/')
    let data=await onSuccess(response)
    dispatch({type:"SIGN_IN",payload:data})
    
}
export const checkedLoggedIn=(data)=>{
    return{
        type:"CHECKED_LOGGED_IN",
        payload:data
    }
}
export const GetAllUsers=()=>async dispatch=>{
        let data=await getAllUsers()
        dispatch({type:"GET_ALL_USERS",payload:data})
}

export const signOut=()=>{
    localStorage.clear()
    return{type:"SIGN_OUT"}
}
export const GetUser=(value)=>async dispatch=>{
    let data=await getUser(value)
    dispatch({type:"GET_USER",payload:data})    
}
export const getReposits =(value)=>async dispatch=>{
    let data=await getRepos(value)
    dispatch({type:"GET_GIT_REPOS",payload:data})
}
export const GetFollowers=value=>async dispatch=>{
    let data= await getFollowers(value)
    dispatch({type:"GET_GIT_FOLLOWERS",payload:data})
}
export const GetFollowing=value=>async dispatch=>{
    let data= await getFollowing(value)
    dispatch({type:"GET_GIT_FOLLOWING",payload:data})
}
export const AddPost=value=>{
    return{
        type:"ADD_POST",
        payload:value
    }
}
export const GetStarredRepos=value=>async dispatch=>{
    let data=await getStarredRepos(value)
    dispatch({type:"GET_GIT_STARRED_REPOS",payload:data})
}