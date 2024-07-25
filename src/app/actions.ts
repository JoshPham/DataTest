"use server";

import { db } from "@/lib/db";
import { instructions, TodoFormData, todos } from "@/lib/schema/todos";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type Todo = typeof todos.$inferSelect & {
  instructions: typeof instructions.$inferSelect[];
};

export async function getAllTodos(): Promise<Todo[]> {
  return await db.query.todos.findMany({
    with: {
      instructions: true,
    },
  });
}

export async function createTodo(formData: FormData) {
    try {
      const title = formData.get('title') as string;

      const valid = TodoFormData.safeParse({ title });

      if (!valid.success) {
        return;
      }

      await db.insert(todos).values({ title });
      revalidatePath('/');
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
}

export async function deleteTodo(id: number | undefined) {
  if (!id) {
    return;
  }
  await db.delete(todos).where(eq( todos.id, id ));
  revalidatePath('/');
}

export async function createInstruction(formData: FormData, todo_id: number) {
    try {
      const text = formData.get('text') as string;

      const valid = z.string().min(1).safeParse(text);


      if (!valid.success) {
        return;
      }

      console.log({ text, todo_id });
      await db.insert(instructions).values({ text, todo_id });

      revalidatePath('/');
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
}