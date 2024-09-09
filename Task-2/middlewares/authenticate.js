function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
    return res.status(401).json({
      data: {},
      err: "User not Authorized",
      success: false,
      message: `Unable to fetch user with id : ${req.params.id}`,
    });
  next();
}

export default authenticate;
