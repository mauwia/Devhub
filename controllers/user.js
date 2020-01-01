const fetch=require('node-fetch')

const github_api='https://api.github.com'


const listUsers=(data,hostURL)=>{
    return data.map(user=>(
        {user_name:user.login,img:user.avatar_url,
        github_url:user.html_url,user_url:`${hostURL}/user/${user.login}`}
        )
    )
}

module.exports={
    fetchUser:async(req,res,next)=>{
        const username=req.params.username
        try {
            
            const result=await fetch(`${github_api}/users/${username}`)
            const data=await result.json()
          
          const {id,login,avatar_url,html_url,followers,
            following,starred_url,name,repos_url,email,public_repos,location}=data
            const user={id,login,avatar_url,html_url,followers,
                following,starred_url,name,repos_url,email,public_repos,location}
          res.status(200).json({user:user})
        } 
        catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchRepos:async(req,res,next)=>{
        const username=req.params.username
        
        try {
            const result=await fetch(`${github_api}/users/${username}/repos?per_page=1000`)
            const data=await result.json()
          const repos=data.filter(repo=>repo.owner.login === username).map(repo=>{
            const repoName=repo.full_name
            const index=repoName.indexOf('/')+1
          return repoName.slice(index)
          })
          res.status(200).json({
              total:repos.length,
              repos:repos.sort()
            })
        } 
        catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchFollowers:async(req,res,next)=>{
        const username=req.params.username
        const hostURL=`${req.protocol}://${req.get('host')}`
        try {
            const result=await fetch(`${github_api}/users/${username}/followers?per_page=100`)
            const data=await result.json()
            const followers=listUsers(data,hostURL)
          res.status(200).json({
              total:followers.length,
              followers:followers
            })
        } 
        catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchFollowing:async(req,res,next)=>{
        const username=req.params.username
        const hostURL=`${req.protocol}://${req.get('host')}`
        
        try {
            const result=await fetch(`${github_api}/users/${username}/following?per_page=100`)
            const data=await result.json()
            const following=listUsers(data,hostURL)
          res.status(200).json({
              total:following.length,
              following:following
            })
        } 
        catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchStarredRepos:async(req,res,next)=>{
        const username=req.params.username
        const hostURL=`${req.protocol}://${req.get('host')}`
        try {
            const result=await fetch(`${github_api}/users/${username}/starred?per_page=1000`)
            const data=await result.json()
            
            const repos=data.map(repo=>(
                {repo_name:repo.name,
                repo_owner:{
                  user_name:repo.owner.login,
                  url: `${hostURL}/user/${repo.owner.login}`  
                },
                github_url:repo.html_url,
                stars:repo.stargazers_count
            }
            ))

          res.status(200).json({
              total:repos.length,
              starred_repos:repos
            })
        } 
        catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchARepo:async(req,res,next)=>{
        const username=req.params.username
        const reponame=req.params.reponame
        const hostURL=`${req.protocol}://${req.get('host')}`
        try {
            const result=await fetch(`${github_api}/repos/${username}/${reponame}`)
            const data=await result.json()
            const languages_res=await fetch(data.languages_url)
            const languages=await languages_res.json()
            
            const repoBody={
                id:data.id,
                name:data.name,
                owner:{
                    username:username,
                    profile_url:`${hostURL}/user/${username}`
                },
                github_url:data.html_url,
                description:data.description,
                languages:languages,
                forks: data.forks_count,
                forks_url:`${hostURL}/${username}/repos/${reponame}/forks`,
                stars:data.stargazers_count,
                stargazers_url:`${hostURL}/${username}/repos/${reponame}/stargazers`,
            }
            console.log(data.fork)
            if(data.fork === true){
                repoBody.fork=data.fork
                repoBody.parent_repo={
                    repo_name:data.parent.name,
                    owner:data.parent.owner.login,
                    github_url:data.parent.html_url,
                    repo_url:`${hostURL}/user/${data.parent.owner.login}/repos/${data.parent.name}`
                }
            }
            res.status(200).json({repo:repoBody})

            // res.status(200).json({repo:data})

        } catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    },
    fetchStarGazers:async(req,res,next)=>{
        const username=req.params.username
        const reponame=req.params.reponame
        const hostURL=`${req.protocol}://${req.get('host')}`
        try {
            const result=await fetch(`${github_api}/repos/${username}/${reponame}/stargazers`)
            const data=await result.json()
            const stargazers=listUsers(data,hostURL)
            res.status(200).json({stargazers:stargazers})
        } catch (error) {
            res.status(404).json({
                error:error.message
            })
        }
    }
}