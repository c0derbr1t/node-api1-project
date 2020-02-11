import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const UserCard = props => {
    const { id } = useParams();

    const [user, setUser] = useState('');

    useEffect(() => {
        axios(`http://localhost:5000/api/users/${id}`)
            .then(res => {
                setUser(res.data);
            }).catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>{user.name}</h2>
            <h4>{user.bio}</h4>
        </div>
    )
}

export default UserCard;