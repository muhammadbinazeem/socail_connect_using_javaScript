import React, { Component } from 'react';
import axios from 'axios';

class UpdatePassword extends Component {

    state = {
        password: '',
        confirmpassword: '',
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeConPassword = (e) => {
        this.setState({ confirmpassword: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== '' && this.state.confirmpassword) {
            if (this.state.password === this.state.confirmpassword) {
                axios.patch('http://localhost:3000/users/updatepassword', {password: this.state.password}, {
                    headers: {
                        'x-auth-token': JSON.parse(localStorage.getItem("token"))
                    }
                    }).then((res) => {
                    if (res.data === 'updated') {
                        this.props.history.push('/home');
                    } else {
                        this.setState({status : "Failed"});        
                    }
                }).catch((err) => {
                    this.setState({ status: "Failed"})
                });
            }
        }
    }

    render() { 
        return (
            <form onSubmit={this.onSubmit}>
                <div className="container mt-5 mb-5">
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6">
                            <div className="card px-5 py-5"> 
                                <span className="circle">
                                    <i className="bi bi-check"></i>
                                </span>
                                <h5 className="mt-3">Update Password</h5>
                                <div className="form-input"> 
                                    <i className="bi bi-envelope"></i> 
                                    <input type="password" className="form-control" placeholder="Confirm Password"
                                        onChange={this.onChangePassword}/> 
                                </div>
                                <div className="form-input"> 
                                    <i className="bi bi-file-lock2"></i> 
                                    <input type="password" className="form-control" placeholder="confirm password"
                                        onChange={this.onChangeConPassword}/>
                                </div>
                                <button className="btn btn-primary mt-4 signup">Update Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default UpdatePassword;