exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

//middleware para acessar rotas especificas
exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Você precisa fazer login");
    req.session.save(() => res.redirect("/login/index"));
    return;
  }

  next();
};
