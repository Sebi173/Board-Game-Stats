//Return the average of an array
let NumericalAverage = (array) => {
    return array.reduce((a,b) => a + b, 0) / array.length;
  }

export default NumericalAverage;