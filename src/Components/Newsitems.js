import React, { Component } from 'react'

export class Newsitems extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card m-4">
                <span className="position-absolute translate-middle badge rounded-pill bg-primary" style={{left: '90%', zIndex: "1" ,top: "-1%"}}>{source}</span>
                    <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-86937617,width-1070,height-580,imgsize-225826,overlay-ettech/photo.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unkown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
