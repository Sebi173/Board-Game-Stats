const SortNumericalArray = (array, isAscending) => {
    if (isAscending) {
      array.sort((a,b) => a.y - b.y)
    } else {
      array.sort((a,b) => b.y - a.y)
    }
    return array
  }

export default SortNumericalArray;