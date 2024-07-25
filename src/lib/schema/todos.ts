import { pgTable, text, integer, serial} from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { z } from "zod";

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
})

export const TodoFormData = z.object({
    title: z.string().min(1),
})

export const instructions = pgTable("instructions", {
    id: serial("id").primaryKey(),
    text: text("title").notNull(),
    todo_id: integer("todo_id").references(() => todos.id, {onDelete: 'cascade'}).notNull()
})

export const todosRelations = relations(todos, ({ many }) => ({
    instructions: many(instructions)
}));

export const instructionsRelations = relations(instructions, ({ one }) => ({
    todo: one(todos, {
        fields: [instructions.todo_id],
        references: [todos.id],
    })
}));