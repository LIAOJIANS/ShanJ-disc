<template>
  <div>
    <el-table :data="formatData"
              :row-style="showRow"
              v-loading="tableLoading"
              stripe
              border
              highlight-current-row
              :header-cell-style="{color: '#333'}"
              :cell-style="{'background-color': '#ffffff'}"
              show-overflow-tooltip
              style="width: 100%;"
              v-bind="$attrs">
      <!-- columns为空时，表格树显示数据 -->
      <el-table-column v-if="columns.length===0"
                       width="150">
        <template slot-scope="scope">
          <!-- 循环每行的级别 -->
          <span v-for="space in scope.row._level"
                class="ms-tree-space"
                :key="space"></span>
          <!-- 显示图标状态，展开-收缩状态 -->
          <span class="tree-ctrl"
                v-if="iconShow(0,scope.row)"
                @click="toggleExpanded(scope.$index)">
            <!-- <i v-if="!scope.row._expanded"
               class="el-icon-plus"></i>
            <i v-else
               class="el-icon-minus"></i> -->
          </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <!-- columns不为空时，表格树显示数据 -->

      <el-table-column v-else
                       v-for="(column, index) in columns"
                       :key="column.value"
                       :label="column.text"
                       :width="column.width">
        <template slot-scope="scope">
          <!-- 级别显示 展开-收缩图标显示 -->
          <span v-show="index === 0"
                v-for="space in scope.row._level"
                class="ms-tree-space"
                :key="space"></span>

          <span class="tree-ctrl"
                v-if="iconShow(index, scope.row)"
                @click="toggleExpanded(scope.$index)">
            <el-checkbox :indeterminate="scope.row.isIndeterminate"
                         v-model="scope.row.checkAll"
                         @change="handleCheckAllChange1(scope.$index, scope.row,column.option)">{{scope.row[column.value]}}</el-checkbox>
            <!-- <i v-if="!scope.row._expanded"
               class="el-icon-plus"></i>
            <i v-else
               class="el-icon-minus"></i> -->
          </span>
          <el-checkbox v-else-if="index === 0 && scope.row.menuType == 2"
                       :indeterminate="scope.row.isIndeterminate"
                       v-model="scope.row.checkAll"
                       @change="handleCheckAllChange(scope.$index, scope.row,scope.row[column.option])">{{ scope.row[column.value] }}</el-checkbox>
          <el-checkbox-group v-if="index === 1 && isShowFat(scope.row)"
                             v-model="scope.row.selectchecked"
                             @change="handleCheckedCitiesChange(scope.$index, scope.row,scope.row[column.option])">
            <el-checkbox v-for="(interset) in scope.row[column.value]"
                         :label="interset.id"
                         :key="interset.id">{{interset.label}}</el-checkbox>
          </el-checkbox-group>

          <!-- 单行选中（操作 权限也全选） -->

