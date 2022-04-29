import React, { Component } from "react";

export default class NewsItem extends Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.description = props.description;
    this.imgUrl = props.imgUrl;
    this.moreUrl = props.moreUrl;
    this.author = props.author;
    this.publishedAt = props.publishedAt;
    this.source = props.source;
  }
  render() {
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={this.imgUrl} className="card-img-top" alt="..." />
          <span
            className="badge bg-primary"
            style={{
              borderRadius: "0px",
            }}
          >
            {this.source}
          </span>
          <div className="card-body">
            <p className="card-text">
              By {!this.author ? "unkown" : this.author}
            </p>
            <h5 className="card-title">{this.title}...</h5>
            <p className="card-text">{this.description}...</p>
            <p className="text-muted card-text">
              published at {new Date(this.publishedAt).toLocaleDateString()}
            </p>
            <a href={this.moreUrl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
