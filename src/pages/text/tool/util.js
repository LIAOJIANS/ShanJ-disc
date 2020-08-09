import Vue from 'vue'
export function timeFix () {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? "早上好"
    : hour <= 11
      ? "上午好"
      : hour <= 13
        ? "中午好"
        : hour < 20
          ? "下午好"
          : "晚上好";
}

export function deleteNull (arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].childList) {
      if (arr[i].childList.length == 0) {
        delete arr[i].childList
      } else {
        deleteNull(arr[i].childList)
      }
    } else {
      continue
    }
  }
}

export function welcome () {
  const arr = [
    "休息一会儿吧",
    "准备吃什么呢?",
    "要不要打一把 DOTA",
    "我猜你可能累了"
  ];
  let index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  let event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, true);
  event.eventType = "message";
  window.dispatchEvent(event);
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj (obj) {
  if (!(typeof obj == "object")) {
    return;
  }

  for (var key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      (obj[key] == null || obj[key] == undefined || obj[key] === "")
    ) {
      delete obj[key];
    }
  }
  return obj;
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate (value, fmt) {
  var regPos = /^\d+(\.\d+)?$/;
  if (regPos.test(value)) {
    //如果是数字
    let getDate = new Date(value);
    let o = {
      "M+": getDate.getMonth() + 1,
      "d+": getDate.getDate(),
      "h+": getDate.getHours(),
      "m+": getDate.getMinutes(),
      "s+": getDate.getSeconds(),
      "q+": Math.floor((getDate.getMonth() + 3) / 3),
      S: getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return fmt;
  } else {
    //TODO
    value = value.trim();
    return value.substr(0, fmt.length);
  }
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber () {
  // 生成 最小值 到 最大值 区间的随机数
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  if (arguments.length === 1) {
    let [length] = arguments;
    // 生成指定长度的随机数字，首位一定不是 0
    let nums = [...Array(length).keys()].map(i =>
      i > 0 ? random(0, 9) : random(1, 9)
    );
    return parseInt(nums.join(""));
  } else if (arguments.length >= 2) {
    let [min, max] = arguments;
    return random(min, max);
  } else {
    return Number.NaN;
  }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString (length, chats) {
  if (!length) length = 1;
  if (!chats) chats = "0123456789qwertyuioplkjhgfdsazxcvbnm";
  let str = "";
  for (let i = 0; i < length; i++) {
    let num = randomNumber(0, chats.length - 1);
    str += chats[num];
  }
  return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID () {
  let chats = "0123456789abcdef";
  return randomString(32, chats);
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase (string) {
  return string.replace(/_([a-z])/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn (bpmStatus) {
  if (bpmStatus != "1" && bpmStatus != "3" && bpmStatus != "4") {
    return true;
  }
  return false;
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand (css, id) {
  let style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `@charset "UTF-8"; ${css}`;
  // 清除旧样式
  if (id) {
    let $style = document.getElementById(id);
    if ($style != null) $style.outerHTML = "";
    style.id = id;
  }
  // 应用新样式
  document.head.appendChild(style);
}

/**
 * 通过parentId寻找父类
 */

export const findParent = (tree, id) => {
  if (tree && (tree.length != 0)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].id == id) {
        return tree[i]
      } else if (tree[i].children && (tree[i].children.length != 0)) {
        for (var j = 0; j < tree[i].children.length; j++) {
          if (tree[i].children[j].id == id) {
            return tree[i].children[j]
          } else if (tree[i].children[j].children && (tree[i].children[j].children.length != 0)) {
            if (findParent(tree[i].children[j].children, id)) {
              return findParent(tree[i].children[j].children, id)
            } else {
              continue
            }
          }
        }
      } else {
        continue
      }
    }
  }
}

/**
 * 操作判断
 */
export const canDo = (_this, is, fn) => {
  if (is) {
    _this.$message.warning({
      message: '请选择后再进行操作'
    })
  } else {
    fn && fn()
  }
}

/**
 * 删除提示框
 */
export const tooltip = (_this, callback, title = '提示', param = null) => {
  _this.$confirm('确认执行此操作吗?', title, {
    closeOnClickModal: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (callback) {
      if (typeof callback == 'string') {
        _this[callback](param[0], param[1])
      } else {
        callback()
      }
    }
  }, () => { })
}

/**
 * 树结构添加属性
 * @param {*} data 树数据
 * @param {*} expandAll 是否全部展开
 * @param {*} parent 父类
 * @param {*} level 级别
 * dxler
 * 2020/03/29
 */
export default function treeToArray (data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)
    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}
