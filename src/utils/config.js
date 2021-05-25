
export default {
  FILE_TYPE: {
    zip: require('@/assets/images/zip.png'),
    rar: require('@/assets/images/zip.png'),
    png: require('@/assets/images/img.png'),
    jpg: require('@/assets/images/img.png'),
    jpeg: require('@/assets/images/img.png'),
    avi: require('@/assets/images/avi.png'),
    mp3: require('@/assets/images/mp3.png'),
    ptf: require('@/assets/images/ppt.png'),
    word: require('@/assets/images/word.png'),
    excel: require('@/assets/images/excel.png'),
    mp4: require('@/assets/images/mp3.png'),
    qita: require('@/assets/images/qita.png')
  },

  transfer: [
    { key: '1', icon: 'el-icon-download', title: '正在下载' },
    { key: '2', icon: 'el-icon-upload2', title: '正在上传' },
    { key: '3', icon: 'el-icon-circle-check', title: '完成传输' }
  ],

  home: [
    { key: '1', icon: 'el-icon-time', title: '最近文件' },
    { key: '2', icon: 'el-icon-tickets', title: '全部文件', children: [
      { key: '2-1', title: '图片' },
      { key: '2-2', title: '视频' },
      { key: '2-3', title: '文档' },
      { key: '2-4', title: '表格' },
      { key: '2-5', title: '音乐' },
      { key: '2-6', title: '其他' }
    ] },
    { key: '3', icon: 'el-icon-lock', title: '隐藏空间' },
    { key: '4', icon: 'el-icon-share', title: '我的分享' },
    { key: '5', icon: 'el-icon-delete', title: '回收站' }
  ],

  share: ''
}
