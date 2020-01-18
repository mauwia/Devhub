let api='http://localhost:8000'//http://localhost:8000/user/mauwia
let header={
        'Content-Type': 'application/json'  
}
export const getUser=async (value)=>{
    try{
    let result=await fetch(`${api}/user/${value}`,{method:'GET',header})
    let data=await result.json();
    return data
    }
    catch(err){console.log(err)}
}
export const updateUser=async (value,userId)=>{
    try{
        // const body=JSON.stringify(value)
        // console.log(body)
        let result=await fetch(`${api}/user/${userId}`,{method:'PATCH',headers:header,body:JSON.stringify(value)})
        let data=await result.json();
        return data
    }
    catch (err){console.log(err)}
}
export const getAllUsers=async()=>{
    try{
        let result=await fetch(`${api}/user`,{method:'GET',header})
        let data=await result.json();
        return data
        }
        catch(err){console.log(err)}
}
export const getRepo=async (name,repo)=>{
    try{
        let result=await fetch(`${api}/user/${name}/repos/${repo}`,{method:'GET',header})
        let data=await result.json()
        console.log(data)
        return data
    }
    catch(err){console.log(err)}
}
export const getRepos=async (value)=>{
    try{
    let result=await fetch(`${api}/user/${value}/repos`,{method:'GET',header})
    let data=await result.json();
    return data
    }
    catch(err){console.log(err)}
}
export const getFollowers=async (value)=>{
    try{
    let result=await fetch(`${api}/user/${value}/followers`,{method:'GET',header})
    let data=await result.json();
    return data
    }
    catch(err){console.log(err)}
}
export const getFollowing=async (value)=>{
    try{
    let result=await fetch(`${api}/user/${value}/following`,{method:'GET',header})
    let data=await result.json();
    return data
    }
    catch(err){console.log(err)}
}
export const getStarredRepos=async (value)=>{
    try{
    let result=await fetch(`${api}/user/${value}/starred_repos`,{method:'GET',header})
    let data=await result.json();
    return data
    }
    catch(err){console.log(err)}
}
export const getPosts=async ()=>{
    try{
    let result=await fetch(`${api}/posts`,{method:'GET',header})
    let data=await result.json();

    return data
    }
    catch(err){console.log(err)}
}
export const addPost=async (post)=>{
    try{
        console.log(post)
        let result=await fetch(`${api}/posts/add`,{method:"POST",header,body:post})
        let data=await result.json()
        return data
    }
    catch(err){console.log(err)}
}
export const getPost=async (postId)=>{
    try{
    let result=await fetch(`${api}/posts/${postId}`,{method:'GET',header})
    let data=await result.json();

    return data
    }
    catch(err){console.log(err)}
}
export const addComment=async (postId,comment)=>{
    try{

        let result=await fetch(`${api}/posts/${postId}/comment`,{method:"PUT",header,body:comment})
        let data=await result.json()
        console.log(data)
    }
    catch(err){console.log(err)}
}