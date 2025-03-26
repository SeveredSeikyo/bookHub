import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookShelfItem = props => {
  const {bookDetails} = props
  const {title, authorName, coverPic, readStatus, rating} = bookDetails
  return (
    <div>
      <div>
        <img src={coverPic} alt={title} />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{authorName}</p>
        <p>Status: {readStatus}</p>
      </div>
    </div>
  )
}

export default BookShelfItem
