exports.list = async (req, res) => {
  res.send(req.method);
};

exports.register = async (req, res) => {
  res.send(req.body);
};
