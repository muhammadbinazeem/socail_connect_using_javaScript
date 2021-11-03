import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import "../styles/style.css";
import ErrorBlock from './../common/errorblock';

class LogIn extends Component {

    state = {
        email: undefined,
        password: undefined,
        status: undefined,
    }

    onChangeEmail = (e) => {
        const email = e.target.value;
        this.setState({ email: email });
    }

    onChangePassword = (e) => {
        const password = e.target.value;
        this.setState({ password: password });
    }

    onSubmit = (e) => {
        const { email, password } = this.state;

        e.preventDefault();
        if ((password !== "" && password !== undefined) && (email !== "" && email !== undefined)) {
            const user = {
                email: email,
                password: password
            };
        
            axios.post('http://localhost:3000/users/signin', user).then((res) => {
                if (res.data !== 'not-authenticated') {
                    //console.log(res.data)
                    //console.log(JSON.stringify(res.data));
                    localStorage.setItem('token', JSON.stringify(res.data));
                    this.props.history.push('/home');
                } else {
                    this.setState({status : "Invalid Credentails"});        
                }
            }).catch((err) => {
                this.setState({ status: "Sign In Failed"})
            });
        } else {
            this.setState({status: "fill all fields"});
        }
    }

    handleLogin = async (googleData) => {
        const body = JSON.stringify({
        token: googleData.tokenId,
        });
        const headers = {
        "Content-Type": "application/json",
        "x-auth-token": "",
        };
        await axios
        .post("http://localhost:3000/google/login", body, {
            headers: headers,
        })
        .then((res) => {
            if (res.data !== 'signUp first') {
                localStorage.setItem("token", JSON.stringify(res.data));
                this.props.history.push('/home');
            } else {
                this.setState({status: "Sign Up First"});
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

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
                                <h5 className="mt-3">social media network <br/> users from around the globe</h5>
                                <ErrorBlock status={this.state.status}/>  
                                <div className="form-input"> 
                                    <i className="bi bi-envelope"></i> 
                                    <input type="text" className="form-control" placeholder="Email address"
                                        onChange={this.onChangeEmail}/> 
                                </div>
                                <div className="form-input"> 
                                    <i className="bi bi-file-lock2"></i> 
                                    <input type="password" className="form-control" placeholder="password"
                                        onChange={this.onChangePassword}/>
                                </div>
                                <button className="btn btn-primary mt-4 signup">Sign In</button>
                                <div className="text-center mt-3"> 
                                    <Link to="/resetpassword" className="text-decoration-none">&nbsp;&nbsp;
                                        <span>Forget Password</span>
                                    </Link> 
                                </div>
                                <div className="text-center mt-3"> 
                                    <span>Or continue Google</span>
                                </div>
                                <div className="d-flex justify-content-center mt-4">
                                    <GoogleLogin
                                    clientId={process.env.REACT_APP_CLIENT_ID}
                                    buttonText="Continue with Google"
                                    onSuccess={this.handleLogin}
                                    onFailure={this.handleLogin}
                                    cookiePolicy={"single_host_origin"}
                                    /> 
                                </div>
                                <div className="text-center mt-4"> 
                                    <span>Does not have an account?</span> 
                                    <Link to="/signup" className="text-decoration-none">&nbsp;&nbsp;SignUp</Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
 
export default LogIn;