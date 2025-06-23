// This file previously handled axios setup for backend API calls.
// All backend/API integration code has been removed for frontend-only operation.

// Placeholder for axiosWrapper to avoid breaking imports.
export const axiosWrapper = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} }),
};
