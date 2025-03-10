/**
 * Simple network connectivity check using fetch
 * @returns Promise<boolean> - True if connected, false otherwise
 */
export const isConnected = async (): Promise<boolean> => {
  try {
    // Try to fetch a small resource to check connectivity
    const response = await fetch('https://www.google.com', {
      method: 'HEAD',
      // Short timeout to avoid hanging
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error('Network check failed:', error);
    return false;
  }
};

/**
 * Handles network errors with appropriate messages
 * @param error - The error object
 * @returns A user-friendly error message
 */
export const handleNetworkError = (error: any): string => {
  console.error('Network error:', error);

  if (error?.message?.includes('Network request failed')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  if (error?.status === 401 || error?.code === 'PGRST301') {
    return 'Your session has expired. Please log in again.';
  }

  return error?.message || 'An unexpected error occurred. Please try again.';
};
