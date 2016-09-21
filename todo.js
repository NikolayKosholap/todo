var list = document.querySelector("#list ol");
var idMask = 'id_';
function addTask() {
    var value = document.getElementById('headText').value;
    if (!value) alert("введіть текст!");
    addToList(value);
    getResult();
}
function addToList(value) {

    var id = 0;
    for(var i = 0; i < list.children.length; i++){
        var newId = list.children[i].getAttribute('data-item').slice(3);
            if(newId > id) id = newId;
    }
    id++;
    localStorage.setItem(idMask+id,value);
    var child = document.createElement('li');
    child.innerText = value;
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
                child.innerText = localStorage.getItem(key);
                child.setAttribute('data-item', key);
                list.insertBefore(child, document.body.nextSibling);
            }
        }
    }
}


