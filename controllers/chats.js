const mongoose = require('mongoose')
const Chats=require('../models/chatRoom')

module.exports={
    getAllChats:async(req,res,next)=>{
        // Fetch all the chats of user using user.id
        const user_id=req.user._id
        try {
            const userRooms=await Chats.find({"chat_users.user": user_id})
                            .select('roomId chat_users lastUpdated')
            res.status(200).json({
                total_rooms:userRooms.length,
                rooms:userRooms
            })
        } catch (error) {
            res.status(404).json({
                error:error
            })
        }
    },
    getChat:async(req,res,next)=>{
    // Fetch a specific chat of user using user.id
    const roomId=req.params.roomId
    try {
        const chat=await Chats.findOne({"roomId": roomId})
        // Sending A Requested Chat Room to client
        res.status(200).json({
            chat:chat
        })
    } catch (error) {
        res.status(404).json({
            error:error
        })
    }
    }
}