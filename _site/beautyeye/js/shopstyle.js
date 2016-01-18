/**
 * Created by maniauuuuu on 8/25/15.
 */
var container = document.getElementById("container");
var backgroundImg = document.getElementById("background");

window.onload = function() {
    container.style.top = backgroundImg.offsetTop + "px";
    container.style.left = backgroundImg.offsetLeft + "px";
}