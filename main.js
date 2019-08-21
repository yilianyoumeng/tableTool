const electron = require('electron')
const {dialog, ipcMain} = require('electron')
const {download} = require('electron-dl');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
require('electron-dl')();


const path = require('path')
const url = require('url')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let folderpath
let htmlStr
// let downloadpath
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600,resizable:true})
  ipcMain.on('download', (evt, args) => {
      folderpath = args[0];
      htmlStr = args[1];
      folderName = args[2];
      evt.sender.send('tips',+folderName+'.html');  
      //创建html
      fs.open(folderpath+'/'+folderName+'.html','w+',function(err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("buildFile html success !");
        console.log(__dirname);
        fs.readFile(__dirname+'/html.html', function (err, data) {
            if (err) {
                return console.error(err);
            }else{
              var htmlArr=data.toString().split('<div>');
              var html=htmlArr[0]+'<div>'+htmlStr+htmlArr[1];
              fs.writeFile(folderpath+'/'+folderName+'.html',html,function(err, fd) {
                if (err) {
                    return console.error(err);
                }
                console.log('writeFile success!')
              })
            }
        }); 
      });
  });
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    // Set the save path, making Electron not to prompt a save dialog.
    console.log('can do this2?')
    console.log(`${item.getFilename()}`);
    item.setSavePath(folderpath+`\\${item.getFilename()}`);
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
      } else {
        console.log(`Download failed: ${state}`)
      }
    })
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //控制台
  // mainWindow.webContents.openDevTools()
  
  mainWindow.on('closed', function () {
    mainWindow = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

