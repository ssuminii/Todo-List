// delete버튼을 누르면 할일이 삭제
// check 버튼을 누르면 할일이 끝나면서 줄쳐짐
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
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    render();
}

// 할일 List 화면에 표시
function render() {
    let resultHTML = "";

    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button type="button">Check</button>
            <button type="button">Delete</button>
        </div>
    </div>`;
    }

    document.getElementById('task-board').innerHTML = resultHTML;
}