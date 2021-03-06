import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Todo } from "./model";
import { TodoService } from "./todo.service";

@Component({
    selector: 'todo-new',
    styles: [`
        md-input {
            width: 100%;
        }
    `],
    template: `
    <md-card>
        <md-card-title>
            Add your TODO
        </md-card-title>
        <md-card-content>
            <form (ngSubmit)="doSubmit()">
                <md-input [(ngModel)]="data.text" name="text" placeholder="What plan do you have?" required>
                </md-input>

                <md-card-actions align="end">
                    <button md-raised-button
                        color="accent"
                        type="submit"
                        [disabled]="!data.text">
                        Submit
                    </button>
                </md-card-actions>
            </form>
        </md-card-content>
    </md-card>
    `,
})
export class TodoNewComponent implements OnInit {

    data: Todo;

    @Output() added = new EventEmitter<Todo>();

    constructor(public todoService: TodoService) {
    }

    ngOnInit() {
        this.data = {};
    }

    doSubmit() {
        this.todoService.insert(this.data)
            .subscribe(
            todo => {
                this.added.emit(todo);
                this.data = {};
            },
            _err => { }
            );
    }
}
