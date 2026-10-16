/**
 * FoodBridge — API Error Formatting and Safe Rendering Utilities
 *
 * Prevents React child render crashes (e.g. Minified React error #31)
 * caused by passing structured API error objects directly into JSX.
 */

/**
 * Extracts a safe, human-readable string message from any API error,
 * structured backend response, Axios error, or exception.
 *
 * Guaranteed to NEVER return an object.
 *
 * @param {unknown} error - The caught error or API response
 * @param {string} [fallbackMessage='An unexpected error occurred. Please try again.']
 * @returns {string} Human-readable error message
 */
export function formatApiError(
  error,
  fallbackMessage = 'An unexpected error occurred. Please try again.'
) {
  if (!error) {
    return fallbackMessage;
  }

  // 1. If error is already a string
  if (typeof error === 'string') {
    const trimmed = error.trim();
    return trimmed.length > 0 ? trimmed : fallbackMessage;
  }

  // 2. Inspect structured response data (Axios error.response?.data or raw response)
  const data = error.response?.data !== undefined ? error.response.data : error.data;

  if (data !== undefined && data !== null) {
    // If response data is a string (e.g., plain text error from backend)
    if (typeof data === 'string') {
      const trimmed = data.trim();
      // Avoid raw HTML error pages (e.g., <!DOCTYPE html>...)
      if (trimmed.length > 0 && !trimmed.startsWith('<')) {
        return trimmed;
      }
    } else if (typeof data === 'object') {
      // Case A: data.error is a string
      if (typeof data.error === 'string' && data.error.trim().length > 0) {
        return data.error.trim();
      }

      // Case B: data.error is a structured object like { code, message }
      if (data.error && typeof data.error === 'object') {
        if (typeof data.error.message === 'string' && data.error.message.trim().length > 0) {
          return data.error.message.trim();
        }
        if (typeof data.error.detail === 'string' && data.error.detail.trim().length > 0) {
          return data.error.detail.trim();
        }
        if (typeof data.error.code === 'string' && data.error.code.trim().length > 0) {
          return `Error: ${data.error.code.trim()}`;
        }
      }

      // Case C: data.message is a string (e.g., standard Spring Boot / REST API format)
      if (typeof data.message === 'string' && data.message.trim().length > 0) {
        return data.message.trim();
      }

      // Case D: data.detail or data.description
      if (typeof data.detail === 'string' && data.detail.trim().length > 0) {
        return data.detail.trim();
      }
      if (typeof data.description === 'string' && data.description.trim().length > 0) {
        return data.description.trim();
      }

      // Case E: Spring Boot / Bean Validation errors array [{ defaultMessage: '...' }, { message: '...' }]
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const first = data.errors[0];
        if (typeof first === 'string' && first.trim().length > 0) {
          return first.trim();
        }
        if (first && typeof first === 'object') {
          const validationMsg = first.defaultMessage || first.message;
          if (typeof validationMsg === 'string' && validationMsg.trim().length > 0) {
            return validationMsg.trim();
          }
        }
      }
    }
  }

  // 3. Inspect direct object properties if error itself has { code, message }
  if (typeof error === 'object') {
    if (typeof error.message === 'string' && error.message.trim().length > 0) {
      // Check for Axios network error
      if (
        error.code === 'ERR_NETWORK' ||
        error.message.toLowerCase().includes('network error')
      ) {
        return 'Cannot connect to the server. Please check your internet connection and verify the backend is running.';
      }

      // If it's a generic Axios status message ("Request failed with status code 403")
      // provide context-aware, user-friendly messages for common HTTP codes
      const status = error.response?.status;
      if (status) {
        if (status === 401) {
          return 'Invalid email or password. Please verify your credentials.';
        }
        if (status === 403) {
          return 'Access forbidden (HTTP 403). The server rejected the login request.';
        }
        if (status === 404) {
          return 'The requested service endpoint was not found (HTTP 404).';
        }
        if (status === 429) {
          return 'Too many login attempts. Please wait a moment and try again.';
        }
        if (status >= 500) {
          return `The backend service encountered an internal error (HTTP ${status}). Please try again later.`;
        }
      }

      // Otherwise return the error.message if it's descriptive
      return error.message.trim();
    }
  }

  // 4. HTTP status fallback if no message was extracted
  const status = error.response?.status;
  if (status) {
    if (status === 401) {
      return 'Invalid email or password. Please verify your credentials.';
    }
    if (status === 403) {
      return 'Access forbidden (HTTP 403). The server rejected the login request.';
    }
    if (status >= 500) {
      return `The server encountered an error (HTTP ${status}). Please try again later.`;
    }
    return `Request failed with status code ${status}.`;
  }

  return fallbackMessage;
}

/**
 * Ensures any value intended for rendering in JSX is a safe string or primitive.
 * Prevents React Error #31: "Objects are not valid as a React child".
 *
 * @param {unknown} value - Value to render safely
 * @param {string} [fallback=''] - Fallback string if value is null, undefined, or an empty object
 * @returns {string} Guaranteed string
 */
export function safeRenderString(value, fallback = '') {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    // If it's an object with a string message (e.g., { code, message } or Error instance)
    if (typeof value.message === 'string' && value.message.trim().length > 0) {
      return value.message.trim();
    }

    // If it's an object with error property
    if (typeof value.error === 'string' && value.error.trim().length > 0) {
      return value.error.trim();
    }

    if (value.error && typeof value.error === 'object' && typeof value.error.message === 'string') {
      return value.error.message.trim();
    }

    // Never return "[object Object]"
    return fallback;
  }

  return String(value);
}
