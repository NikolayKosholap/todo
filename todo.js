function obj(){
    var valueObj = {};
    var todoStr = localStorage.getItem('todo');
    if (todoStr !== null) {
        valueObj = JSON.parse(todoStr);    }
    return valueObj;
}

function addTask() {
    var list = document.querySelector('#list ol');
    var newVal = document.getElementById('headText').value;
    if (!newVal) {
        alert("введіть текст!");
        return false;
    }
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
    var list = document.querySelector('#list ol');
    var valueObj = new obj();
    for(var i = 1; i < Object.keys(valueObj).length+1; i++){
        var child = document.createElement('li');
        child.innerHTML =
            '<div id ="'
            + 'id_'
            + i
            + '" class="delete">X</div><input type="checkbox"/>'
            + valueObj[i].title
            + '<div id ="' + 'id_'
            + i
            + '" class="change">Change</div>';
        child.setAttribute('id', 'id_'+i);
        child.setAttribute('class', 'elem');
        list.insertBefore(child, list.firstChild);
    }
    //call deleteEl
    var callDelete = document.getElementsByClassName('delete');
    for(var i = 0; i < callDelete.length; i++){
        callDelete[i].addEventListener('click', deleteEl);
    }
    //call edit
    var callEdit = document.getElementsByClassName('change');
    for(var i = 0; i < callEdit.length; i++){
        callEdit[i].addEventListener('click',editArea);
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
}

function editArea() {
    var valueObj = new obj();
    var getId = this.getAttribute('id');
    getId = getId+'';
    var getNum = getId.slice(3);
    var linkLi = document.getElementById(getId);
    var parentDiv = linkLi.parentNode;
    var child = document.createElement('li');
    child.innerHTML =
        '<div id ="'
        + 'id_'
        + getNum
        + '" class="delete">X</div><input type="checkbox"/><div id="changeUni" onkeydown="edit(\''
        + getId
        +'\',event)" contenteditable="true">'
        + valueObj[getNum].title
        + '</div>';
    child.setAttribute('id', 'id_'+getNum);
    child.setAttribute('class', 'elem');
    parentDiv.replaceChild(child, linkLi);
}

function edit(getId,e) {
    if(e.keyCode === 13){
        var idNum = getId.slice(3);
        var val = document.getElementById('changeUni').innerHTML;
        var valueObj = obj();
        valueObj[idNum].title = val;
        localStorage.setItem('todo', JSON.stringify(valueObj));
        getResult();
        location.reload();
    }
    return false;
}

window.onload = getResult;