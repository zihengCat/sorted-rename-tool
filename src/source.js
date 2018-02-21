// binding click event
document.querySelector("#apply").onclick = doRename;
document.querySelector("#reset").onclick = doReset;

// test function
function doUnitTest(){
    /*
    var format   = parseInt(document.querySelector("#format").value);
    console.log(format);
    for(var i = 0; i < 1024; i++){
        console.log(addPreZero(i.toString(), format));
    }
    */
}

// core function
function doRename(){
    // import Node.JS Library
    const os   = require("os");
    const fs   = require("fs");
    const path = require("path");
    // select elements
    var fileList = document.querySelectorAll(".invisiable");
    var preStr   = document.querySelector("#pre").value;
    var postStr  = document.querySelector("#post").value;
    // must be interger number
    var format   = parseInt(document.querySelector("#format").value);
    for(var i = 0; i < fileList.length; i++){
        var oldPath = fileList[i].textContent;
        var pathObj = path.parse(oldPath);
        var newPath = pathObj.dir
                    +  "/"
                    + preStr
                    // padding zeros
                    + addPreZero(i.toString(), format)
                    + postStr
                    + pathObj.ext;
        // Debug Log
        console.log(newPath);
        fs.rename(oldPath, newPath, function(err){
            if(err){
               throw err;
            }
            else{
                console.log('Done --> ', i);
            }
        });

    }
}

// padding 0 function
function addPreZero(numStr, numZero){
    if(numZero <= 1){
        return numStr;
    }
    else{
        var preZero = "";
        for(var i = 0; i < numZero; i++){
            preZero += '0';
        }
        return (preZero + numStr).slice(numZero * -1);
    }
}

// global drop function
document.addEventListener('drop', function (e) {
      e.preventDefault();
      e.stopPropagation();

      for (let f of e.dataTransfer.files) {
        // console.log('File(s) you dragged here: ', f.path);
        addElem(f.path);
      }
});
    document.addEventListener('dragover', function (e) {
      e.preventDefault();
      e.stopPropagation();
});

// clean elements
function doReset() {
    clearList();
}
function clearList() {
    var simpleList = document.querySelector(".sortable");
    var delElems   = $(simpleList).children();
    //console.log(delElems);
    for(var i = 0; i<delElems.length; i++){
        simpleList.removeChild(delElems[i]);
    }
}
// add elements
function addElem(pathName) {
    const path = require('path');
    var showName = path.basename(pathName);
    var simpleList = document.querySelector(".sortable");
    var newElem = document.createElement("li");
    newElem.className = "ui-state-default";
    newElem.innerHTML = "<span class=\"file-text\">" + showName + "</span>"
                      + "<span class=\"invisiable\">"+ pathName + "</span>"
                      + "<span class=\"options\"></span>";

    simpleList.appendChild(newElem);
}

/*----- UI Functions -------*/
	$(document).ready(function () {
	    $(function () {
	        $('.sortable-accordion div').show();
	        $('.sortable-accordion div').slideToggle('slow');
	        $('.sortable-accordion h3').click(function () {
	            $(this).next('.inner').slideToggle().siblings('.inner:visible').slideUp();
	            $(this).toggleClass('current');
	            $(this).siblings('h3').removeClass('current');
	        });
	    });
	    $('.sortable').sortable({ placeholder: 'ui-sortable-placeholder' }).find('li').append('<span class=\'options\'></span>');
	    $('#submenu a').click(function () {
	        return false;
	    });

	    $('.options').click(function () {
	        var childpos = $(this).offset();
	        var parentpos = $(this).parent().offset();
	        var posLeft = childpos.left - parentpos.left;
	        $('#submenu').css({
	            'top': childpos.top - 10 + 'px',
	            'left': posLeft + 420 + 'px'
	        }).fadeIn(200);
	        $('#submenu').mouseleave(function () {
	            $(this).fadeOut(200);
	        });
	    });

	    $('#toggleMenu .list').click(function () {
	        $('#sidebar-menu li span').animate({
	            'opacity': 1,
	            'margin-left': '0px'
	        });
	        $('#sidebar-menu').toggleClass('animate');
	        $('#toggleMenu .list').fadeOut();
	        $('#toggleMenu .thumbs').fadeIn();
	    });
	    $('#toggleMenu .thumbs').click(function () {
	        $('#sidebar-menu li span').css({
	            'opacity': 0,
	            'margin-left': '10px'
	        });
	        $('#sidebar-menu').toggleClass('animate');
	        $('#toggleMenu .thumbs').fadeOut();
	        $('#toggleMenu .list').fadeIn();
	    });
	    $('#sidebar-menu li').click(function () {
	        $('#sidebar-menu li').not(this).removeClass('selected');
	        $(this).toggleClass('selected');
	    });
	    $('#drop-select').click(function () {
	        $('#dropdown-list').toggleClass('animate');
	    });
	    $('#dropdown-list li').click(function () {
	        $('#dropdown-list').removeClass('animate');
	    });
	});
/*----- UI Functions -------*/

