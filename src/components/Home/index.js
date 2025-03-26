import {useState, useEffect} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookItemHome from '../BookItemHome'
import './index.css'

const Home = props => {
  const {history} = props
  const [toppicksData, setToppicksData] = useState([])
  useEffect(() => {
    const fetchTopPicks = async () => {
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
      }
    }

    fetchTopPicks()
  }, [])

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
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
          <Slider {...settings}>
            {toppicksData.map(book => (
              <BookItemHome id={book.id} bookDetails={book} />
            ))}
          </Slider>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
