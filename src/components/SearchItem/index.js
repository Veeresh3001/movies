const SearchItem = props => {
  const {data} = props
  return (
    <li>
      <img src={data.backdropPath} alt={data.title} />
    </li>
  )
}

export default SearchItem
