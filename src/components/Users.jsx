import React, {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import useRefreshToken from '../hooks/useRefreshToken';

const Users = () => {
    const [users, setUsers] = useState();
    const refresh = useRefreshToken

    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            let isMounted = true;
            const controller = new AbortController();
            try{
                await fetch('http://localhost:3500/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                }})
                    .then((response) => response.json())
                    .then((response) =>
                        {isMounted && setUsers(response)})
                }
                catch(err){
                console.log(err)
            }}
        
        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
        

    },[])

  return (
    <div>
        <h1>Users List:</h1>
    {users?.length
        ? (
            <ul>{users.map((user, i)=><li key={i}>{user?.username}</li>)}</ul>
        ) : (
            <p>No users found</p>
        )}
        <button onClick={()=>refresh}>Refresh</button>
            
            </div>
  )
}

export default Users