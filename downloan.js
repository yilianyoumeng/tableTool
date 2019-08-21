const {dialog} = require('electron').remote
const {ipcRenderer} = require('electron')

var button_choose = document.getElementById("choose-folder");//选择文件夹
var button_download = document.getElementById("download-btn");
var downloadFolder = document.getElementById("download-to");
var areaHtml = document.getElementById('area2');
//var downloadAddress = document.getElementById("download-address");

ipcRenderer.on('tips', (event, person) => {
  console.log(person, 'born')
});

window.onload = function() {
    button_choose.addEventListener("click", function(){
        dialog.showOpenDialog({
            defaultPath :'',
            properties: [
                'openDirectory',
            ],
            filters: [
                { name: 'All', extensions: ['*'] },
            ]
        },function(res){
            downloadFolder.value = res[0];
        })
    });
    button_download.addEventListener("click", function(){
        //var tips = document.getElementsByClassName("tips")[0];
        console.log(areaHtml.innerHTML);
        console.log(downloadFolder.value);
        var folderName = $('#folderName').val();
        if(downloadFolder.value!="") {
            ipcRenderer.send('download',[downloadFolder.value,areaHtml.innerHTML,folderName]);//
             alert("下载成功");
             jQuery('#tanDownLoad').removeClass('db').addClass('dn');
             jQuery('#area2').html('');
        }else {
            alert("未选择文件夹");
        }
    })
}
