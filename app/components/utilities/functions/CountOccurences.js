let CountOccurences = (element, array) => {
    let count = 0
    array.forEach(x => {
      if (x === element) {
        count += 1;
      }
    })
    return count
  }

export default CountOccurences;