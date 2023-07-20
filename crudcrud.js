var form = document.getElementById("my-form");





form.addEventListener("submit", saveToCrudCrud);


// saveTo crud api on submit event

function saveToCrudCrud(e) {
  e.preventDefault();
  const name = e.target.userName.value;
  const email = e.target.emailId.value;
  const phone = e.target.phoneNumber.value;
  const obj = {
    name,
    email,
    phone,
  };
  axios
    .post(
      "https://crudcrud.com/api/5ebdc3aeb17a4764b0d6f6edfecadcfc/appointmentData",
      obj
    )
    .then((response) => {
      showNewUserOnScreen(response.data);
    })
    .catch((err) => console.log(err));
}





window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/5ebdc3aeb17a4764b0d6f6edfecadcfc/appointmentData"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        showNewUserOnScreen(response.data[i]);
      }
    })
    .catch((err) => console.log(err));
});


// showing user on the screen 

function showNewUserOnScreen(user) {
  const parentNode = document.getElementById("users");
  const childNode = `<li id=${user.email}>userName=${user.name} <br> userEmail=${user.email} <br> userPhone=${user.phone} 
      <button class = "delete" onclick=deleteUser('${user.email}','${user._id}')>Delete </button> 
      <button class = "edit"  onclick=editUser('${user.name}','${user.email}','${user.phone}','${user._id}')>Edit </button>
      </li>`;
  parentNode.innerHTML = parentNode.innerHTML + childNode;
}


// delete funcionality 

function deleteUser(emailId, userId) {
  axios
    .delete(
      `https://crudcrud.com/api/5ebdc3aeb17a4764b0d6f6edfecadcfc/appointmentData/${userId}`
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
   removeUserFromScreen(emailId);
}


// edit functionality


function editUser(userName, emailId, phoneNumber, userId) {
  document.getElementById("name").value = userName;
  document.getElementById("email").value = emailId;
  document.getElementById("phone").value = phoneNumber;
  deleteUser(emailId, userId);
}


// removing user from screen 

function removeUserFromScreen(emailId) {
  const parentNode = document.getElementById("users");
  const childNode = document.getElementById(emailId);
  if (childNode) {
    parentNode.removeChild(childNode);
  }
}
