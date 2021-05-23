
var library = [];

class Book {
    constructor(title, author, pages, status) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
    }
  }
var submit = document.getElementById("submit");
var bookName = document.getElementById("name");
var bookAuthor = document.getElementById("author");
var bookPage = document.getElementById("page");
var bookStatus = document.getElementById("status");
var table = document.getElementById("table");

var readNum = document.getElementById("read");
var unreadNum = document.getElementById("unread");
var totalNum = document.getElementById("total");

submit.addEventListener("click",handleSubmit);
getLocalStorage();
addBooktoTable();

function handleSubmit(e) {
  e.preventDefault();
  addBooktoLibrary();
  addBooktoTable();
  clearInputs();
  countBooks();

}

function addBooktoLibrary() {
  if(bookName.value == "" || bookAuthor.value == "" || bookPage.value == ""){alert("Please fill the form completely");}
  else{
  var book = new Book(bookName.value,bookAuthor.value,bookPage.value,bookStatus.value);
  library.push(book);
  }
}

function clearInputs() {
  bookName.value = "";
  author.value = "";
  page.value = "";  
}

function addBooktoTable(){
 
  table.innerHTML = `<tr> <th>Name</th>
  <th>Author</th>
  <th>Page</th>
  <th>Status</th>
  <th>Remove</th></tr>`;
  
library.forEach(book => {
  
  var condition = (book.status == 'read');
  const row = document.createElement("tr");

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.pages}</td>
  <td>${condition ? '<i title="click to change status" class="fas fa-check-circle statu"></i>':
  '<i title="click to change status" class="fas fa-times-circle statu"></i>'}</td>
  <td><i class = "fas fa-trash"></i></td>
  `;
 
  table.appendChild(row);
  
})
updateLocalStorage();
removeItem();
changeStatus();
countBooks();

}

function changeStatus() {
  
  var statu = document.querySelectorAll(".statu");

      [...statu].forEach((item,i)=>{
        console.log(i);
        item.addEventListener("click",()=>{
          if(library[i].status == "not read"){
            library[i].status = "read";
            addBooktoTable();
          }
          else{
            library[i].status = "not read";
            addBooktoTable();
          }
        })
       
      })
      
    
}

function countBooks(){ 
  var readCounter = 0;
  var unreadCounter = 0;
  library.forEach(item =>{
  
  if(item.status == "read"){ readCounter++;}
  if(item.status == "not read"){ unreadCounter++;}
 });
 readNum.innerHTML = `Books Read: ${readCounter}`;
 unreadNum.innerHTML = `Unread Books: ${unreadCounter}`;
 totalNum.innerHTML = `Total Books: ${library.length}`;
};


function removeItem() {
  var remove = document.getElementsByClassName("fa-trash");
  Object.entries(remove).forEach(icon=>{
    const [key,value] = icon;
    
    value.addEventListener("click",()=>{
    
    library = library.filter((el,index)=>{return index != key});
    addBooktoTable();
    
    });
})
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function getLocalStorage() {
    library = JSON.parse(localStorage.getItem("library"));
}