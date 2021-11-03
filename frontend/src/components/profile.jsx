import React from 'react';
import logo from './download.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
    

const Profile = ({match, history}) => {
    
    
    const id = match.params.id;

    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            await axios.get('http://localhost:3000/users/'+id).then(res => {
                setData(res.data);
            });
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    const content = () => {
        var x = JSON.parse(localStorage.getItem("token"));
        if (x !== null) {
            return (
                <div>
                <div>
                    <button className='btn btn-warning ms-3 mt-5' onClick={() => history.push('/home')}><i class="bi bi-box-arrow-left"></i></button>
                </div>
                <div className='row d-flex align-items-center justify-content-center mt-5' >
                    <div className="card" style={{'width': '50%'}}>
                        <img className="card-img-top" src={logo} style={{'height': '200px'}} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">First Name: {data.firstname}</h5>
                            <h5 className="card-title">Last Name: {data.lastname}</h5>
                            <h5 className="card-text">Date of Birth: {data.dateofbirth}</h5>
    
                            <button className='btn btn-primary' onClick={ () => {
                                axios.post('http://localhost:3000/users/sendrequest', { userid: data.userid, name: data.firstname },{
                                    headers: {
                                      'x-auth-token': JSON.parse(localStorage.getItem("token"))
                                    }
                                }).then((res) => {
                                    console.log(res.data);
                                })}
                            }>Send Request</button>
                        </div>
                    </div>
                </div>
                </div>
            );
          } else {
            window.location = '/signin';
          }
    }

    return ( 
        <div>
          {
            content()
          }
        </div>    
    );
}
 
export default Profile;