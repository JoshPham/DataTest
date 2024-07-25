"use client";

import { instructions, TodoFormData, todos } from "@/lib/schema/todos";
import { createTodo, deleteTodo } from "./actions";
import { useOptimistic, useRef, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { TodoForm } from "./todo-form";
import { InstructionForm } from "./instruction-form";


type TodoProps = typeof todos.$inferInsert & {
    instructions: typeof instructions.$inferInsert[];
};
type InstructionProps = typeof instructions.$inferInsert;

export const TodosList = ({
    todos
} : {
    todos: TodoProps[]
}) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos,
        (state, { action, newTodo } : { action: string, newTodo: TodoProps}) => {
            switch (action) {
                case 'insert':
                    return [...state, newTodo];
                case 'update':
                    return state.map(todo => todo.id === newTodo.id ? newTodo : todo);
                case 'delete':
                    return state.filter(todo => todo.id !== newTodo.id);
                default:
                    return state;
            }
        }
    );

    const [todoId, setTodoId] = useState<number | null>(null);
    
    const instructionButton = () => {
        console.log('instruction button');
    }


    return (
        <div className="flex flex-col">
            <div className="flex">
                <TodoForm setOptimisticTodos={setOptimisticTodos} />
                {todoId && 
                    <InstructionForm optimisticTodos={optimisticTodos} setOptimisticTodos={setOptimisticTodos} todoId={todoId} />
                }
            </div>
            <ul className="list-disc flex flex-col gap-2 p-4">
                {optimisticTodos?.map((todo) => (
                    <li key={todo.id} className="">
                        <div className="flex justify-between">
                            <p>{todo.title}</p>
                            <div className="flex gap-12">
                                {todoId === todo.id ? 
                                    <button onClick={() => setTodoId(null)}>Close</button> :
                                    <button onClick={() => setTodoId(todo.id as number)}>Add Instruction</button>
                                }
                                <form action={async () => {
                                        setOptimisticTodos({
                                            action: 'delete',
                                            newTodo: todo
                                        });
                                        deleteTodo(todo.id);
                                    }}>
                                    <button type="submit">x</button>
                                </form>
                            </div>
                        </div>
                        {todo.instructions?.map((instruction) => (
                            <p key={instruction.id} className="pl-4"> - {instruction.text}</p>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    )
}
