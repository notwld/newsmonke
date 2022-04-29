import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import {PropTypes} from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general"
  };
  static propTypes={
    country: PropTypes.string,
    category: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalPages: 0,
      loading: false,

    };
  }

  
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b63abbe2853c4e66bb49effe2da4e7fb&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
        articles: data.articles,
        page: 1,
        totalPages: data.totalResults,
        loading: false,
      });
    
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b63abbe2853c4e66bb49effe2da4e7fb&page=${this.state.page}&pageSize=20`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalPages: data.totalResults,
      loading: false,
    })
  }

  // handleNext = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b63abbe2853c4e66bb49effe2da4e7fb&page=${this.state.page + 1 }&pageSize=20`;

  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalPages / 20))) {
  //     this.setState({ loading: true });
  //     let response = await fetch(url);
  //     let data = await response.json();
  //     this.setState({
  //         articles: data.articles,
  //         page: this.state.page + 1,
  //         totalPages: data.totalResults,
  //         loading: false,
  //       });
  //   }
  // };

  // handlePrev = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b63abbe2853c4e66bb49effe2da4e7fb&page=${this.state.page - 1 }&pageSize=20`
  //   this.setState({ loading: true });
  //   let response = await fetch(url);
  //   let data = await response.json();
  //     this.setState({
  //       articles: data.articles,
  //       page: this.state.page - 1,
  //       loading: false,
  //     });

  // };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center my-4">MonkeNews101 - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalPages}
          loader={<Spinner/>}
        >
        <div className="row md-4 my-4">
          {this.state.articles.map((element) => (
            <div className="col my-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 42) : ""}
                description={
                  element.description
                  ? element.description.slice(0, 48)
                  : "click on read more"
                }
                imgUrl={
                  element.urlToImage
                  ? element.urlToImage
                  : "https://cdn.discordapp.com/attachments/792513175596695612/954453252680867960/flat-cartoon-character-vector-id1156845283.png"
                }
                publishedAt={element.publishedAt}
                author={element.author} 
                source={element.source.name}
                readMore={element.url}
                />
            </div>
          ))}
      </div>
          </InfiniteScroll>
      </div>
    );
  }
}

export default News;
