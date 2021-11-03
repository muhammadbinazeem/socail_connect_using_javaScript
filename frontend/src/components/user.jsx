import React, { useState } from 'react';
import axios from 'axios';

const User = () => {
    const [newUser, setNewAuthor] = useState(
        {
            name: '',
            photo: undefined,
            desc: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newUser);
        const formData = new FormData();
        formData.append('file', newUser.photo);
        formData.append('desc', newUser.desc);
        formData.append('name', newUser.name);

        axios.post('http://localhost:3000/post/', formData)
            .then(res => {
            console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
    }

    const handleChange = (e) => {
        setNewAuthor({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewAuthor({...newUser, photo: e.target.files[0]});
    }

    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
            />

            <input 
                type="text"
                placeholder="name"
                name="name"
                onChange={handleChange}
            />

            <input 
                type="date"
                name="desc"
                onChange={handleChange}
            />

            <input 
                type="submit"
            />
        </form>
    );
}

export default User;