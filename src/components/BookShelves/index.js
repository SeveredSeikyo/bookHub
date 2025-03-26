import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BookShelfItem from '../BookShelfItem'
import Footer from '../Footer'
import './index.css'

const BookShelves = props => {
  const {bookshelvesList} = props
  const [bookshelfName, setBookShelfName] = useState('ALL')
  const [searchText, setSearchText] = useState('')
  const [bookShelfData, setBookShelfData] = useState([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch books
  const fetchBooks = async () => {
    setIsError(false)
    setIsLoading(true)
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        console.log(data)
        const formattedBooks = books.map(book => ({
          authorName: book.author_name,
          coverPic: book.cover_pic,
          id: book.id,
          rating: book.rating,
          readStatus: book.read_status,
          title: book.title,
        }))

        setBookShelfData(formattedBooks)
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
  }, [bookshelfName, searchText])

  return (
    <div className="bookshelf-container">
      <Header />
      {/* Desktop */}
      <div className="bookshelf-div">
        <div className="bookshelf-category-div">
          <h1>Bookshelves</h1>
          {bookshelvesList.map(category => (
            <p
              key={category.id}
              className={bookshelfName === category.value ? 'selected' : ''}
              onClick={() => setBookShelfName(category.value)}
            >
              {category.label}
            </p>
          ))}
        </div>

        <div className="bookshelf-result-div">
          <div className="bookshelf-search-div">
            <h1>All Books</h1>
            <div className="bookshelf-search-input">
              <input
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <button type="button" onClick={fetchBooks}>
                <BsSearch />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div
              className="loader-container book-shelf-loader"
              data-testid="loader"
            >
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
            <div className="book-shelves-result-div">
              {bookShelfData.length > 0 ? (
                bookShelfData.map(book => (
                  <Link to={`/books/${book.id}`} key={book.id}>
                    <BookShelfItem key={book.id} bookDetails={book} />
                  </Link>
                ))
              ) : (
                <div className="book-shelves-error-result">
                  <img
                    src="https://i.postimg.cc/X7WyLRMc/Group.png"
                    alt="no books"
                  />
                  <p>Your search for {searchText} did not find any matches.</p>
                </div>
              )}
            </div>
          )}
          {bookShelfData.length > 0 ? <Footer /> : null}
        </div>
      </div>

      {/* Mobile */}
      <div className="bookshelf-mobile-view-div">
        <div className="bookshelf-mobile-search">
          <div className="bookshelf-search-input">
            <input
              type="search"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button type="button" onClick={fetchBooks}>
              <BsSearch />
            </button>
          </div>
        </div>
        <div className="bookshelf-mobile-category-div">
          <h1>Bookshelves</h1>
          <div className="bookshelf-mobile-category-list-div">
            {bookshelvesList.map(category => (
              <button
                type="button"
                key={category.id}
                className={
                  bookshelfName === category.value ? 'selected-mobile' : ''
                }
                onClick={() => setBookShelfName(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div
            className="loader-container book-shelf-loader"
            data-testid="loader"
          >
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
          <div className="book-shelves-result-div">
            {bookShelfData.length > 0 ? (
              bookShelfData.map(book => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  <BookShelfItem key={book.id} bookDetails={book} />
                </Link>
              ))
            ) : (
              <div className="book-shelves-error-result">
                <img
                  src="https://i.postimg.cc/X7WyLRMc/Group.png"
                  alt="no books"
                />
                <p>Your search for {searchText} did not find any matches.</p>
              </div>
            )}
          </div>
        )}
        {bookShelfData.length > 0 ? <Footer /> : null}
      </div>
    </div>
  )
}

export default BookShelves
