import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import BookShelfItem from '../BookShelfItem'
import Footer from '../Footer'
import './index.css'

const BookShelves = () => {
  const [bookshelfName, setBookShelfName] = useState('All')
  const [searchText, setSearchText] = useState('')
  const [bookShelfData, setBookShelfData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch books
  const fetchBooks = async () => {
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
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch books when `bookshelfName` or `searchText` changes
  useEffect(() => {
    fetchBooks()
  }, [bookshelfName, searchText])

  return (
    <div className="bookshelf-container">
      <Header />
      <div>
        {/* Bookshelves Categories */}
        <div className="bookshelf-category-div">
          <h1>Bookshelves</h1>
          {['All', 'Read', 'Currently Reading', 'Want to Read'].map(
            category => (
              <p
                key={category}
                className={bookshelfName === category ? 'selected' : ''}
                onClick={() => setBookShelfName(category)}
              >
                {category}
              </p>
            ),
          )}
        </div>

        {/* Search Bar */}
        <div>
          <h1>All Books</h1>
          <div>
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

        {/* Books List or Loader */}
        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
          </div>
        ) : (
          <div>
            {bookShelfData.length > 0 ? (
              bookShelfData.map(book => (
                <BookShelfItem key={book.id} bookDetails={book} />
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}

export default BookShelves
