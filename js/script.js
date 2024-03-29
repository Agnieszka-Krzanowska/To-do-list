{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done && hideDoneTask ? "taskItem--hidden" : ""}">
              <button class="button__done js-done">
                ${task.done ? "&#10004;" : ""}
              </button>
              <span class="${task.done ? "list__item--done" : ""}">
                ${task.content}
              </span>
              <button class ="button__remove js-remove">&#128465</button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = ""
        const buttons = document.querySelector(".js-buttons")

        if (tasks.length === 0) {

            buttons.innerHTML = "";

        } else {

            htmlButtons += `
                <button class="button__hideDone buttons__button">
                  ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button class="button__completeAll buttons__button"
                  ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie
                </button>
        `;
        };
        buttons.innerHTML = htmlButtons;
    };

    const completeAll = () => {
        tasks = tasks.map((task) => (
            { ...task, done: true }
        ));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };


    const bindButtonsEvents = () => {
        const button__completeAll = document.querySelector(".button__completeAll");

        if (button__completeAll) {
            button__completeAll.addEventListener("click", completeAll);
        }

        const button__hideDone = document.querySelector(".button__hideDone");

        if (button__hideDone) {
            button__hideDone.addEventListener("click", toggleHideDoneTasks);
        }
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskElement = document.querySelector(".js-newTask");

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };

        newTaskElement.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}