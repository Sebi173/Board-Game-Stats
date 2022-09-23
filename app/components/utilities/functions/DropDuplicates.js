//Drop duplicates in array and return array with unique elements
let DropDuplicates = (array) => {
    return array.filter((x, index) => array.indexOf(x) === index)
  }

export default DropDuplicates;