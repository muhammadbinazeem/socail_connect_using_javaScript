import React, { Component } from 'react';
import axios from 'axios';
import Post from './post';
import NavBar from './navbar';
import CreatePost from './createpost';

class Home extends Component {

    componentDidMount() {
        /*axios.get('http://localhost:3000/users/', {
            headers: {
              'x-auth-token': JSON.parse(localStorage.getItem("token"))
            }
          });
          */
    }

    content = () => {
      var x = JSON.parse(localStorage.getItem("token"));
        console.log(x);
        if (x !== null) {
          return (
            <div>
              <NavBar/>
              <div className='row'>
                <div className='col-md-8'>
                  <CreatePost/>
                  <br/>
                  <Post/>
                </div>
              </div>
            </div>
          );
        } else {
          this.props.history.push('/signin');
        }
    }

    render() { 
      return (
        <div>
          {
            this.content()
          }
        </div>
      );
    }
}
 
export default Home;