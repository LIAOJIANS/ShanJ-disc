<template>
  <div class="app-container" style="overflow-y: auto; height: 89%; position: relative;">
   <div style="position: absolute; top: 0; left: 0; width: 100%;">
     <tree-table :data="data"
                 :columns="columns"
                 :dialogModel="dialogModel"
                 :table-loading="tableLoading"
                 style="padding-top: 3em"
                 @getAuth="getAuth"></tree-table>
   </div>

  </div>
</template>

<script>

import treeTable from './TreeTable'
import { getIndustryMenuList } from './tool/1ss'
export default {
  components: { treeTable },

  data () {
    return {
      columns: [
        {
          text: '菜单列表',
          value: 'label',
          width: 200,
          option: 'sonData'
        },
        {
          text: '功能权限',
          value: 'sonData',
          option: 'sonData'
        }
      ],
      data: [],
      dialogModel: true,
      tableLoading: false
    }
  },
  props: {
    typeObject: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.getIndustryMenuListA()
  },
  methods: {
    /**
     * 返回页面
     */
    returnPage () {
      this.$emit('returnPage')
    },
    /**
     * 保存授权
     * dxler
     * 2020/04/08
     */
    getAuth (data) {
      let dataTemp = this.deepTraversal(data)
      let params = {
        menus: dataTemp,
        typeId: this.typeObject.id
      }
      this.addMenuTypeData(params)
    },
    /**
     * 保存授权(后台接口)
     * dxler
     * 2020/04/08
     */
    addMenuTypeData () {
      this.dialogModel = false
      // addIndustryMenu(data).then((res) => {
      //   if (res.httpCode == 0) {
      //     this.$message.success({
      //       message: res.msg
      //     })
      //     this.getIndustryMenuList()
      //     this.dialogModel = true
      //     this.returnPage()
      //   } else {
      //     this.$message.error({
      //       message: res.msg
      //     })
      //     this.dialogModel = true
      //     this.returnPage()
      //   }
      // })
    },

    /**
     * 树转数组扁平化结构
     * 深度优先遍历  递归
     */
    deepTraversal (data) {
      let list = []
      const loop = (data) => {
        if (data) {
          for (var i in data) { //遍历最上层
            // 选中push
            if (data[i].isSelect == 1) {
              console.log({ lable: data[i].label, isAuth: data[i].isAuth, isCharge: data[i].isCharge  })
              list.push({
                id: data[i].id,
                isAuth: data[i].isAuth,
                isCharge: data[i].isCharge
              })
            }
            if (!Array.isArray(data[i].children)) {
              // 对像中没有children属性（末级节点遍历）
              if (data[i].checkAll) {
                // 全选中状态，子类全部push
                if (data[i].sonData == undefined) {
                  data[i].sonData = []
                }
                list = [...list, ...data[i].sonData]
              } else if (data[i].isIndeterminate) {
                // 半选中状态 和selectchecked选中id做对比（需要优化）
                try {
                  for (let j = 0; j < data[i].sonData.length; j++) {
                    for (let z = 0; z < data[i].selectchecked.length; z++) {
                      // console.log(data[i].sonData[j])
                      if (data[i].selectchecked[z] == data[i].sonData[j].id) {
                        list.push(data[i].sonData[j])
                      }
                    }
                  }
                } catch (error) {
                  // console.log(error)
                }
              }
            } else {
              // 对象中有children属性
              if (data[i].children !== null) {
                loop(data[i].children)
              }
            }
          }
        }
      }
      loop(data)
      return list
    },
    /**
     * 获取菜单列表数据
     * dxler
     * 2020/04/06
     */
    getIndustryMenuListA () {
      // console.log(getIndustryMenuList().data.vOCompanyTypeMenuTree)
      this.data = this.companyTypeMenuTree(getIndustryMenuList().data.vOCompanyTypeMenuTree)
      // console.log(this.data)
      // getIndustryMenuList('"' + this.typeObject.id + '"').then((res) => {
      //   if (res.httpCode == 0) {
      //     // this.$nextTick(() => {
      //     // console.log(res.data.vOCompanyTypeMenuTree[0].children, res.data.vOCompanyTypeMenuTree[1].children)
      //     // console.log(res.data.vOCompanyTypeMenuTree[1].children[2], res.data.vOCompanyTypeMenuTree[1].children[3])
      //     this.data = this.companyTypeMenuTree(res.data.vOCompanyTypeMenuTree)
      //     this.tableLoading = false
      //     // })
      //
      //   } else {
      //     this.$message.error({
      //       message: res.msg
      //     })
      //     this.tableLoading = false
      //   }
      // })
    },

    /**
     * params：上一次数据的children数据
     * param：上一次数据
     * dxler
     * 2020/04/07
     */
    companyTypeMenuTree (params, param = []) {
      let arr = []
      for (let i = 0; i < params.length; i++) {
        // 设置checkbox-group选中数组
        if (params[i].isSelect == '1') {
          arr.push(params[i].id)
          params[i].disabled = true
          // console.log('arr' + i + '===========', arr)
        }
        // 设置全选中、半选中、不选参数
        if (i == params.length - 1) {
          param.selectchecked = arr
          if (arr.length == params.length) {
            param.isIndeterminate = false
            param.checkAll = true
          } else if (arr.length == 0) {
            param.isIndeterminate = false
            param.checkAll = false
          } else {
            param.isIndeterminate = true
            param.checkAll = false
          }
        }
        // 末级节点替换children属性为sonData，方便横向显示
        if (Array.isArray(params[i].children)) { // 最后一子集
          this.companyTypeMenuTree(params[i].children, params[i])
        }
      }
      return params
    }
  }
}
</script>
<style lang="scss">
.app-container {
  position: relative;
  header {
    position: absolute;
    top: 0em;
    left: 0em;
    width: 100%;
    height: 2.6em;
    border-bottom: 1px #cccccc dotted;
    background: #ffffff;
    color: #367be4;
    cursor: pointer;
  }
  .content-index {
    width: 100%;
    margin-top: 50px;
    display: block;
  }
}
.bottom .main {
  overflow: scroll;
}
.el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
</style>
