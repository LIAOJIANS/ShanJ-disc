// const Op = require('sequelize').Op

/*
* 根据条件查找新数据
* @params option 配置对象
* */
function findOne(example, option, cb) {
  example.findOne({
    where: option
  }).then(res => {
    cb && cb(res)
  }).catch(err => {
    cb && cb(err)
  })
}

/*
* 创建一条新数据
* @params option 配置对象
* */
function create(example, option, cb) {
  example.create(
    option
  ).then(list => {
    cb && cb(list)
  }).catch(() => {
    cb && cb(false)
  })
}

/*
* 根据ID查一条数据
* @params option 配置对象
* */
function findById(example, id, cb) {
  example.findById(id).then(list => {
    cb && cb(list)
  }).catch(err => {
    cb && cb(err)
  })
}

/*
* 根据条件更新数据
* @params option 配置对象
* 示例：
*  option = { firstName: "King" },
      {
        where: { firstName: null }
      }
* */
function update(example, option, cb) {
  example.update(...option).then(list => {
    cb && cb(list)
  }).catch(err => {
    cb && cb(err)
  })
}

/*
* 根据条件删除一条数据
* @params option 配置对象
* */
function destroy(example, option, cb) {
  example.destroy(option).then(list => {
    cb && cb(list)
  }).catch(err => {
    cb && cb(err)
  })
}

module.exports = {
  findOne,
  create,
  findById,
  update,
  destroy
}
