var form = document.querySelector("#my-form");

form.addEventListener("submit", saveToLocalStorage);

function saveToLocalStorage(e) {
  e.preventDefault();
  const todo = e.target.itemName.value;
  const description = e.target.description.value;
  const obj = {
    todo,
    description,
    isdone : false
  };
  axios
    .post(
      "https://crudcrud.com/api/844c927a4c9d4015a9c63968ed0ab494/todoData",
      obj
    )
    .then((response) => {
      showTodoRemaining(response.data);
    })
    .catch((err) => console.log(err));
}


window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(
        "https://crudcrud.com/api/844c927a4c9d4015a9c63968ed0ab494/todoData"
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          showTodoRemaining(response.data[i]);
        }
      })
      .catch((err) => console.log(err));
  });

function showTodoRemaining(user) {
  const parentNode = document.getElementById("users");
  const childNode = `<li id=${user.description}> ${user.todo}- ${user.description}
    <button class = "delete" onclick=Crossitem('${user.description}')>X</button> 
    <button class = "edit"  onclick=TickItem('${user.todo}','${user.description}','${user._id}')>&#x2713</button>
    </li>`;
   parentNode.innerHTML = parentNode.innerHTML + childNode;
}
function Crossitem(udescription) {
  removeItemsFromScreen(udescription);
}

function TickItem(itodo, idescription, id) {
  axios.put(`https://crudcrud.com/api/844c927a4c9d4015a9c63968ed0ab494/todoData/${id}`,{
     todo : itodo,
     description: idescription,
     isdone : true
  })
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err));
  axios
      .get(
        "https://crudcrud.com/api/844c927a4c9d4015a9c63968ed0ab494/todoData"
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          showTodoDone(response.data[i]);
        }
      })
      .catch((err) => console.log(err));
   Crossitem(idescription);
}


function showTodoDone(user){
    const parentNode = document.getElementById("users2");
    const childNode = `<li id=${user.description}> ${user.todo}- ${user.description}
    <button class = "delete" onclick=Crossitem('${user.description}')>X</button> 
    </li>`;
   parentNode.innerHTML = parentNode.innerHTML + childNode;
}

function removeItemsFromScreen(idescription) {
  const parentNode = document.getElementById("users");
  const childNode = document.getElementById(idescription);
  if (childNode) {
    parentNode.removeChild(childNode);
  }
}
