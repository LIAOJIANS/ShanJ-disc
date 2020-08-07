

export function goRouter(Vue, path, params = null) {
  const routerPath = params ? `${ path }/${ params }`: path;
  (Vue.$router.history.current.path !== path) && Vue.$router.push(routerPath)
}

