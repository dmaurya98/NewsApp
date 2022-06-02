// import React  from "react";
import React, {useEffect, useState} from 'react'
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${this.capitalizeFirstLetter( props.category)}- NewsMonkey`;
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 const  updateNews = async()=>{
   props.setProgress(10); 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2d1c6e82a4cb4058b41071aa89a01fc0&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
   props.setProgress(30);
    let parsedData = await data.json()
   props.setProgress(70);
   setArticles(parsedData.articles)
   setTotalResults(parsedData.totalResults)
   setLoading(false)
   props.setProgress(100);
   
    }
   
  // const componentDidMount() {
  //  props.updateNews();
  // }
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2d1c6e82a4cb4058b41071aa89a01fc0&page=1&pageSize=${this.props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   //props.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   // });
  useEffect(() => {
    updateNews(); 
}, [])
  const handlePrevClick = async () => {
    setPage(page-1)
    updateNews();
}
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
    //   }&category=${this.props.category
    //   }&apiKey=2d1c6e82a4cb4058b41071aa89a01fc0&page=${this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    //props.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    //props.setState({
    //   page:props.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    //props.setState({ page:props.state.page - 1 });
    const handleNextClick = async () => { 
      setPage(page+1)
      updateNews()
  }
    // console.log("Next");
    const fetchMoreData = async () => {  
      setPage(page+1) 
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=2d1c6e82a4cb4058b41071aa89a01fc0&page=${page+1}&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json()
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };
    // if (
    //   !(
    //    props.state.page + 1 >
    //     Math.ceil(this.state.totalResults /props.props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
    //     }&category=${this.props.category
    //     }&apiKey=2d1c6e82a4cb4058b41071aa89a01fc0&page=${this.state.page + 1
    //     }&pageSize=${this.props.pageSize}`;
    //  props.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //  props.setState({
    //     page:props.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
  //  props.setState({ page:props.state.page + 1 });
    return (
      <> 
          <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '84px' }} >NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
        </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

          
export default News;
