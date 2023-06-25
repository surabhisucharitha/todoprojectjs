let data =[];
let boxId;

function addnewtaskp(){
    const addnewtask=document.getElementById('addnewtaskp');
    const body1=document.getElementById('body1');
    body1.style.filter="blur(6px)";
    addnewtask.style.display ="block";
}
function closenewtaskp(){
    const addnewtask=document.getElementById('addnewtaskp');
    const body1=document.getElementById('body1');
    body1.style.filter="none";
    addnewtask.style.display ="none";
}
function additemsp(id){
    const additems=document.getElementById('additemsp');
    const body1=document.getElementById('body1');
    body1.style.filter="blur(6px)";
    additems.style.display ="block";
    boxId = id;
}
function closeadditemsp(){
    const additems=document.getElementById('additemsp');
    const body1=document.getElementById('body1');
    body1.style.filter="none";
    additems.style.display ="none";
}
function deletetaskbox(id){
    const boxId = `box_${id}`; 
    const box = document.getElementById(boxId);
    box.parentNode.removeChild(box);
    data = data.filter((item) => item.id != id);
}
function AddNewTask(){
    const taskinput=document.getElementById('inputnewtask').value;
    const box={
        id: new Date().getTime().toString(),
        boxHead: taskinput,
        items:[],
    };
    if(taskinput){
        data.push(box);
        showboxs();
    }else{
        alert("Please enter box heading");
    }
    document.getElementById('inputnewtask').value = "";
    closenewtaskp();
}
function showboxs(){
    const mainbox1=document.getElementById('mainbox1');
    let child = "";
    for(let i=0; i < data.length; i++){
        child += `<div id="box_${data[i].id}" class="boxs">
        <h3 value="${data[i].boxHead}" onclick="showbox(${data[i].id}, this.getAttribute('value'))">${data[i].boxHead}</h3>
        <hr>
        <ul id="items_list_${(data[i].id)}">
        </ul>
        <span class="butnsed">
            <button onclick="additemsp(${data[i].id})" class="e">E</button>
            <button onclick="deletetaskbox(${data[i].id})" class="d">D</button>
        </span>
    </div>`;
    }
    mainbox1.innerHTML = child;
    showitems();
}
function showitems(){
    for(let i=0; i<data.length; i++){
        const Ulelement = document.getElementById(`items_list_${(data[i].id)}`);
        let child = "";
        for(let j=0; j<data[i].items.length; j++){
            const items = data[i].items[j];
          child +=`<li class="${items.done ? "done" : ""}" id="items_${items.id}" onclick="doneTask(${items.id}, ${data[i].id})">${items.itemsinput}</li>`;
        }
        Ulelement.innerHTML = child;
    }
}
function AddNewItem(){
    const itemsListId = `items_list_${boxId}`;
    const Ul =document.getElementById(itemsListId); 
    const itemsinput=document.getElementById('inputnewitem').value;
    if(!itemsinput){
        alert("Please enter items");
    }else{
        document.getElementById('inputnewitem').value = "";
        const liNode = document.createElement("li");
        const listId = new Date().getTime().toString();
        liNode.innerHTML = itemsinput;
        liNode.id = `items_${listId}`;
        liNode.onclick = function () {
            doneTask(listId, boxId);
        }
        Ul.appendChild(liNode); 
        closeadditemsp();
        for(let i=0; i<data.length; i++){
            if(data[i].id == boxId){
                const items ={
                    id: listId,
                    itemsinput: itemsinput,
                    done: false,
                }
                data[i].items.push(items);
            } 
        }
    }
}
function doneTask(listId, boxId){
    const itemsId = `items_${listId}`;
    const liElement = document.getElementById(itemsId);
    liElement.classList.toggle("done");
 
    for(let i=0; i< data.length; i++){
        if(data[i].id == boxId){
            for(let j=0; j<data[i].items.length; j++){
                const item = data[i].items[j];
                if(item.id == listId){
                    data[i].items[j].done = !data[i].items[j].done;
                }
            }
        } 
    }
}
function showbox(id, value){
    const cardheading=document.getElementById('cardtask');
    cardheading.innerHTML=value;

    const back=document.getElementById('sf4');
    back.style.display="block";

    const arrow=document.getElementById('sf3');
    arrow.style.display="block";

    const singlebox=document.getElementById(`box_${id}`);

    const boxs=document.querySelectorAll(".boxs");
    boxs.forEach((allboxs) => {
        allboxs.style.display="none";
    });

    singlebox.style.display="block";
}
function back(){
    const cardheading=document.getElementById('cardtask');
    cardheading.innerHTML="";

    const back=document.getElementById('sf4');
    back.style.display="none";

    const arrow=document.getElementById('sf3');
    arrow.style.display="none";

    const boxs=document.querySelectorAll(".boxs");
    boxs.forEach((allboxs) => {
        allboxs.style.display="block";
    });
}