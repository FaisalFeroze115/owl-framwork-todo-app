import { Component, tags, useState, hooks } from "@odoo/owl";
import { Task } from "./components/Task";

const {xml} = tags;
const { useRef } = hooks;

const APP_TEMPLATE = xml /* xml */`
  <div class="todo-app">
      <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
      <div class="task-list">
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
          let id = this.tasks.length + 1;
          let newTask = {
            id: id,
            title: title,
            isCompleted: false,
          }
          this.tasks.push(newTask)
        }
    }
  }

  tasks = useState([
    {
      id: 1,
      title: "buy milk",
      isCompleted: true,
    },
    {
      id: 2,
      title: "clean house",
      isCompleted: false,
    },
    {
      id: 3,
      title: "workout",
      isCompleted: false,
    },
  ]);

  // tasks = [
  //   {
  //     id: 1,
  //     title: "buy milk",
  //     isCompleted: true,
  //   },
  //   {
  //     id: 2,
  //     title: "clean house",
  //     isCompleted: false,
  //   },
  //   {
  //     id: 3,
  //     title: "workout",
  //     isCompleted: false,
  //   },
  // ];
}
