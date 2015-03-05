// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.storage.local.get('vkColorChanger', function(result){
    var values = result['vkColorChanger'];
    values = JSON.parse(values);

    if(values.gray == 'on'){
        document.getElementById('gray').checked=true;
    }
    if(values.sepia == 'on'){
        document.getElementById('sepia').checked=true;
    }
    if(values.invert == 'on'){
        document.getElementById('invert').checked=true;
    }

    document.querySelector('#hue-deg').value =  values['hue-deg'];
    document.querySelector('#background-image').value =  values['background-image'];
    setStyle(values.gray, values.sepia, values.invert);
});

function setStyle(g, s, i) {
    var data = "body{-webkit-filter:";
    if(g=='on')
      data += " grayscale(100%) contrast(120%)";
    if(s=='on')
      data += " sepia(100%) contrast(120%)";
    if(i=='on')
      data += " invert(1); background-color: black";
    data += ";}";
    var css = document.getElementById("VKcolorChanger");
    if(css){
        css.innerHTML = data;
    }else{ 
        var css = document.createElement("style");
        css.setAttribute("type", "text/css");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("id", "VKcolorChanger");
        css.innerHTML = data;
        document.getElementsByTagName("head")[0].appendChild(css);
    }
}

function save_options(e) {
    //console.log(e);
    //var deg = e;
    var values = new Object();

    values['hue-deg'] = document.querySelector('#hue-deg').value;

    values['background-image'] = document.querySelector('#background-image').value;

    if(document.querySelector('#gray').checked){
        values['gray'] = document.querySelector('#gray').value;
    }else{
        values['gray'] = 'off';
    }
    if(document.querySelector('#sepia').checked){
        values['sepia'] = document.querySelector('#sepia').value;
    }else{
        values['sepia'] = 'off';
    }
    if(document.querySelector('#invert').checked){
        values['invert'] = document.querySelector('#invert').value;
    }else{
         values['invert'] = 'off';
    }
    setStyle(values['gray'], values['sepia'], values['invert']);

    values = JSON.stringify(values);
    chrome.storage.local.set({'vkColorChanger': values});

    /**Изменение всех открытых вкладок */
    chrome.tabs.query({'url': '*://vk.com/*'}, function(tabs) {
        for(var i = 0; i<tabs.length; ++i){
            chrome.tabs.executeScript(tabs[i].id, {file : "bg.js"});
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
   document.querySelector('#gray').addEventListener('click', save_options);
   document.querySelector('#sepia').addEventListener('click', save_options);
   document.querySelector('#invert').addEventListener('click', save_options);
   document.querySelector('#background-image').addEventListener('change', save_options);
});