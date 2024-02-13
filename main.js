// delete버튼을 누르면 할일이 삭제
// check 버튼을 누르면 할일이 끝나면서 줄쳐짐
// 1) check 버튼을 클릭하는 순간 false -> true
// 2) ture이면 끝난 걸로 간주하고 밑줄 보여주기
// 3) false이면 안끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면 언더바 이동
// done탭은 끝난 아이템만, active 탭은 진행중인 아이템만
// All 탭을 누르면 모든 아이템 보여주기

// 유저가 할일을 입력
let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList =[];

addButton.addEventListener('click', addTask);

// + 버튼을 누르면 할일이 추가
function addTask() {
    let task = {
        id: randomIDGeneration(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

// 할일 List 화면에 표시
// ui 함수 
function render() {
    let resultHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="task-done">${taskList[i].taskContent}</div>
        <div>
            <button type="button" onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button type="button" onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
    </div>`;
        } else {
            resultHTML += `<div class="task">
        <div>${taskList[i].taskContent}</div>
        <div>
            <button type="button" onclick="toggleComplete('${taskList[i].id}')">Check</button>
            <button type="button" onclick="deleteTask('${taskList[i].id}')">Delete</button>
        </div>
    </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}

// check button 
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

// delete button
function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

// random ID
function randomIDGeneration() {
    return '_' + Math.random().toString(36).substr(2, 9);
}
