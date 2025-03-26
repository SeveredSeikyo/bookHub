import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelfItem = props => {
  const {bookDetails} = props
  const {title, authorName, coverPic, readStatus, rating} = bookDetails
  return (
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
  )
}

export default BookShelfItem
