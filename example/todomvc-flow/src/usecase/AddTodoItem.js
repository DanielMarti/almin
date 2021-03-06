// @flow
"use strict";
import {UseCase} from "almin";
import todoListRepository, {TodoListRepository} from "../infra/TodoListRepository"
import TodoItem from "../domain/TodoList/TodoItem";
export class AddTodoItemFactory {
    static create(): AddTodoItemUseCase {
        return new AddTodoItemUseCase({
            todoListRepository
        });
    }
}

export class AddTodoItemUseCase extends UseCase {
    todoListRepository: TodoListRepository;

    /**
     * @param {TodoListRepository} todoListRepository
     */
    constructor({todoListRepository}: {todoListRepository: TodoListRepository}) {
        super();
        this.todoListRepository = todoListRepository;
    }

    execute(title: string): void {
        // Get todoList from repository
        const todoList = this.todoListRepository.lastUsed();
        // Create TodoItem
        const todoItem: TodoItem = new TodoItem({title});
        // Add TodoItem
        todoList.addItem(todoItem);
        // Save todoList to  repository
        this.todoListRepository.save(todoList);
    }
}
