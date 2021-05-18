var container = document.getElementById("container");
var radioBlack = document.getElementById("black");
var radioRandom = document.getElementById("random-color")
var clearButton = document.getElementById("clear");
var slider = document.getElementById("myRange");


var n = slider.value;
setBoxes();

clearButton.addEventListener('click',clear);
slider.addEventListener("mousemove",setBoxes);

function createBoxes() {
    for(var i = 0; i < n; i++) {
        var divParent = document.createElement("div");
        divParent.classList.add("row");
        for(var j = 0; j < n; j++) {
            var divElement = document.createElement("div");
            divElement.classList.add("box");
            divParent.appendChild(divElement);
        }
        container.appendChild(divParent);
    }
   
}

function setBoxes() {
    setLabel();
    deleteBoxes();
    createBoxes();
    setBoxSize();
}
function setLabel () {
    var sizeLabel = document.getElementById("size-label");
    n = slider.value;
    sizeLabel.innerHTML = n;
    
}
function deleteBoxes() {
    container.innerHTML = "";
    
}


function setBoxSize() {
    var boxes = document.querySelectorAll(".box");
    boxes.forEach(element => {
    element.style.width = `${600/n}px`;
    element.style.height = `${600/n}px`;
    element.addEventListener("mouseover",() => {
        if(radioBlack.checked){
        element.style.backgroundColor = "black";}
        else{
            element.style.backgroundColor = randomRGB();
        }
    });
});
}
function randomRGB() {
    var R = Math.floor((Math.random()*255)+0);
    var G = Math.floor((Math.random()*255)+0);
    var B = Math.floor((Math.random()*255)+0);
    return `rgb(${R},${G},${B})`;
}
function clear() {
    var boxes = document.querySelectorAll(".box");
    boxes.forEach(element => {
        element.style.backgroundColor = "snow";
    })
}