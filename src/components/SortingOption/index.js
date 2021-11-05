import './index.css'

const SortingOption = props => {
  const {sortbyOptions} = props

  return (
    <option key={sortbyOptions.optionId} value={sortbyOptions.optionId}>
      {sortbyOptions.displayText}
    </option>
  )
}

export default SortingOption
