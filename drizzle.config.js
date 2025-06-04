/** @type {import('drizzle-kit').Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_3MEld4WBxhmi@ep-wild-scene-a5n0718m-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
    }
}