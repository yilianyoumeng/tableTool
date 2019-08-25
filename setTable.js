const data = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

const container = document.getElementById('example');
const hot = new Handsontable(container, {
    data: data,
    rowHeaders: true,
    colHeaders: true,
    mergeCells: true,
    contextMenu: true,
    manualRowResize: true,
    manualColumnResize: true

    // colHeaders: true,
    // rowHeaders: true,
    // manualColumnResize: true,
    // manualRowResize: true,
    // contextMenu: true,
});

//预览
jQuery('#preview').click(function(){
    jQuery('#area2').html('');
    var colgroupHtml=jQuery('.ht_master .htCore colgroup').html();
    colgroupHtml=colgroupHtml.split('>');
    console.log(colgroupHtml)
    var colgroupHtmlNew='';
    for(let i=1;i<colgroupHtml.length-1;i++){
        colgroupHtmlNew=colgroupHtmlNew+colgroupHtml[i]+'>';
    }
    console.log(colgroupHtmlNew);
    colgroupHtmlNew='<colgroup>'+colgroupHtmlNew+'</colgroup>';

    //去除表头
    var tableHtml=jQuery('.ht_master .htCore tbody').html();
    var colHeaderLength=(tableHtml.split('</th>')).length-1;//有多少个colHeader
    for(let i=0;i<colHeaderLength;i++){
        //去除列头
        tableHtml=tableHtml.replace(tableHtml.substring(tableHtml.indexOf('<th '), tableHtml.indexOf('</th>'))+'</th>','');
    }   
    //在td内加<input>
    tableHtml=tableHtml.replace(/><\/td>/g,'><input type="text" ></td>');
    jQuery('#area2').append('<table>'+colgroupHtmlNew+tableHtml+'</table>');
    
})
//下载
jQuery('#buildFile').click(function(){
    jQuery('#area2').html('');
    //去除表头
    var tableHtml=jQuery('.ht_master .htCore tbody').html();
    var colHeaderLength=(tableHtml.split('</th>')).length-1;//有多少个colHeader
    for(let i=0;i<colHeaderLength;i++){
        //去除列头
        tableHtml=tableHtml.replace(tableHtml.substring(tableHtml.indexOf('<th '), tableHtml.indexOf('</th>'))+'</th>','');
    }   
    //在td内加<input>
    tableHtml=tableHtml.replace(/><\/td>/g,'><input type="text" ></td>');
    jQuery('#area2').append('<table>'+tableHtml+'</table>');
    jQuery('#tanDownLoad').removeClass('dn').addClass('db');
    

})
jQuery('.closeBtn').click(function(){
    jQuery('#tanDownLoad').removeClass('db').addClass('dn');
    jQuery('#area2').html('');
})
