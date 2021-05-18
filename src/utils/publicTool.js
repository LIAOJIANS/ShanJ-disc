import config from './config'
export function goRouter(Vue, path, params = null) {
  const routerPath = params ? `${path}/${params}` : path;
  (Vue.$router.history.current.path !== path) && Vue.$router.push(routerPath)
}

export function fileType(fileName) {
  let iconUrl = null
  Object.keys(config.FILE_TYPE).forEach(key => {
    key === fileName.split('.')[1] && (iconUrl = config.FILE_TYPE[key])
  })
  return iconUrl
}

