exports.requestNotAccepted = (req, res) => {
  res.status(403).end(`/${req.method} not supported on ${req.originalUrl}`);
};

exports.serverDbError = (err) => (req, res) => res.status(500).send(err);

exports.unauthorizedError = (err) => (req, res) => res.status(401).send(err);
