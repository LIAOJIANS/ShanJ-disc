module.exports = {
  presets: [
    ['@vue/app', {
      useBuiltIns: 'entry'
    }],
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
