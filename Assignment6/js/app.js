// function to add item into todo list
const addContent = (todolist = []) => {
    const div = document.getElementById('toDoList');
    div.classList.add("toDoList");
    todolist.forEach(todoItem => addItem(todoItem.title, todoItem.description, todoItem.due_date, todoItem.time , todoItem.status , div));
};

//  fuction to create todo item 
const addItem = (title, description, due_date, time, status, parent) => {

    // creating div that has to do title and todo description
    const divList = document.createElement('div');
    divList.classList.add('divList');


    // 1st div class that has title and mark, update, delete
    const divTitle = document.createElement('div');
    divTitle.classList.add('divTitle');

    const paraDiv = document.createElement('div');
    paraDiv.className = 'paraDiv';

    //Creating para for title
    const para = document.createElement('p');
    para.className ='para';
    para.textContent = `${title}`;
    paraDiv.append(para);

    //Creating mark div
    const markDiv = document.createElement('div');
    markDiv.className = 'markDiv';

    //Adding mark icon
    var markImg = document.createElement('img');
    markImg.src = "./assets/images/mark.png";
    markImg.className = "markImg";
    markDiv.appendChild(markImg);


    //Creating update div
    const updateDiv = document.createElement('div');
    updateDiv.className = 'updateDiv';

    //Adding update icon
    var updateImg = document.createElement('img');
    updateImg.src = "./assets/images/edit.png";
    updateImg.className = "updateImg";
    updateDiv.appendChild(updateImg);

    
    //Creating close div
    const closeDiv = document.createElement('div');
    closeDiv.className = 'closeDiv';

    //Adding close icon

    var deleteImg = document.createElement('img');
    deleteImg.src = "./assets/images/delete1.png";
    deleteImg.className = "deleteImg";
    closeDiv.appendChild(deleteImg);

    // appending all to div title class
    divTitle.appendChild(paraDiv);
    divTitle.appendChild(markDiv);
    divTitle.appendChild(updateDiv);
    divTitle.appendChild(closeDiv);

    divList.appendChild(divTitle)


    // creating div that has todo details
    const todoItemDiv = document.createElement('div');
    todoItemDiv.classList.add('todoDescription');

    // creating div that has todo description heading
    const todoItemDescription = document.createElement('div');
    todoItemDescription.classList.add("todoItemHeading");
    todoItemDescription.textContent = "Description";

    // creating div that has todo due date and time heading
    const todoItemDueDate = document.createElement('div');
    todoItemDueDate.classList.add("todoItemHeading");
    todoItemDueDate.textContent = "Due Date and Time";

    // creating div that has todo status heading
    const todoItemStatus = document.createElement('div');
    todoItemStatus.classList.add("todoItemHeading");
    todoItemStatus.textContent = "Status";

    // creating div that has todo description value
    const todoItemDescription1 = document.createElement('div');
    todoItemDescription1.classList.add("todoItemDetails");
    todoItemDescription1.textContent = `${description}`;

    // creating div that has todo due date and time value
    const todoItemDueDate1 = document.createElement('div');
    todoItemDueDate1.classList.add("todoItemDetails");
    todoItemDueDate1.textContent = `${due_date}, at ${time}`;

    // creating div that has todo status value
    const todoItemStatus1 = document.createElement('div');
    todoItemStatus1.classList.add("todoItemDetails");
    todoItemStatus1.textContent = `${status}`;


    todoItemDiv.appendChild(todoItemDescription);
    todoItemDiv.appendChild(todoItemDueDate);
    todoItemDiv.appendChild(todoItemStatus);
    todoItemDiv.appendChild(todoItemDescription1);
    todoItemDiv.appendChild(todoItemDueDate1);
    todoItemDiv.appendChild(todoItemStatus1);


    divList.appendChild(todoItemDiv);

    // Onclick Method for para
    para.addEventListener('click', function() {
        this.classList.toggle('active');
        if(todoItemDiv.style.display === "grid")
            todoItemDiv.style.display = "none";
        else
            todoItemDiv.style.display = "grid";
    })

    // if status is closed, mark it as complete
    if(status=='closed')
        para.style.textDecoration = "line-through";

    // Marking task as complete
    markImg.addEventListener('click', function() {
        if(para.style.textDecoration === "line-through") {
            todoItemStatus1.textContent = "open";
            para.style.textDecoration = "none";

        }
        else{
            todoItemStatus1.textContent = "close";
            para.style.textDecoration = "line-through";
        }
    });

    //Deleting task
    deleteImg.addEventListener('click', function() {
        divList.style.display = 'none';
    });


    parent.appendChild(divList);
}

// To fetch data from json file
const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(response)  {
        if(this.status === 200 ) {
            const data = this.responseText;
            const todolist = JSON.parse(data);
            addContent(todolist);
        }
    });
    xhr.open('GET', 'data/todo.json');
    xhr.send();
}

// Add add task popup 
const addTask = document.getElementById('addTask');
addTask.addEventListener('click', function() {
document.body.classList.add('showAddTask');
});

// close add task popup menu
const closeButton = document.getElementById('closeAdd');
closeButton.addEventListener('click', function() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('date').value = "";
    document.getElementById('time').value = "";
    document.getElementById("status").value = "open";
    document.body.classList.remove('showAddTask');

})


// Add button to submit the task
const addButton = document.getElementById('AddButton');
addButton.addEventListener('click', function(event) {
    // collecting use entered value
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const status = document.getElementById("status").value;

    // current date and time
    var d = new Date();
    var dd = ('0' + d.getDate()).slice(-2);
    var mm = ('0' + (d.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = d.getFullYear();

    var today = yyyy + '-' + mm + '-' + dd;
    var todayTime = d.getHours() + ":" + d.getMinutes();

    // tilte is required
    if(title === "" || date==="" ||  time ==="") {
        return false;
    }
    // date should not be less than current date
    else if(date < today) {
        alert("Please Enter Valid Date");
        event.preventDefault();
        return false;
    }
    else if(date === today && time<= todayTime) {
        alert("Please Enter Valid Time");
        event.preventDefault();
        return false; 
    }
    else {
        const div = document.getElementById('toDoList');
        addItem(title, description, date, time , status, div);
    
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('date').value = "";
        document.getElementById('time').value = "";
        document.getElementById("status").value = "open";
        document.body.classList.remove('showAddTask');
    }
})

// Loading the to-do task while loading page
window.addEventListener('load', fetchData);

