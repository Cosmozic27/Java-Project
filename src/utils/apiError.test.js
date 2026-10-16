import assert from 'node:assert';
import { formatApiError, safeRenderString } from './apiError.js';

console.log('--- Testing API Error Formatting & Safe String Rendering ---');

// Test 1: The exact error shape reported by user: object with keys {code, message}
const structuredErrorObj = {
  response: {
    data: {
      error: { code: 'UNAUTHORIZED', message: 'Invalid credentials provided.' },
    },
    status: 401,
  },
};
const result1 = formatApiError(structuredErrorObj);
assert.strictEqual(typeof result1, 'string');
assert.strictEqual(result1, 'Invalid credentials provided.');
console.log('✓ Test 1 Passed: Extracted message from { error: { code, message } }');

// Test 2: Direct object with { code, message } in response data
const directDataObj = {
  response: {
    data: { code: 403, message: 'Forbidden access to resource.' },
    status: 403,
  },
};
const result2 = formatApiError(directDataObj);
assert.strictEqual(typeof result2, 'string');
assert.strictEqual(result2, 'Forbidden access to resource.');
console.log('✓ Test 2 Passed: Extracted message from direct { code, message } data');

// Test 3: Actual production response: HTTP 403 Forbidden with empty body (Content-Length: 0)
const production403EmptyBody = {
  response: {
    status: 403,
    statusText: 'Forbidden',
    data: '',
  },
  message: 'Request failed with status code 403',
};
const result3 = formatApiError(production403EmptyBody);
assert.strictEqual(typeof result3, 'string');
assert.ok(result3.includes('403') || result3.includes('forbidden') || result3.includes('Forbidden'));
console.log('✓ Test 3 Passed: Handled production HTTP 403 with empty body safely:', result3);

// Test 4: Network failure
const networkFailure = {
  code: 'ERR_NETWORK',
  message: 'Network Error',
};
const result4 = formatApiError(networkFailure);
assert.strictEqual(typeof result4, 'string');
assert.ok(result4.toLowerCase().includes('connect') || result4.toLowerCase().includes('backend'));
console.log('✓ Test 4 Passed: Handled ERR_NETWORK safely:', result4);

// Test 5: safeRenderString with { code, message }
const safe1 = safeRenderString({ code: 'ERR_01', message: 'Safe human message' });
assert.strictEqual(safe1, 'Safe human message');
assert.strictEqual(typeof safe1, 'string');
console.log('✓ Test 5 Passed: safeRenderString rendered object { code, message } as string');

// Test 6: safeRenderString with unexpected arbitrary object
const safe2 = safeRenderString({ unknownKey: 'unknownValue' }, 'Default safe string');
assert.strictEqual(safe2, 'Default safe string');
assert.notStrictEqual(safe2, '[object Object]');
console.log('✓ Test 6 Passed: safeRenderString refused to return [object Object]');

// Test 7: safeRenderString with null, undefined, primitive string, number
assert.strictEqual(safeRenderString(null), '');
assert.strictEqual(safeRenderString(undefined), '');
assert.strictEqual(safeRenderString('Plain string'), 'Plain string');
assert.strictEqual(safeRenderString(404), '404');
console.log('✓ Test 7 Passed: safeRenderString handled all primitives correctly');

// Test 8: Spring Boot Bean Validation error structure
const springValidationErr = {
  response: {
    status: 400,
    data: {
      errors: [
        { field: 'email', defaultMessage: 'Must be a well-formed email address' },
      ],
    },
  },
};
const result8 = formatApiError(springValidationErr);
assert.strictEqual(result8, 'Must be a well-formed email address');
console.log('✓ Test 8 Passed: Handled Spring Boot validation error array');

// Test 9: React Hook Form error simulation
const formRootError = {
  type: 'server',
  message: { code: 'INVALID_CREDENTIALS', message: 'The email or password you entered is incorrect.' },
};
// safeRenderString handles the object directly so React never throws Error #31
const renderedFormError = safeRenderString(formRootError.message);
assert.strictEqual(renderedFormError, 'The email or password you entered is incorrect.');
assert.strictEqual(typeof renderedFormError, 'string');
console.log('✓ Test 9 Passed: Simulated React Hook Form object error prevented React child crash');

// Test 10: Interceptor normalization simulation
const rawAxiosError = {
  response: {
    status: 401,
    data: {
      error: { code: 'AUTH_FAILED', message: 'Invalid credentials.' },
    },
  },
};
// Apply interceptor normalization
const data = rawAxiosError.response.data;
if (data.error && typeof data.error === 'object') {
  data._rawError = data.error;
  data.error = String(data.error.message || data.error.code);
}
rawAxiosError.humanMessage = formatApiError(rawAxiosError);

// Legacy callers checking error.response?.data?.error now get a string, NOT an object:
assert.strictEqual(typeof rawAxiosError.response.data.error, 'string');
assert.strictEqual(rawAxiosError.response.data.error, 'Invalid credentials.');
assert.strictEqual(rawAxiosError.humanMessage, 'Invalid credentials.');
console.log('✓ Test 10 Passed: Interceptor normalization protects legacy callers from receiving object');

console.log('\nAll tests passed successfully!');

