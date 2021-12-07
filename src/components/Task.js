import { Component, useState, tags } from "@odoo/owl";

const {xml} = tags;

const TASK_TEMPLATE = xml /* xml */`
    <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask"/>
        <span><t t-esc="props.task.title"/></span>
    </div>`;

export class Task extends Component {
    static template = TASK_TEMPLATE;
    static props = ["task"];
    toggleTask(){
      this.trigger('toggle-task',{id: this.props.task.id})
    }
}
