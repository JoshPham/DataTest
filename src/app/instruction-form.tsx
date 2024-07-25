import { SubmitButton } from "@/components/submit-button";
import { createInstruction, createTodo } from "./actions";
import { TodoFormData } from "@/lib/schema/todos";
import { set } from "zod";


export const InstructionForm = ({
    optimisticTodos,
    setOptimisticTodos,
    todoId 
} : {
    optimisticTodos: any,
    setOptimisticTodos: any,
    todoId: number
}) => {

    return (
    <form onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const formData = new FormData(target as HTMLFormElement);
        
        const valid = TodoFormData.safeParse({
            title: formData.get('text') as string
        });

        if (!valid.success) {
            return;
        }

        setOptimisticTodos({
            action: 'update',
            newTodo: {
                title: formData.get('title') as string,
                instructions: [...optimisticTodos.find((todo: any) => todo.id === todoId).instructions, {
                    text: formData.get('text') as string,
                    todo_id: todoId
                }]
            }
        })

        createInstruction(formData, todoId).then(() => {
            target.reset();
        });
    }}
    className="flex w-[60%] gap-3"
    >
        <input type="text" name="text" className="text-black"/>
        <SubmitButton text="Instruction" />

    </form>
    );
}