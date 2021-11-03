import React from 'react';
import Search from './../common/search';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect} from 'react';
import axios from 'axios';

const NavBar = () => {

    const [options, setOptions] = useState([]);

    const defaultOption = "Friend Requests";


    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            await axios.get('http://localhost:3000/post/requestt', {
                headers: {
                  'x-auth-token': JSON.parse(localStorage.getItem("token"))
                }
              }).then(res => {
                setData(res.data);
                let arr = new Array();
                console.log(res.data.length);
                for (var i = 0; i < res.data.length; i++) {
                    console.log("arr", res.data[i].name);
                    arr.push(res.data[i].name);
                }
                setOptions(arr);
            });
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);

    return ( 
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: "#1c1e21"}}>
            <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Social Media</a>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                </ul>

                <Dropdown options={options}  value={defaultOption} placeholder="Friend Requests"
                    style={{ 'height': '40px' }}/>;
                <button className='btn btn-primary' onClick={() => window.location = '/updatepassword'}>Update password</button>
                <Search className="mr-auto"/>
                <button className="btn btn-outline-warning ms-2" type="submit"
                    onClick={() => {
                        localStorage.clear();
                        window.location = '/';
                    }}>LogOut</button>
            </div>
            </div>
        </nav>
    );
}

export default NavBar;