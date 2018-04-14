module.exports = function (mongoose) {
  mongoose.plugin(require('./uniqueValidator'))
}
