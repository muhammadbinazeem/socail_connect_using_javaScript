import React, { Component } from 'react';
import axios from 'axios';
import { Link }  from "react-router-dom";

class Search extends Component {

    state = {
        users: undefined,
        temp: '',
        filteredusers: undefined,
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/total',  {
            headers: {
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            }})
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    
    }

    onChangeInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const filteredusers = this.state.users.filter((user) => {
            if (user.firstname.includes(value)) {
                return user;
            }
        });
        this.setState({filteredusers: filteredusers});
    }

    renderlist = () => {
        console.log(this.state.filteredusers);
        if (this.state.filteredusers !== undefined || this.state.filteredusers === '') {
            return (this.state.filteredusers.map((user) => {
                 return (<li  key={user._id} className="list-group-item"><Link to={`/profile/${user.userid}`} className='text-decoration-none'>
                            {user.firstname + " " + user.lastname}
                        </Link>
                     </li>)
            }))
        }
    }

    render() { 
        return <div className='ms-auto'>
            <form className="form-inline my-lg-0" style={{ 'height': '40px' }}>
                <input className="form-control mr-sm-2" type="search" style={{ 'height': '40px' }}
                    placeholder="Search" aria-label="Search"
                    onChange={this.onChangeInput}/>
                    <ul className="list-group">
                        {
                            this.renderlist()
                        }
                    </ul>
            </form>
        </div>;
    }
}
 
export default Search;