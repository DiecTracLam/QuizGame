var jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Invalid authorization header",
    });
  }
  try {
    const verify = jwt.verify(token, "sha");
    req.userId = verify.userId;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error.message,
    });
  }
}

module.exports = verifyToken;
