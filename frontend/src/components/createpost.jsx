import React from 'react';
import axios from 'axios';
import { useState } from "react";

const CreatePost = () => {

    const [newUser, setAttributes] = useState({
        photo: undefined,
        desc: '',
    });

    const handlePhoto = (e) => {
        setAttributes({...newUser, photo: e.target.files[0]});
    }

    const handleTextChange = (e) => {
        setAttributes({...newUser, desc: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', newUser.photo);
        formData.append('desc', newUser.desc);

        axios.post('http://localhost:3000/post/', formData, {
            headers: {
              'x-auth-token': JSON.parse(localStorage.getItem("token"))
            }})
            .then(res => {
                if (res.data === "Post Added") {
                    setAttributes({ name: "" });
                    setAttributes({ photo: null });
                    window.location = "/home";
                }
            })
            .catch(err => {
            console.log(err);
            });
    }

    return ( 
        <div className='row d-flex align-items-center justify-content-center mt-3'>
            <div className="card" style={{'width': '70%'}}>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input className="form-control form-control-lg" type="file" 
                            accept=".png, .jpg, .jpeg" name="photo" key={newUser.photo || null }
                                onChange={handlePhoto}/>
                        <br/>
                        <textarea className="form-control"  rows="3" 
                            onChange={handleTextChange} value={newUser.name}></textarea>
                        <br/>
                        <button className="btn btn-primary text-center">Post</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default CreatePost;