import { useFormStatus } from "react-dom"

export const SubmitButton = ({ text }: { text: string }) => {
    const { pending } = useFormStatus();
    if (pending) {
        console.log('pending');
    }
    return (
        <button type="submit" disabled={pending}>
            {pending? `Creating ${text}...` : `Create ${text}`}
        </button>
    );
}