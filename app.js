function openFunction() {
    var cards = document.querySelectorAll('.custom-card');
    var sections = document.querySelectorAll('.inside-section');
    var closeButtons = document.querySelectorAll('.close-btn');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            sections[card.id].style.display = 'block';
        });
    });
    closeButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            sections[btn.id].style.display = 'none';
        });
    });
};
openFunction();

function todoTask () {
const formTododo = document.querySelector(".todo-form");
const formInput = document.querySelector(".todo-form-input");
const taskDetails = document.querySelector(".todo-form-text");


let currentTask = [];
const taskContainer = document.querySelector(".task-list");


function renderTasks() {
    let taskRender = "";
    currentTask.forEach((info, index) => {
        taskRender += `<div class="my-10 p-10 justify-center flex grow gap-4 w-5/6 h-32 bg-input justify-between rounded-lg border text-2xl text-black font-bold shadow-xl shadow-gray-500 ml-16">
            <h5 class="text-2xl text-black font-bold">${index + 1}. ${info.task} ------------ <span>${info.details}</span></h5>
            <button class="mark-completed bg-green-500 text-black font-bold text-xl px-4 py-2 rounded-xl shadow-md hover:shadow-lg shadow-gray-800 transition duration-300 active:scale-90" data-index="${index}">Mark as completed</button>
        </div>`;
    });
    let headerHtml = "";
    if (currentTask.length === 0) {
        headerHtml = `<div class="text-4xl text-gray-500 font-bold p-10">No tasks available</div>`;
    } else {
        headerHtml = `<div class="text-2xl text-gray-500 font-bold p-10">You have ${currentTask.length} tasks</div>`;
    }
    taskContainer.innerHTML = headerHtml + taskRender;
    if (currentTask.length > 5) {
        taskContainer.innerHTML += `<div class="text-2xl text-red-500 font-bold p-10">You have more than 5 tasks!</div>`;
    }

    // Add event listeners for "Mark as completed" buttons to delete the task 
    document.querySelectorAll('.mark-completed').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            currentTask.splice(idx, 1);
            localStorage.setItem('task', JSON.stringify(currentTask));
            renderTasks();

        
        });
    });
}


formTododo.addEventListener("submit", function (e) {
    e.preventDefault();
    const task = formInput.value;
    const details = taskDetails.value;
    const addTask = {
        task: task,
        details: details,
    }
    currentTask.push({ ...addTask });
    localStorage.setItem("task", JSON.stringify(currentTask));
    currentTask = JSON.parse(localStorage.getItem("task")) || [];
    formInput.value = "";
    taskDetails.value = "";
    renderTasks();
})
if (localStorage.getItem("task")) {
    currentTask = JSON.parse(localStorage.getItem("task"));
    renderTasks();
} else {
    console.log("task not found");
};

};
todoTask();

function dailyPlanner(){
    var hours = Array.from({ length: 18 }, (_, index) => {
    let startHour = (index + 6) % 24;
    let endHour = (startHour + 1) % 24;
    return `${String(startHour).padStart(2, '0')}:00 - ${String(endHour).padStart(2, '0')}:00`;
});
console.log(hours)

var dayMemory = JSON.parse(localStorage.getItem("dayMemory"))||{}

var wholeDay = ""

hours.forEach((elem,input_id) =>{
    wholeDay+= `<div class=" Daily-box h-[200px] w-[calc(50%-1rem)] bg-indigo-200 rounded-xl p-4 mb-8">
                        <h3 class="text-2xl font-bold text-black mb-2">Task Title</h3>
                        <p class="text-black text-4xl font-bold">${elem}</P>
                        <input id=${input_id} type="text" placeholder="...." value="${dayMemory[input_id] || ''}"
                            class="w-full h-[75px] px-4 text-6xl  mb-4 rounded-lg bg-indigo-400 border text-black font-bold shadow-xl shadow-gray-500 hover:shadow-lg transition duration-300 active:scale-90 outline-2">
                    </div>`
});
document.querySelector(".Daily-plan").innerHTML=wholeDay

var inputID=document.querySelectorAll(".Daily-plan input");
// Set input values from dayMemory after rendering
inputID.forEach((info) => {
    // if (dayMemory[info.id]) {
    //     info.value = dayMemory[info.id];
    // }
    info.addEventListener("input",function(){
        dayMemory[info.id] = info.value
        localStorage.setItem('dayMemory',JSON.stringify(dayMemory))
    })
})


};
dailyPlanner();

