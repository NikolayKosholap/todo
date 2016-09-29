var list = document.querySelector('#list ol');
getResult();
function obj(){

    var valueObj = {

    };
    var todoStr = localStorage.getItem('todo');
    if (todoStr !== null) {
        valueObj = JSON.parse(todoStr);    }
    return valueObj;
}

function addTask() {
    var newVal = document.getElementById('headText').value;
    if (!newVal) alert("введіть текст!");
    var valueObj = new obj();
    var iden = 0;
    for(var i = 0; i < list.children.length; i++){
        var newId = list.children[i].getAttribute('id').slice(3);
        if(newId > iden) iden = newId;
    }iden++;
    valueObj[iden] = {};

    valueObj[iden].title = newVal;
    localStorage.setItem('todo', JSON.stringify(valueObj));
    getResult();
}



function getResult() {
    var valueObj = new obj();
    for(var i = 1; i < Object.keys(valueObj).length+1; i++){
        var child = document.createElement('li');
        child.innerHTML = '<div id ="' + 'id_' + i + '" class="delete">X</div><input type="checkbox"/>' + valueObj[i].title;
        child.setAttribute('id', 'id_'+i);
        list.insertBefore(child, list.firstChild);
    }
}

function deleteEl(){
    var getId = this.getAttribute('id');
    var valueObj = obj();
    var idLi = getId + '';
    idLi = document.getElementById(idLi);
    var idRemove = getId.slice(3);
    delete valueObj[idRemove];
    idLi.remove();
    localStorage.setItem('todo', JSON.stringify(valueObj));

    //return getResult();
}
var deleteDiv = document.getElementsByClassName('delete');
for(var i = 0; i < deleteDiv.length; i++){
    deleteDiv[i].addEventListener('click', deleteEl);
}
document.getElementById('form').addEventListener('submit', addTask);


