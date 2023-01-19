import React from 'react'


export default function Newsitems (props) {

    let {title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <>
      <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read more</a>
        </div>
        <div className="card-footer">
          <small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small>
        </div>
          <span style={{left: '80%'}} className="position-absolute top-0 translate-middle badge rounded-pill  text-bg-danger">
            {source}
          </span>
      </div>
      </>
    )
  
}

