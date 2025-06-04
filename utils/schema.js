import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockinterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition").notNull(),
    jobDes: varchar("jobDes").notNull(),
    jopExperience: varchar("jopExperience").notNull(),
    createdBy: varchar("createdBy").notNull(),
    createdAt: varchar("createdAt").notNull(),
    mockId: varchar("mockId").notNull(),
});