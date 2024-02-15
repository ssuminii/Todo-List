// 유저가 할일을 입력
let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let tabs = document.querySelectorAll(".task-tabs div");
let taskList =[];
let mode = 'all';
let filterList = [];

// underLine animation
let underLine = document.getElementById('under-line');

addButton.addEventListener('click', addTask);

// Enter 누르면 아이템 추가
taskInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
}

// 입력한 할 일이 없다면 아이템이 추가 ❌
taskInput.addEventListener('input', function() {
    addButton.disabled = taskInput.value === '';
});


// 진행중 끝남 탭을 누르면 언더바 이동
for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(e){filter(e)});
}

// + 버튼을 누르면 할일이 추가
function addTask() {
    if (taskInput.value !== ''){
        let task = {
            id: randomIDGeneration(),
            taskContent: taskInput.value,
            isComplete: false,
        };
        taskList.push(task);
        console.log(taskList);
        render();
        
        // 버튼 비활성화
        addButton.disabled = true;

        // 할 일 입력후 입력창 자동으로 비워지게 하기
        taskInput.value ='';
    }
}


// 할일 List 화면에 표시
// ui 함수 
function render() {
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    // 2. list를 다르게 보여준다
    // ex) all -> taskList, active, done -> filterList
    if (mode === "all") {
        list = taskList;
    } else if (mode === "active" || mode === "done") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        // 2) ture이면 끝난 걸로 간주하고 밑줄 보여주기
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button type="button" class="button-16" onclick="toggleComplete('${list[i].id}')">Check</button>
            <button type="button" class="button-16" onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
    // 3) false이면 안끝난 걸로 간주하고 그대로
        } else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button type="button" class="button-16" onclick="toggleComplete('${list[i].id}')">Check</button>
            <button type="button" class="button-16" onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;


}

// check button
// check 버튼을 누르면 할일이 끝나면서 줄쳐짐
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        // 1) check 버튼을 클릭하는 순간 false -> true
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

// delete button
// delete버튼을 누르면 할일이 삭제
function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function filter(e) {
    // UnderLine event
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

    mode = event.target.id;
    filterList = [];
    if (mode === "all") {
        // 전체 리스트를 보여줌
        render();
    } else if (mode === "active") {
        // 진행중인 아이템을 보여줌
        // task.isComplete = false 
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    } else if (mode === "done") {
        // 끝나는 케이스 
        // task.isComplete = true (checked) 
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("done",filterList);
    }
}

// random ID
function randomIDGeneration() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
