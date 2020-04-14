import React from 'react'
import ChatList from './ChatList'
import ChatRoom from './ChatRoom'
import {GetChats,GetChat} from '../../Action'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Chat extends React.Component{
    componentDidMount(){
        this.props.GetChats()
      }
    render()
    {
      if(!this.props.chats){
        return <div>Shut the fuckup</div>
      }
        return<div>
            <div className='messaging chat'>
            <div className='inbox_msg'>
                <ChatList/>
                <Route path={`/chat`} exact render={()=>{return <div>chat home</div>}}/>
                <Route path='/chat/:id' exact component={ChatRoom}/>
            </div>
            </div>
        </div>
    }
}
let mapStateToProps=state=>{
    return{
      chats:state.Chats.rooms
    }
  }
export default connect(mapStateToProps,{GetChats,GetChat})(Chat)