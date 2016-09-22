var list = document.querySelector("#list ol");
var idMask = 'id_';
getResult();

function addTask() {
    var value = document.getElementById('headText').value;
    if (!value) alert("введіть текст!");
    addToList(value);
}

function addToList(value) {
    var id = 0;
    for(var i = 0; i < list.children.length; i++){
        var newId = list.children[i].getAttribute('data-item').slice(3);
            if(newId > id) id = newId;
    }id++;
    localStorage.setItem(idMask+id,value);
    var child = document.createElement('li');
    child.innerText = '<div class="delete" id="' + idMask+id +'">X</div>' + value;
    child.setAttribute('id', idMask+id);
    child.setAttribute('data-item', idMask+id);
    list.insertBefore(child, document.body.nextSibling);
}

function getResult() {
    var local = localStorage.length;
    if(local > 0){
        for(var i = 0; i < local; i++){
            var key = localStorage.key(i);
            if(key.indexOf(idMask) == 0){
                var child = document.createElement('li');
                child.innerHTML = '<div class="delete" id="' + key +'">X</div>' +  localStorage.getItem(key);
                child.setAttribute('id', key);
                child.setAttribute('data-item', key);
                list.insertBefore(child, document.body.nextSibling);
            }
        }
    }
}

function deleteEl(){
    var getId = this.getAttribute('id');
    var idLi = getId + '';
    idLi = document.getElementById(idLi);
    localStorage.removeItem(idLi.getAttribute('data-item'));
    idLi.remove();
}
var deleteDiv = document.getElementsByClassName('delete');
    for(var i = 0; i < deleteDiv.length; i++){
        deleteDiv[i].addEventListener('click', deleteEl);
    }


