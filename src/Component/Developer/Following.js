import React from 'react'
import {GetFollowing, onSearch} from '../../Action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
class Following extends React.Component{
    componentDidMount(){
        this.props.GetFollowing(this.props.name)
    }
  render(){
      if(!this.props.following)
      return<div>loading</div>
      return<div className='container'>
          <div className="row">
        <div className="col-md-12">
            {this.props.following.map(following=>{
                return<div className="card card-body bg-dark text-white mb-3" style={{marginTop:20}} key={following.user_name}>
                <div className="row">
                  <div className="col-1 col-md-1 ">
                    <img className="rounded-circle" src={following.img} alt="" />
                  </div>
            <Link className='col-6' to={`/search/${following.user_name}`} onClick={()=>{this.props.onSearch(following.user_name)}}>{following.user_name}</Link>
                </div>
                </div>
            })}
            </div>
            </div>
      </div>
  }
}
let mapStateToProps=state=>{
    return {
     following:state.GitUserProfile.following
    }
  }
export default connect(mapStateToProps,{onSearch,GetFollowing})(Following)