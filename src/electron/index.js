﻿const { app, BrowserWindow } = require('electron')

// 获取单例锁
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  const { mainWindowIpcStart } = require('./lib/ipcMain')
  const path = require('path')
  global.appDirname = __dirname

  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

  const winURL = path.resolve(__dirname, '../renderer/index.html')

  let mainWindow
  // eslint-disable-next-line no-inner-declarations
  function createWindow() {
    const win = new BrowserWindow({
      width: 1580,
      height: 888,
      // resizable: false,
      // useContentSize: true,
      /* transparent: true, */
      icon: path.resolve(__dirname, './icon/logo.png'),
      frame: false,
      show: false,
      webPreferences: {
        webSecurity: false,
        nodeIntegration: true,
        contextIsolation: false,
        webviewTag: true
      }
    })
    /* win.maximize(); */
    // console.log(app.isPackaged)
    if (app.isPackaged) {
      win.loadURL(`file://${winURL}`)
    } else {
      win.loadURL('http://localhost:8080')
      win.webContents.openDevTools()
    }

    win.on('closed', () => { mainWindow = null })
    win.on('ready-to-show', () => { win.show() })
    return win
  }

  app.on('ready', function() {
    // eslint-disable-next-line new-cap
    mainWindow = new createWindow()
    mainWindowIpcStart(mainWindow)
  })

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.on('quit', () => {
    app.releaseSingleInstanceLock()// 释放所有的单例锁
  })
}
