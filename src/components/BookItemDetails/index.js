import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItemDetails = props => {
  const {bookData} = props
  const {
    authorName,
    aboutAuthor,
    aboutBook,
    title,
    coverPic,
    rating,
    readStatus,
  } = bookData
  console.log(
    authorName,
    aboutAuthor,
    aboutBook,
    title,
    coverPic,
    rating,
    readStatus,
  )
  return (
    <div className="book-item-details-div">
      <div className="book-items-center">
        <div className="book-shelf-item-div">
          <div className="book-shelf-item-img-div">
            <img src={coverPic} alt={title} />
          </div>
          <div className="book-shelf-item-summary">
            <h1>{title}</h1>
            <p>{authorName}</p>
            <div className="rating-div">
              <p>Avg Rating</p>
              <BsFillStarFill color="yellow" />
              <p>{rating}</p>
            </div>
            <p>Status: {readStatus}</p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h1>About Author</h1>
        <p>{aboutAuthor}</p>
      </div>
      <div>
        <h1>About Book</h1>
        <p>{aboutBook}</p>
      </div>
    </div>
  )
}

export default BookItemDetails
