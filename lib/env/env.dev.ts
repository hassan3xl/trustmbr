// Type-safe environment variable access
// Import this file to access environment variables with validation

const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || "";
};

// Database
export const DATABASE_URL = getEnvVar("DATABASE_URL");

// JWT Authentication
export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const JWT_EXPIRES_IN = getEnvVar("JWT_EXPIRES_IN", false) || "7d";

// App Config
export const APP_URL =
  getEnvVar("NEXT_PUBLIC_APP_URL", false) || "http://localhost:3000";
export const NODE_ENV = getEnvVar("NODE_ENV", false) || "development";
export const IS_DEV = NODE_ENV === "development";
export const IS_PROD = NODE_ENV === "production";

// Validation helper to run at startup
export function validateEnv() {
  const requiredVars = ["DATABASE_URL", "JWT_SECRET"];
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  console.log("✓ Environment variables validated");
}

// Export all env vars as a typed object
export const env = {
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  APP_URL,
  NODE_ENV,
  IS_DEV,
  IS_PROD,
} as const;

export default env;
