const requireUser = (_req, res, next) => {
  const user = res.locals.user;
  console.log('requireUser', res.locals);

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
