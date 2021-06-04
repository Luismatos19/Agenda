exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
