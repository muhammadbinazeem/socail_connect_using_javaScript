import React, { Component } from 'react';
import axios from 'axios';

class UserBio extends Component {

    state = {
        firstname: '',
        lastname: '',
        dateofbirth: '',
        userid: ''
    }

    onChangeFirstName = (e) => {
        this.setState({ firstname: e.target.value });
    }

    onChangeLastName  = (e) => {
        this.setState({ lastname: e.target.value });
    }

    onChangeDate = (e) => {
        this.setState({ dateofbirth: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.firstname !== ""  && this.state.lastname !== "" && this.state.dateofbirth !== "") {
            var x = JSON.parse(localStorage.getItem("id"));
            this.state.userid = x;
            axios.post('http://localhost:3000/users/addbio', this.state).then((res) => {
                if (res.data === 'bio added!') {
                    this.props.history.push('/signin');
                } else {
                    this.setState({status : "incorrect password"});        
                }
            }).catch((err) => {
                this.setState({ status: "Failed"})
            });
        }
    }

    content = () => {
            var x = JSON.parse(localStorage.getItem("token"));
              console.log(x);
              if (x !== null) {
                return (
                    <form onSubmit={this.onSubmit}>
                    <div className="container mt-5 mb-5">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="col-md-6">
                                <div className="card px-5 py-5"> 
                                    <span className="circle">
                                        <i className="bi bi-check"></i>
                                    </span>
                                    <h5 className="mt-3">Add Bio</h5> 
                                    <div className="form-input"> 
                                        <i className="bi bi-person"></i> 
                                        <input type="text" className="form-control" placeholder="First Name"
                                            onChange={this.onChangeFirstName} /> 
                                    </div>
                                    <div className="form-input"> 
                                        <i className="bi bi-person"></i>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                            onChange={this.onChangeLastName} />
                                    </div>
                                    <div className="form-input"> 
                                        <i className="bi bi-calendar"></i> 
                                        <input type="date" className="form-control" placeholder="Date of Birth"
                                            onChange={this.onChangeDate} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4 signup">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
 
export default UserBio;