import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { RedisLevel } from "upstash-redis-level";
import { GitHubProvider } from "tinacms-gitprovider-github";

// Local mode controlled by TINA_PUBLIC_IS_LOCAL environment variable
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;
const owner = (process.env.GITHUB_OWNER ||
  process.env.VERCEL_GIT_REPO_OWNER) as string;
const repo = (process.env.GITHUB_REPO ||
  process.env.VERCEL_GIT_REPO_SLUG) as string;
const branch = (process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  "main") as string;

if (!branch) {
  throw new Error(
    "No branch found. Make sure that you have set the GITHUB_BRANCH or VERCEL_GIT_COMMIT_REF environment variable."
  );
}

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner,
        repo,
        token,
      }),
      databaseAdapter: new RedisLevel<string, Record<string, unknown>>({
        redis: {
          url:
            (process.env.UPSTASH_REDIS_REST_URL as string) || "http://localhost:8079",
          token: (process.env.UPSTASH_REDIS_REST_TOKEN as string) || "example_token",
        },
        debug: process.env.DEBUG === "true" || false,
      }),
      namespace: branch,
    });
