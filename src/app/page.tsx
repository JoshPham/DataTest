import { TodosList } from "./todos-list";
import { unstable_noStore } from "next/cache";
import { getAllTodos } from "./actions";


export default async function Home() {
  unstable_noStore();

  const data = await getAllTodos();

  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <div className='w-[50%]'>
        <TodosList todos={data} />
      </div>
    </div>
  );
}
