import React, {useEffect, useState} from 'react'
import Loading from './Loading';
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  
  News.defaultProps = {
    pageSize : 9,
    country : "us",
    category : "general",
  }
  
  News.propTypes = {
    category : PropTypes.string,
    country : PropTypes.string,
    pageSize : PropTypes.number
  }
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0083b7d014fd4fa6a86e37c3533b084d&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100)
  }


  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  }, [])
  


  // handlePrevClick = async () => {
  //   this.setState({ page : this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({page : this.state.page + 1});
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0083b7d014fd4fa6a86e37c3533b084d&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <>
        <h2 className='text-center' style={{ margin: '35px 0px' ,marginTop : '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {/* {loading && <Loading />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Loading/>}
        >
      <div className="container my-2">
        <div className="row">
            { articles.map((element, index) => {
            return <div className="col-md-4 my-2" key={index}>
                <Newsitems  title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 80) : "Lorem ipsum dolor sit amet consectetur adipisicing elit".slice(0, 44)} imageUrl={element.urlToImage ? element.urlToImage : "https://media.cnn.com/api/v1/images/stellar/prod/221116084809-biden-poland-missile-111622.jpg?c=16x9&q=w_800,c_fill"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>

            })}
        </div>
        </div>
        </InfiniteScroll>
      {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type='button' className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button disabled={this.state.page + 1 > Math.ceil( this.state.totalResults / this.props.pageSize )} type='button' className="btn btn-dark nextBtn" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
      </>
    )
  
}
