import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import User from './User';


const Users = () => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        axios('http://localhost:5000/api/users')
        .then(res => {
            setUsers(res.data);
        }).catch(err => console.log(err))
    }, []);

    return (
        <div className='users-div'>
            <h3>Users:</h3>
            {users && users.map(user => (
                <div>
                    <Link to={ `/users/${user.id}` }>
                        <User key={user.id} user={user} />
                    </Link>
                    
                </div>
            ))}
            
        </div>
    )

}

export default Users;