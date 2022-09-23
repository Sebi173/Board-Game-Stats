const MostFrequentElement = (array) => {
    const hashmap = array.reduce( (acc, val) => {
      acc[val] = (acc[val] || 0 ) + 1
      return acc
    },{})
    return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
  }

export default MostFrequentElement;