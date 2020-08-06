
export function fileTraversal(list, cb) {
  list.forEach((item, index) => {
    cb && cb(item, index)
  })
}
