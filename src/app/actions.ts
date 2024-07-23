"use server";

import { db } from "@/lib/db";
import { todos } from "@/lib/schema/todos";

type Todo = typeof todos.$inferInsert;

export async function send({ title }: Todo) {
    try {
      console.log('Sending message:', title);

      await db.insert(todos).values({ title: title });
  
      return { success: true };
    } catch (error) {
      console.error('Error sending message:', error);
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }