import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    const{title,description,imageurl,newsurl}=this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
  <img src={!imageurl?"https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM=":imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}....</h5>
    <p className="card-text">{description}.....</p>
    <a href={newsurl} className="btn btn-sn btn-primary">Read More</a>
  </div>
</div>
      </div>
    )
  }
}
export default NewsItem;