import config from './config'

export function goRouter(Vue, path, params = null) {
  const routerPath = params ? `${path}/${params}` : path;
  (Vue.$router.history.current.path !== path) && Vue.$router.push(routerPath)
}

export function fileType(fileName) {
  const fileType = fileName.split('.')[1]
  const iconKey = Object.keys(config.FILE_TYPE).find(key => key === fileType) || 'qita'
  return config.FILE_TYPE[iconKey]
}

