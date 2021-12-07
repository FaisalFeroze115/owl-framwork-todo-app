import { Component, tags, useState, hooks } from "@odoo/owl";
import { Task } from "./components/Task";

const {xml} = tags;
const { useRef } = hooks;

const APP_TEMPLATE = xml /* xml */`
  <div class="todo-app">
      <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
      <div class="task-list" t-on-toggle-task="toggleTask" t-on-delete-task="deleteTask">
          <div t-foreach="tasks" t-as="task" t-key="task.id">
              <Task task="task"/>
          </div>
      </div>
  </div>`;

export class App extends Component {
  static template = APP_TEMPLATE;
  static components = { Task };

  inputRef = useRef("add-input");

  mounted() {
    this.inputRef.el.focus();
  } 

  addTask(ev) {
    // 13 is keycode for ENTER
    if (ev.keyCode === 13) {
        const title = ev.target.value;
        ev.target.value = "";
        if(title){
          let newTask = {
            id: this.nextId++,
            title: title,
            isCompleted: false,
          }
          this.tasks.push(newTask)
        }
    }
  }

  nextId = 1;

  toggleTask(ev){
    const task = this.tasks.find(t => t.id === ev.detail.id);
    task.isCompleted = !task.isCompleted;
  }

  deleteTask(ev){
    const index = this.tasks.findIndex(t => t.id === ev.detail.id);
    this.tasks.splice(index, 1);
  }

  tasks = useState([]);
}
