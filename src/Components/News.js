import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinnner from './Spinnner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: ''
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(){
        super();
        this.state =    {
            articles: [],
            loading: false,
            page: 1,
            next: false
        }
    }

   async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f01f3b507957430d8dd876ec5f53c44f&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, 
                totalResults: parsedData.totalResults,
                loading: false})
    }

    prev = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f01f3b507957430d8dd876ec5f53c44f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    nxt = async() =>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&$category=${this.props.category}&apiKey=f01f3b507957430d8dd876ec5f53c44f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }
}
    
    render() {
        return (
            <div className='container my-3'>
               {!this.state.loading && <h1 className='text-center m-3'>Top Headlines</h1>}
                {this.state.loading && <Spinnner/>}
                <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div className="col-md-4" key = {element.url}>
                        <Newsitems title = {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
                        </div>
                })}                  
                </div>
                {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick={this.prev}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nxt}>Next &rarr;</button>
                </div>}
            </div>
        )
    }
}

export default News
