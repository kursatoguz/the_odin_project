const addListButton = document.getElementById("add-list-button");
const lists = document.getElementById("lists");
const addTaskButton = document.getElementById("add-task-button");
const tasks = document.getElementById("tasks");

getLocalStorageForList();
getLocalStorageForTasks();
addListButton.addEventListener("click", addListFolder);
addTaskButton.addEventListener("click", addTask);

function addListFolder() {
  var listName = document.getElementById("add-list");
  if (listName.value === "") {
    alert("Please enter list name.");
  } else if (!checkName(listName.value)) {
    alert("Folder Names Can Not be the same");
  } else {
    folder = `<div class="list-folder"><div class="list-name">${listName.value}</div><div class="delete-folder">X</div></div>`;
    lists.innerHTML += folder;
    createContentBox(listName.value);
    activateList();
    deleteFolder();
    updateLocalStorage();
  }

  listName.value = "";
}

function createContentBox(listname) {
  var div = document.createElement("div");
  div.className = "task-flex";
  div.id = listname;
  tasks.appendChild(div);
}

function activateList() {
  var listNames = document.getElementsByClassName("list-folder");
  for (var i = 0; i < listNames.length; i++) {
    listNames[i].addEventListener("click", function (e) {
      removeActivatedLists();
      e.currentTarget.classList.add("active");
      showList();
    });
  }
}

function removeActivatedLists() {
  var listNames = document.getElementsByClassName("list-folder");
  for (var i = 0; i < listNames.length; i++) {
    listNames[i].classList.remove("active");
  }
  updateLocalStorage();
}

function showList() {
  getLocalStorageForTasks();
  var contents = document.getElementsByClassName("task-flex");
  for (let i = 0; i < contents.length; i++) {
    contents[i].style.display = "none";
  }
  var taskName = findActiveTask();
  if (taskName != null && taskName != undefined) {
    taskName.style.display = "block";
  }
  deleteFolder();
}
function addTask() {
  // findActivelist --> add innerHTML
  var task = document.getElementById("task-input");
  if (task.value == "") alert("Please enter a task to do");
  else {
    var list = findActiveTask();
    if (list != undefined) {
      list.innerHTML += `<div class="flex-items">
    <li><i class="far fa-circle"></i>${task.value}</li><i class="fas fa-trash"></i></div> `;
      updateLocalStorage();
    }
    task.value = "";
    deleteTask();
    completedTask();
    deleteFolder();
  }
}
//find current folder
function findActiveTask() {
  var activeList = document.getElementsByClassName("active");
  var listNames = document.getElementsByClassName("list-folder");
  // console.log(activeList[0]);
  if (activeList[0] === undefined && listNames.length !== 0) {
    listNames[0].classList.add("active");
    showList();
  } else if (activeList[0] === undefined) {
    alert("No folders left");
  } else {
    var contentFolderName = activeList[0].firstChild.innerHTML;
    var taskName = document.getElementById(contentFolderName);
    // console.log(taskName);
    return taskName;
  }
}

//DELETE TASK
function deleteTask() {
  const trashButton = document.getElementsByClassName("fa-trash");
  for (var i = 0; i < trashButton.length; i++) {
    trashButton[i].addEventListener("click", function (e) {
      e.currentTarget.parentElement.remove();
      updateLocalStorage();
    });
  }
}
function deleteFolder() {
  const deleteButtons = document.getElementsByClassName("delete-folder");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function (e) {
      var folderName = deleteButtons[i].parentElement.firstChild.innerHTML;
      console.log(folderName);
      var tasksToDelete = document.getElementById(folderName);
      if (tasksToDelete != null) {
        tasksToDelete.remove();
      }
      e.currentTarget.parentElement.remove();
      updateLocalStorage();
    });
  }
}
//Complete Task
function completedTask() {
  const circleButton = document.getElementsByClassName("fa-circle");
  for (var i = 0; i < circleButton.length; i++) {
    circleButton[i].addEventListener("click", function (e) {
      if (
        e.currentTarget.parentElement.style.textDecoration == "line-through"
      ) {
        e.currentTarget.parentElement.style.textDecoration = "none";
      } else {
        e.currentTarget.parentElement.style.textDecoration = "line-through";
      }
      updateLocalStorage();
    });
  }
}

// check folder names are different for id's
function checkName(inp) {
  var names = document.getElementsByClassName("list-name");
  var val = true;
  for (var i = 0; i < names.length; i++) {
    if (names[i].innerHTML == inp) {
      val = false;
    }
  }
  return val;
}

function updateLocalStorage() {
  localStorage.setItem("list", JSON.stringify(lists.innerHTML));
  localStorage.setItem("tasks", JSON.stringify(tasks.innerHTML));
}

function getLocalStorageForList() {
  lists.innerHTML = JSON.parse(localStorage.getItem("list"));
  if (lists.innerHTML != "") {
    activateList();
  }
}
function getLocalStorageForTasks() {
  tasks.innerHTML = JSON.parse(localStorage.getItem("tasks"));
  deleteTask();
  completedTask();
}
