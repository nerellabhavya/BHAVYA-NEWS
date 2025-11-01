import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  articles = [];

  constructor() {
    super();
    console.log("Hello, I am constructor");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  // ✅ Helper to simulate at least 2 seconds of loading
  sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // ✅ Fetches news and ensures spinner shows for minimum 2 seconds
  async updateNews(pageNumber = this.state.page) {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e4dac39d3cf2424b8c7c6bc553e27e30&page=${pageNumber}&pageSize=${this.props.pageSize}`;
    
    this.setState({ loading: true });
    const startTime = Date.now();

    let data = await fetch(url);
    let parsedData = await data.json();

    // Calculate how long the API took
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(2000 - elapsed, 0); // 2000ms = 2s minimum wait

    // Wait remaining time (if API was too fast)
    await this.sleep(remaining);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 }, () => {
      this.updateNews(this.state.page);
    });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1 }, () => {
        this.updateNews(this.state.page);
      });
    }
  };

  render() {
    const loadbag="https://wallpapers.com/images/hd/news-background-j6i0ebgqnb7bnmuj.jpg";
    const newsbag="https://wallpapers.com/images/hd/news-pictures-3840-x-2160-acux49abefxdu7qs.jpg";
    const containerStyle={
      
      backgroundImage:`url(${this.state.loading?loadbag:newsbag})`,
      backgroundSize:'cover',
      backgroundPosition:'center',
      minHeight:'100vh',
      transition:'background 0.5s ease-in-out',
      color:this.state.loading?'white':'black'
    };
    return (
      <>
      <div style={containerStyle}>
        <div className="container my-4">
          <div className="text-center mb-4">
            <h1 style={{color:'white'}}>BhavyaNews - Top Headlines</h1>
            {this.state.loading &&(
            <>
            <Spinner />
            <h3 style={{marginTop:'10px',fontWeight:'bold'}}>Loading...</h3>
            </>
            )}
            </div>
          </div>

          <div className="row justify-content-center text-center">
            {!this.state.loading && this.state.articles.map((element, index) => (
              <div className="col-md-4 d-flex justify-content-center mb-4" key={element.url || index} style={{ maxWidth: "350px" }}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={element.description ? element.description.slice(0, 88) : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>

            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
