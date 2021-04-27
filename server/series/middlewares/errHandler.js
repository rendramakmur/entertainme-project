const errHandler = (err, req, res, next) => {
  if (err.code === 400) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else if (err.code === 404) {
    res.status(err.code).json({ code: err.code, message: err.message })
  } else {
    res.status(500).json({ code: 500, message: err.message })
  }
}

module.exports = errHandler