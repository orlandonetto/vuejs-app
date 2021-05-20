export default async (to, from, next) => {
  document.title = to.name;

  const authRequired = to.matched[0].meta.authRequired || false;

  const authenticated =
    localStorage.getItem("authenticated") == "true" || false;

  // if the user has not authenticated and tries access private page
  if (authRequired && !authenticated) return next("/auth");

  // if the user has authenticated and tries access public page
  if (!authRequired && authenticated) return next("/main");

  // else... next
  next();
};
