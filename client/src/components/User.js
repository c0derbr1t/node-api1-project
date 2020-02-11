import React from 'react';

const User = props => {

    return (
        <>
            <h3>{props.user.name}</h3>
            <p>{props.user.bio}</p>
        </>
    )
}

export default User;