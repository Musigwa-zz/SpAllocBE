module.exports = (req, res) => {
  return res.render('index', { title: 'SpAlloc', message: "Welcome to our space allocation API" })
}
