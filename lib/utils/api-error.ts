/**
 * Extract a user-friendly error message from API errors
 */
export function extractApiError(error: any): string {
  // If error is a string
  if (typeof error === "string") {
    return error;
  }

  // If error has a data object with detail
  if (error?.data?.detail) {
    if (typeof error.data.detail === "string") {
      return error.data.detail;
    }
    // If detail is an array of errors
    if (Array.isArray(error.data.detail)) {
      return error.data.detail
        .map((e: any) => e.msg || e.message || e)
        .join(", ");
    }
  }

  // If error has message property
  if (error?.message) {
    return error.message;
  }

  // If error has data with non_field_errors
  if (error?.data?.non_field_errors) {
    if (Array.isArray(error.data.non_field_errors)) {
      return error.data.non_field_errors.join(", ");
    }
    return error.data.non_field_errors;
  }

  // If error data has field-specific errors
  if (error?.data && typeof error.data === "object") {
    const fieldErrors: string[] = [];
    for (const [field, messages] of Object.entries(error.data)) {
      if (Array.isArray(messages)) {
        fieldErrors.push(`${field}: ${(messages as string[]).join(", ")}`);
      } else if (typeof messages === "string") {
        fieldErrors.push(`${field}: ${messages}`);
      }
    }
    if (fieldErrors.length > 0) {
      return fieldErrors.join("; ");
    }
  }

  // Default error message
  return "An unexpected error occurred";
}
