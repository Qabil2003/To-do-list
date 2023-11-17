const inputBox = document.getElementById("input-box");
      const listContainer = document.getElementById("list-container");

      function addTask() {
        if (inputBox.value === "") {
          alert("You must write something!");
        } else {
          let li = document.createElement("li");
          li.innerHTML = inputBox.value;
          listContainer.appendChild(li);
          let span = document.createElement("span");
          span.innerHTML = "\u00d7";
          li.appendChild(span);
        }
        inputBox.value = "";
        saveData();
      }

      const filterButtonButton = document.getElementById("filterButton");
      let isSorted = false;

      const sortTasks = () => {
        const taskList = document.getElementById("list-container");
        const tasks = Array.from(taskList.getElementsByTagName("li"));

        if (isSorted) {
          tasks.sort((a, b) => a.innerText.localeCompare(b.innerText));
          filterButtonButton.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 25 15" fill="none">
          <rect x="2.5" width="2.5" height="12.5" fill="#C4C4C4"/>
          <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)" fill="#C4C4C4"/>
          <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)" fill="#C4C4C4"/>
          <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)" fill="#C4C4C4"/>
          <path d="M3.75 15L0.502405 10.3125L6.9976 10.3125L3.75 15Z" fill="#C4C4C4"/>
        </svg>`;
          isSorted = false;
        } else {
          tasks.sort((a, b) => b.innerText.localeCompare(a.innerText));
          filterButtonButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="15" viewBox="0 0 25 15" fill="none">
          <rect x="5" y="15" width="2.5" height="12.5" transform="rotate(-180 5 15)" fill="#C4C4C4"/>
          <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)" fill="#C4C4C4"/>
          <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)" fill="#C4C4C4"/>
          <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)" fill="#C4C4C4"/>
          <path d="M3.75 6.55671e-07L6.99759 4.6875L0.502404 4.6875L3.75 6.55671e-07Z" fill="#C4C4C4"/>
        </svg>`;
          isSorted = true;
        }

        taskList.innerHTML = "";
        tasks.forEach((listContainer) => {
          taskList.appendChild(listContainer);
        });
        saveData();
      };

      filterButtonButton.onclick = sortTasks;

      listContainer.addEventListener(
        "click",
        function (e) {
          if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
          } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
          }
        },
        false
      );

      function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
      }

      function showTask() {
        listContainer.innerHTML = localStorage.getItem("data");
      }

      showTask();