const API_BASE = 'http://localhost:5001/api/auth';

export const registerUser = async (userData: any) => {
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Only needed if you are using cookies/sessions
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('Registration failed');
    }
  
    return await response.json();
  };

export async function loginUser(data: any) {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response.json();
}
