export class TaskList {
    arrToDo = [];

    //Thêm công việc
    addTask(task) {
        this.arrToDo.push(task);
    };
    //lưu storage
    luuStorage() {
        let setArrToDo = JSON.stringify(this.arrToDo);
        localStorage.setItem('data', setArrToDo);
    };
    layStorage() {
        if (localStorage.getItem('data')) {
            this.arrToDo = JSON.parse(localStorage.getItem('data'))
        }
    };
    
    //Lọc công việc
    filterTaskProgress() {
        return this.arrToDo.filter((task) => {
            if (task.description === "inProgress") {
                return true;
            };
            return false;
        });
    };
    //In dữ liệu
    renderTaskToDo(id) {
        let html = this.filterTaskProgress().reduce((content, prod) => {
            return content += `
            <li class="d-flex">
                <p>${prod.id}</p>
                <div class="buttons">
                    <span class="far fa-trash-alt remove" onclick="removeTask('${prod.id}')"></span>
                    <span class="fas fa-check-circle complete" onclick="completeTask('${prod.id}')"></span>
                </div>
            </li>   
        `
        }, "")
        document.getElementById(id).innerHTML = html;
    }
    //Tìm vị trí
    timIndex(task) {
        let index = -1;
        this.arrToDo.forEach((prod, i) => {
            if (prod.id === task) {
                index = i;
            }
        });
        return index;    
    };

    // Xoá
    deleteTask(task){
        let index = this.timIndex(task);
        console.log(index);
        if (index !== -1) {
            this.arrToDo.splice(index, 1);
        };
    }
   
    //Hoàn thành
    //Trạng thái hoàn thành

    addDescriptionDoing(task) {
        this.arrToDo.forEach((prod) => {
            if (prod.id === task) {
                prod.description = "inProgress";
            }
        })
    };
    addDescription(task) {
        this.arrToDo.forEach((prod) => {
            if (prod.id === task) {
                prod.description = "complete";
            }
        })
    };
    //Lọc trạng thái đã hoàn thành
    filterTaskComp() {
        return this.arrToDo.filter((task) => {
            if (task.description === "complete") {
                return true;
            };
            return false;
        });
    };
    //Lấy dữ liệu in ra màn hình
    renderTaskComplete(id) {
        let html = this.filterTaskComp().reduce((content, prod) => {
            content += `
            <li class="d-flex">
                <p>${prod.id}</p>
                <div class="buttons">
                    <span class="far fa-trash-alt remove" onclick="removeTask('${prod.id}')"></span>
                    <span class="fas fa-check-circle complete" style="color:blue;" onclick="returnTask('${prod.id}')"></span>
                </div>
            </li>   
        `
            return content;
        }, "");
        document.getElementById(id).innerHTML = html;
    }

    sortUp() {
        this.arrToDo.sort((task1, task2) => {
        return task1.id - task2.id;
        });
    }

    sortDown() {
        this.sortUp();
        this.arrToDo.reverse();
    }
};
