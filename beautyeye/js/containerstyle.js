/**
 * Created by maniauuuuu on 8/16/15.
 */
var container = document.getElementById("container");
var backgroundImg = document.getElementById("background");
var container2 = document.getElementById('container2');
var mask = document.getElementById('mask');
var tips = document.getElementById('tips');
window.onload = function() {
    containercss();
}

function containercss() {
    container.style.top = backgroundImg.offsetTop + "px";
    container.style.left = backgroundImg.offsetLeft + "px";
    container2.style.top = backgroundImg.offsetTop + "px";
    container2.style.left = backgroundImg.offsetLeft + "px";
    mask.style.left = backgroundImg.offsetLeft - 2 + "px";
    mask.style.top = backgroundImg.offsetTop - 2 + "px";
    tips.style.left = backgroundImg.offsetLeft + 500 +"px";
}
