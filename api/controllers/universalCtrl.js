exports.requestNotAccepted = (req, res) => {
  res.status(403).end(`/${req.method} not supported on ${req.originalUrl}`);
};
