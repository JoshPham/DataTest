'use client';

import { useOptimistic } from 'react';
import { send } from './actions';

type Message = {
  message: string;
};

export default function Thread({ messages }: { messages: Message[] }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages || [], (state, newMessage) => [...(state || []), { message: newMessage }]);

  console.log("Postgres URL:", process.env.POSTGRES_URL);
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <div className='w-[20%]'>
        <form
          action={async (formData: FormData) => {
            const message = formData.get('message') as string;
            addOptimisticMessage(message);
            await send({title: message});
          }}
          className='flex flex-col align-baseline gap-3'
        >
          <input type="text" name="message" className='text-black'/>
          <button type="submit">Send</button>
        </form>
        <div>
          {optimisticMessages.map((m, k) => (
            <div key={k}>{m.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
