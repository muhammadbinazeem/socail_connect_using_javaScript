import React, { Component } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import useForceUpdate from 'use-force-update';

class Post extends Component {

    state = {
        data: [],
        name: "btn btn-primary",
        userid: undefined,
        disable: false,
    }

    componentDidMount() {
        axios.get('http://localhost:3000/post/',  {
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem("token"))
        }})
        .then(res => {
            this.setState({ data: res.data });
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('http://localhost:3000/users/',  {
        headers: {
            'x-auth-token': JSON.parse(localStorage.getItem("token"))
        }})
        .then(res => {
            this.setState({userid: res.data});
        })
        .catch(err => {
            console.log(err);
        });
    }

    onClick = (post) => {
        axios.post('http://localhost:3000/post/like', { postid: post._id }, {
            headers: {
              'x-auth-token': JSON.parse(localStorage.getItem("token"))
            }})
        .then(res => {
            console.log(res.data);
            axios.get('http://localhost:3000/post/',  {
                headers: {
                  'x-auth-token': JSON.parse(localStorage.getItem("token"))
                }})
                .then(res => {
                    this.setState({ data: res.data });
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
    }

    className = (post) => {
        if (post) {
            if (post.userid !== this.state.userid) {
                const found = post.likes.find((temp) => temp.userid === this.state.userid);
                if (found) {
                    return true;
                } else  {
                    return false;
                }
            } else {
                const found = post.likes.find((temp) => temp.userid === this.state.userid);
                if (found) {
                    return true;
                } else  {
                    return false;
                }
            }
        }
    }
    
    render() {
        const { data, name } = this.state;

        return ( 
            data.map((post) => {
                return (
                    <div className='row d-flex align-items-center justify-content-center mt-3' key={post._id}>
                        <div className="card" style={{'width': '70%'}}>
                            <img className="card-img-top" src={`http://127.0.0.1:8000/${post.photo}`} style={{'height': '200px'}} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">{post.name}</h5>
                                <p className="card-text">{post.caption}</p>
                                <button className="btn btn-primary" onClick={() => this.onClick(post)}
                                    disabled={this.className(post)}>
                                    <i className="bi bi-hand-thumbs-up"></i> | &nbsp;
                                    <span>{post.likes.length}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }
}
 
export default Post;
/*
const Post = () => {

    const forceUpdate = useForceUpdate();

    const [data, setData] = useState([]);

    const [name, setname] = useState("btn btn-primary");

    const [userid, setid] = useState("");

    useEffect(() => {
    
        const fetchData = async () => {
          try {
            await axios.get('http://localhost:3000/post/',  {
                headers: {
                  'x-auth-token': JSON.parse(localStorage.getItem("token"))
                }})
                .then(res => {
                    setData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

                await axios.get('http://localhost:3000/users/',  {
                    headers: {
                      'x-auth-token': JSON.parse(localStorage.getItem("token"))
                    }})
                    .then(res => {
                        setid(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    const onClickButton = (postid) => {
        
    } 

    const renderButton = (likes) => {
        if (likes) {
            console.log(likes);
        }
    }

    console.log(data);
    return ( 
        data.map((post) => {
            return (
                <div className='row d-flex align-items-center justify-content-center mt-3' key={post._id}>
                    <div className="card" style={{'width': '70%'}}>
                        <img className="card-img-top" src={`http://127.0.0.1:8000/${post.photo}`} style={{'height': '200px'}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{post.name}</h5>
                            <p className="card-text">{post.caption}</p>
                            <button className={name} onClick={() => {
                                axios.post('http://localhost:3000/post/like', { postid: post._id }, {
                                    headers: {
                                      'x-auth-token': JSON.parse(localStorage.getItem("token"))
                                    }})
                                .then(res => {
                                    console.log(res.data);
                                    forceUpdate();
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                            }}>
                                <i className="bi bi-hand-thumbs-up"></i> | &nbsp;
                                <span>{post.likes.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    );
}
 
export default Post;*/