// API base URL 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  token?: string;
  message?: string;
}

/**
 * Register a new user
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password
 * @returns The API response with user data and token
 */
export async function registerUser(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_ENDPOINT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: 'Failed to register. Please try again later.',
    };
  }
}

/**
 * Login a user
 * @param email - User's email
 * @param password - User's password
 * @returns The API response with user data and token
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: 'Failed to login. Please try again later.',
    };
  }
}

/**
 * Get the current user
 * @param token - JWT token
 * @returns The API response with user data
 */
export async function getCurrentUser(token: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${AUTH_ENDPOINT}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    return {
      success: false,
      message: 'Failed to get user data. Please try again later.',
    };
  }
} 