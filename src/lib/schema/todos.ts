import { pgTable, text, integer, serial} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: text("title"),
})