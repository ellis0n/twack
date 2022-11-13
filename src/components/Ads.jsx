import React from 'react'

const Ads = ({id, url, title, alt, src, price, desc, index, length}) => {
    // const [hidden, setHidden] = useState(false)


  return (
        <div  className="ad" key={id} >
            {/* <div style={{display: index === 0 ? 'block' : 'none' }}> */}
            <a href={url}>
                <h1>{title}</h1>
            </a>
            <div className="img-wrapper">
                <img alt={alt} src={src}></img>
            </div>
            <h2>${price}</h2>
            <p>{desc}</p>
            </div>
        // </div>
    )}

export default Ads