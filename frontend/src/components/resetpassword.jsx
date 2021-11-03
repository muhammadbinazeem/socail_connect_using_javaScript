import React, { Component } from 'react';
import axios from 'axios';

class ResetPassword extends Component {

    state = {
        email: undefined,
        code: undefined,
        password: undefined,
        count: 0,
    }

    onChangeEmail = (e) => {
        e.preventDefault();
        const email = e.target.value;
        this.setState({ email: email });
    }

    onChangeCode = (e) => {
        e.preventDefault();
        const code = e.target.value
        this.setState({ code: code })
    }

    onChangePassword = (e) => {
        e.preventDefault();
        const password = e.target.value
        this.setState({ password: password })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { count } = this.state;
        if (count === 0) {
            axios.post("http://localhost:3000/mail/send", { email: this.state.email}).then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
            this.setState({ count: 1 })
        }
        if (count === 1) {
            if (this.state.code === "123456") {
                this.setState({ count: 2}); 
            }
        }
        if (count === 2) {
            console.log(this.state.password);
            if (this.state.password !== "" && this.state.password !== undefined) {
                const body = { 
                    email: this.state.email,
                    code: this.state.code,
                    password: this.state.password
                }
                axios.patch("http://localhost:3000/users/forgetpassword", body).then((res) => {
                    console.log(res.data);
                    if (res.data === "updated") {
                        this.props.history.push("/signin");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    renderVerificationCode = () => {
        if (this.state.count === 1) {
            return (
                <div className="form-input"> 
                    <i className="bi bi-code"></i> 
                    <input type="text" className="form-control" placeholder="Code"
                        onChange={this.onChangeCode}/>
                </div>
            );
        }
    }

    renderPassword = () => {
        if (this.state.count === 2) {
            return (
                <div>
                    <div className="form-input"> 
                        <i className="bi bi-code"></i> 
                        <input type="text" className="form-control" placeholder="Code" value={this.state.code}
                        onChange={this.onChangeCode}/>
                    </div>
                    <div className="form-input"> 
                        <i className="bi bi-file-lock2"></i> 
                        <input type="password" className="form-control" placeholder="password" 
                            onChange={this.onChangePassword}/>
                    </div>
                </div>
            );
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
                            <h5 className="mt-3">social media network <br/> users from around the globe</h5> 
                            <div className="form-input"> 
                                <i className="bi bi-envelope"></i> 
                                <input type="text" className="form-control" placeholder="Email address"
                                onChange={this.onChangeEmail}/> 
                            </div>
                            <div>
                                {
                                    this.renderVerificationCode()
                                }
                            </div>
                            <div>
                                {
                                    this.renderPassword()
                                }
                            </div>
                            <button className="btn btn-primary mt-4 signup">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        );
    }
}
 
export default ResetPassword;