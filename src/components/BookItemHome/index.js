import './index.css'

const BookItemHome = props => {
  const {bookDetails} = props
  const {authorName, coverPic, title} = bookDetails

  return (
    <div className="home-book-item-div">
      <div className="home-book-item-img-div">
        <img src={coverPic} alt={title} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{authorName}</p>
      </div>
    </div>
  )
}

export default BookItemHome
