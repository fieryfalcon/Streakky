import React from 'react';
function Landing() {
    console.log('Landing')
    const user = JSON.parse(sessionStorage.getItem('user')).displayName;
    return (
        <div>
            <h1>{user}</h1>
        </div>
    );
}
export default Landing;