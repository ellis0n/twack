import React from 'react';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();


    // This function sends a get request to the server to refresh the token and then updates the auth context with the new token  and logs the new token to the console.

    const refresh = async () => {
        await fetch('http://localhost:3500/refresh', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        }})
            .then((response) => response.json())
            .then((response) =>
                {console.log(response)})
    }
    return refresh;
};




//     const refresh = async () => {
//         await fetch('/refresh', {
//             method: 'GET',
//             credentials: 'include',
//         }).then(res => res.json())
//         setAuth(prev => {
//             console.log(JSON.stringify(prev));
//             console.log(data.accessToken);
//             return { ...prev, accessToken: data.accessToken }
//         });
//         return data.accessToken;
//     }
//     return refresh;
// };

export default useRefreshToken;