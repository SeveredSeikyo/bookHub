import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BookItemDetails from '../BookItemDetails'
import './index.css'

const BookDetails = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [bookData, setBookData] = useState({})
  const [isError, setIsError] = useState(false)
  console.log(isLoading)
  const {match} = props
  const {params} = match
  console.log(params)
  const fetchBooks = async () => {
    setIsError(false)
    setIsLoading(true)
    const url = `https://apis.ccbp.in/book-hub/books/${params.id}`
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
        const bookDetails = data.book_details
        console.log(data)
        const formattedBook = {
          aboutAuthor: bookDetails.about_author,
          aboutBook: bookDetails.about_book,
          authorName: bookDetails.author_name,
          coverPic: bookDetails.cover_pic,
          id: bookDetails.id,
          rating: bookDetails.rating,
          readStatus: bookDetails.read_status,
          title: bookDetails.title,
        }

        setBookData(formattedBook)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onClickTryAgain = () => {
    fetchBooks()
  }

  // Fetch books when `bookshelfName` or `searchText` changes
  useEffect(() => {
    fetchBooks()
  }, [])
  return (
    <div className="book-details-container">
      <Header />
      <main className="book-details-main">
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
          <div className="book-details-div">
            <BookItemDetails bookData={bookData} />
          </div>
        )}
      </main>
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
        <Footer />
      </div>
    </div>
  )
}

export default BookDetails
