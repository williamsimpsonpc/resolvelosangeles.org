function callDateandTime(){
    var currentDate=(new Date()).toLocaleDateString();
    var currentTime=(new Date()).toLocaleTimeString();
    document.getElementById('big').innerHTML=`${currentDate}  ${currentTime} Los Angeles`;
  }
setInterval(function(){  callDateandTime() }, 1000);

function callDateTime(){
    var currentDate=(new Date()).toLocaleDateString();
    var currentTime=(new Date()).toLocaleTimeString();
    document.getElementById('small').innerHTML=`${currentDate}  ${currentTime} LA`;
  }
setInterval(function(){  callDateTime() }, 1000);