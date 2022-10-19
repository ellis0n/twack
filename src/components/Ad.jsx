import React from 'react'
import { useState, useEffect } from 'react';

const Ad = () => {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);
      
        useEffect(() => {
          fetch("http://localhost:3500/ads")
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);
                setItems(result);
              },
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )
        }, [])
      
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return ( 
            <div> 
              {items.map(item => (
                <div className='ad'>
                    <a href={item.url}></a><h1>{item.title}</h1>
                    <img alt="" src={item.img}></img>
                    <h2>${item.price}</h2>
                </div>
              ))}
            </div>
          );
        }
      };
export default Ad