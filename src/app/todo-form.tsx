import { SubmitButton } from "@/components/submit-button";
import { createTodo } from "./actions";
import { TodoFormData } from "@/lib/schema/todos";


export const TodoForm = ({
    setOptimisticTodos 
} : {
    setOptimisticTodos: any
}) => {

    return (
    <form onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const formData = new FormData(target as HTMLFormElement);
        
        const valid = TodoFormData.safeParse({
            title: formData.get('title') as string
        });

        if (!valid.success) {
            return;
        }

        setOptimisticTodos({
            action: 'insert',
            newTodo: {
                title: formData.get('title') as string,
                instructions: []
            }
        });

        createTodo(formData).then(() => {
            target.reset();
        });
    }}
    className="flex w-[60%] gap-3"
    >
        <input type="text" name="title" className="text-black"/>
        <SubmitButton text="Todo" />

    </form>
    );
}