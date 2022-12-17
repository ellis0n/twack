import useAuth from './useAuth';
import axios from '../api/axios';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        console.log(response)
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
}
        // const response = await fetch('http://localhost:3500/refresh', {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //     },
        //     credentials: 'include'
            
        //     })
//             const data = await response.json()
//             setAuth(prev => {
//                 console.log(JSON.stringify(prev));
//                 console.log(data.accessToken);
//                 return { ...prev, accessToken: data.accessToken }
//             });
            
//     }
//     return refresh;
// };




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