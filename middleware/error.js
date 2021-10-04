const notFound = (res, res, next) => {
  next()
}

const errorFound = (err, req, res, next) => {
  const error = "";

  next(error);
}

module.exports = { notFound, errorFound };
