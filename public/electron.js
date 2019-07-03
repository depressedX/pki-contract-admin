const {app, BrowserWindow} = require('electron')

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let loginWindow,
    mainWindow

function createLoginWindow() {
    // 打开开发者工具
    // loginWindow.webContents.openDevTools()
    loginWindow = new BrowserWindow({
        title:'',
        resizable:false,
        width: 250,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    })
    loginWindow.setMenu(null)

    // 加载index.html文件
//   win.loadFile('test.html')
    loginWindow.loadURL('http://localhost:3000/login').then(resolve => {

    }, e => {
        console.log(e)
    })


    // 当 window 被关闭，这个事件会被触发。
    loginWindow.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        loginWindow = null
    })

}
function createMainWindow() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.setMenu(null)

    // 加载index.html文件
//   win.loadFile('test.html')
    mainWindow.loadURL('http://localhost:3000/home').then(resolve => {

    }, e => {
        console.log(e)
    })

    // 打开开发者工具
    // mainWindow.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    mainWindow.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWindow = null
    })

}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createLoginWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (mainWindow === null) {
        createLoginWindow()
    }
})

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
// 在主进程中.
const {ipcMain} = require('electron')
ipcMain.on('onVerified', (event) => {
    if (loginWindow) {
        loginWindow.close()
        createMainWindow()
    }
})