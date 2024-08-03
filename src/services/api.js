const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Helper function to handle the response
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();
    console.log('data: ', data);

    if (Array.isArray(data)) {
        return data.map(todo => ({
            ...todo,
            completed: todo.completed === 1
        }));
    }
    console.log('data in handle response: ', data)
    if (typeof data === 'object' && data !== null) {
        return {
            ...data,
            completed: data.completed === 1
        };
    }

    console.error('Unexpected response format:', data);
    return [];
};

// User Registration
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw error;
    }
};

// User Login
export const login = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error logging in:', error.message);
        throw error;
    }
};

// Fetch Todos
export const fetchTodos = async (token) => {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        throw error;
    }
};

// Create a New Todo
export const createTodo = async (token, todoData) => {
    try {
        const response = await fetch(`${API_URL}/todos/create-todo`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating todo:', error.message);
        throw error;
    }
};

// Update an Existing Todo
export const updateTodo = async (token, id, todoData) => {
    try {
        const response = await fetch(`${API_URL}/todos/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...todoData,
                completed: todoData.completed ? 1 : 0
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update todo');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        return responseData; // Return the parsed response directly
    } catch (error) {
        console.error('Error updating todo:', error.message);
        throw error;
    }
};

// Delete a Todo
export const deleteTodo = async (token, id) => {
    try {
        const response = await fetch(`${API_URL}/todos/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        throw error;
    }
};

// Toggle Status of a Todo
export const updateTodoStatus = async (token, id, { completed }) => {
    try {
      console.log(`Updating todo ${id} to completed status ${completed}`);
  
      const response = await fetch(`${API_URL}/todos/update-status/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
  
      const data = await handleResponse(response);
      console.log('Response data from server:', data);
      
      return data;
    } catch (error) {
      console.error('Error updating todo status:', error.message);
      throw error;
    }
  };
  
