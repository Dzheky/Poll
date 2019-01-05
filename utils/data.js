module.exports = {
  unique: (arr) => [...new Set(arr)],
  random: (arr, last) => arr.filter((el) => el !== last)[Math.floor(Math.random() * (arr.length - 1))],
  deepClone: function (obj) {
    const clone = Object.assign({}, obj);

    Object.keys(clone).forEach((key) => {
      clone[key] = typeof obj[key] === 'object' ? this.deepClone(obj[key]) : obj[key];
    });

    return Array.isArray(obj) ? clone.length = obj.length && Array.from(clone) : clone;
  },
};