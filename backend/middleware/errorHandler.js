const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  if (error) {
    console.log(error);
    return res.status(404).json({ Error: `Not Found - ${req.originalUrl}` });
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  return res.status(400).json({ Error: err.message });
};

export { notFound, errorHandler };