<!--          {{ scope.row.menuType == 2 }}-->
          <!-- 父类选中-子类全选 -->
          <!-- <el-checkbox v-else
                       :indeterminate="scope.row.isIndeterminate"
                       v-model="scope.row.checkAll"
                       :disabled="scope.row.disabled"
                       @change="handleCheckAllChange1(scope.$index, scope.row,column.option)">456{{scope.row[column.value]}}</el-checkbox> -->

        </template>
      </el-table-column>


      <template v-if="isShowCharge">
        <el-table-column label="是否认证"
                         width="140">
          <template slot-scope="scope"
                    v-if="isShowFat(scope.row)">
            <el-radio v-model="scope.row.isAuth"
                      :label="radio.value"
                      :key="radio.value"
                      v-for="(radio) in isCreateNewUser">{{radio.label}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="是否收费"
                         width="140">
          <template slot-scope="scope"
                    v-if="isShowFat(scope.row)">
            <el-radio v-model="scope.row.isCharge"
                      :label="radio.value"
                      :key="radio.value"
                      v-for="(radio) in isCreateNewUser">{{radio.label}}</el-radio>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <footer class="pull-center">
      <el-button v-if="dialogModel"
                 type="primary"
                 @click="getAuth">确 定</el-button>
      <el-button v-else
                 type="primary"
                 :loading="true">保存中</el-button>
    </footer>
  </div>
</template>

<script>
import treeToArray from './tool/util'
let white = ["1270564909109714945", "1270565250026938370", "1270565341966082049"]
export default {
  name: 'treeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    },
    dialogModel: {
      type: Boolean,
      default: true
    },
    tableLoading: {

    },
    isShowCharge: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      //是否创建新用户(登陆账户)
      isCreateNewUser: [
        { label: "是", value: '1' },
        { label: "否", value: '0' }
      ],
      isCreateUser: 0
    }
  },
  computed: {

    // 格式化数据源
    formatData: function () {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      let arrs = []
      func.apply(null, args).forEach(item => {
        if(!Array.isArray(item.children)) {
          item.parent.sonData = item.parent.children
          !white.includes(item.id) && (item.parent.menuType = 2)
        }
        ((Array.isArray(item.children) && item.children.length)
          || ( white.includes(item.id) && !Array.isArray(item.children)))
        && (arrs = [...arrs, item])
      })
      console.log(arrs)
      return arrs
    }
  },
  methods: {
    isShowFat (item) {
      let i = 0
      if(Array.isArray(item.children) && item.children.length > 0) {
        i = Array.isArray(item.children[0].children) ? 0 : 1

        // i = Array.isArray(item.children[0].menutype) ? 0 : 1
      }
      return i
    },
    showRow: function (row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function (trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow (index, record) {
      return (index === 0 && record.children && record.children.length > 0 && record.menuType != 2)
        || (index === 0 && white.includes(record.id))
    },
    /**
     * 末级 - 行选中（sonData功能选中）
     * dxler
     * 2020/04/07
     */
    handleCheckAllChange (index, row, opt) {
      // console.log('handleCheckAllChange', row)
      if (row.selectchecked.length && row.selectchecked.length !== opt.length) {
        // 半选
        let arr = []
        opt.forEach(element => {
          arr.push(element.id)
        })
        row.selectchecked = arr
        row.checkAll = false
        row.isIndeterminate = true
        row.isSelect = '1'
      } else if (!row.selectchecked.length) {
        // 全选
        let arr = []
        opt.forEach(element => {
          arr.push(element.id)
        })
        row.selectchecked = arr
        row.checkAll = true
        row.isIndeterminate = false
        row.isSelect = '1'
      } else {
        // 选不全
        row.selectchecked = []
        row.checkAll = false
        row.isIndeterminate = false
        row.isSelect = '0'
      }
      this.parentStatus(row)
    },
    /**
     * 功能权限，单个选择（checkbox-group）
     * dxler
     * 2020/04/07
     */
    handleCheckedCitiesChange (index, row, opt) {
      console.log(index, row, opt)
      // console.log('handleCheckedCitiesChange', row)
      row.checkAll = row.selectchecked.length === opt.length
      row.isIndeterminate = row.selectchecked.length > 0 && row.selectchecked.length < opt.length
      row.isSelect = row.selectchecked.length == 0 ? '0' : '1'
      this.parentStatus(row)
    },
    /**
     * 判断父类选中状态
     * dxler
     * 2020/04/07
     */
    parentStatus (row) {
      try {
        console.log(row)
        if (row.parentId !== 0) {
          row.parent['checkAll'] = false
          row.parent['isIndeterminate'] = true
          row.parent['isSelect'] = '1'
          this.parentStatus(row.parent)
        } else {
          return row
        }
      } catch (error) {
        // console.log(error)
      }
    },
    /**
     * 父类选中（子类要全选/不全选）
     * dxler
     * 2020/04/07
     */
    handleCheckAllChange1 (index, row, opt) {
      // console.log('handleCheckedCitiesChange1')
      this.checkAllChange(index, row, opt)
    },
    /**
     * 递归循环选中
     * dxler
     * 2020/04/07
     */
    checkAllChange (index, row, opt) {
      if (row.children) {
        for (let i = 0; i < row.children.length; i++) {
          let arr = []
          // 全选
          if (row.checkAll) {
            try {
              if (row.children[i][opt] == undefined) {
                row.children[i]['children'].forEach(element => {
                  arr.push(element.id)
                })
              }
              row.children[i][opt].forEach(element => {
                arr.push(element.id)
              })
            } catch (error) {
              // console.log(error)
            }

            row.children[i].selectchecked = arr
            row.children[i].checkAll = true
            row.children[i].isIndeterminate = false
            row.children[i].isSelect = '1'
            row.checkAll = true
            row.isIndeterminate = false
            row.isSelect = '1'
          } else {
            // 全不选
            row.children[i].selectchecked = []
            row.children[i].checkAll = false
            row.children[i].isIndeterminate = false
            row.children[i].isSelect = '0'
            row.checkAll = false
            row.isIndeterminate = false
            row.isSelect = '0'
          }

          if (row.children[i].children !== undefined) {
            this.checkAllChange(index, row.children[i], opt)
          }
        }
      }
      return row
    },
    getAuth () {
      this.$emit('getAuth', this.data)
    }
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .el-table__body {
    text-align: left;
  }
</style>

<style lang="scss" scoped>
  footer {
    margin-top: 15px;
  }
  $color-blue: #2196f3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: "";
    }
  }
  .processContainer {
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
