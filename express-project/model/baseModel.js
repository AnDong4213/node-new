module.exports = {
  createAt: {
    type: String,
    default: new Date(Date.now() + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "")
  },
  updateAt: {
    type: String,
    default: new Date(Date.now() + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "")
  }
};
