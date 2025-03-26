import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookItemHome from '../BookItemHome'
import './index.css'

const Home = props => {
  const {history} = props
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [toppicksData, setToppicksData] = useState([])
  const fetchTopPicks = async () => {
    setIsLoading(true)
    setIsError(false)
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {books} = data

        const formattedBooks = books.map(book => ({
          authorName: book.author_name,
          coverPic: book.cover_pic,
          id: book.id,
          title: book.title,
        }))

        setToppicksData(formattedBooks)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchTopPicks()
  }, [])

  const onClickTryAgain = () => {
    fetchTopPicks()
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className="home-container">
      <Header />
      <main className="home-main-div">
        <div className="home-main-head-div">
          <h1>Find Your Next Favorite Books?</h1>
          <p>
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button type="button" onClick={() => history.push('/shelf')}>
            Find Books
          </button>
        </div>
        <div className="home-top-rated-div">
          <div className="home-top-rated-head">
            <h2>Top Rated Books</h2>
            <button type="button" onClick={() => history.push('/shelf')}>
              Find Books
            </button>
          </div>
          {isLoading ? (
            <div className="loader-container" testid="loader">
              <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
            </div>
          ) : null}
          {isError ? (
            <div className="error-view">
              <img
                src="https://i.postimg.cc/WpnGGXdy/Group-7522.png"
                alt="failure view"
              />
              <p>Something went wrong, Please try again.</p>
              <button type="button" onClick={onClickTryAgain}>
                Please Try Again
              </button>
            </div>
          ) : (
            <Slider {...settings}>
              {toppicksData.map(book => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  <BookItemHome id={book.id} bookDetails={book} />
                </Link>
              ))}
            </Slider>
          )}
        </div>
      </main>
      <div style={{bottom: 0, left: 0, right: 0}}>
        <Footer />
      </div>
    </div>
  )
}

export default Home
