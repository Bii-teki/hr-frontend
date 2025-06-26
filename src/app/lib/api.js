const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Utility Functions
const validateJobData = (jobData) => {
  const requiredFields = ['title', 'description', 'location'];
  const missingFields = requiredFields.filter(field => !jobData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  if (jobData.salary && isNaN(Number(jobData.salary))) {
    throw new Error('Salary must be a number');
  }
};

// Auth Storage Functions
const storeAuthData = (data) => {
  if (!data.accessToken) throw new Error("Access token is required");
  if (!data._id) throw new Error("User ID is required");

  const user = {
    id: data._id,
    name: data.name || '',
    email: data.email || '',
    position: data.position || '',
    company: data.company || null
  };

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken || '');
  localStorage.setItem('user', JSON.stringify(user));

  return { user, token: data.accessToken };
};

const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

const getAuthData = () => {
  const user = localStorage.getItem('user');
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: user ? JSON.parse(user) : null
  };
};

const getUser = () => getAuthData().user;


// API Response Handler
async function handleResponse(response) {
  const text = await response.text();
  let data;
  
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    const errorMessage = data.message || 
                       data.error?.message || 
                       `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
}

// Authenticated Fetch with Token Refresh
async function authFetch(url, options = {}) {
  const { accessToken, refreshToken } = getAuthData();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${accessToken}`
  };

  let response = await fetch(url, { ...options, headers });

  // Token refresh logic
  if (response.status === 401 && refreshToken) {
    try {
      const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      
      const { accessToken: newAccessToken } = await handleResponse(refreshResponse);
      localStorage.setItem('accessToken', newAccessToken);
      
      // Retry original request
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, { ...options, headers });
    } catch (refreshError) {
      clearAuth();
      throw new Error('Session expired. Please login again.');
    }
  }

  return response;
}

// API Methods
const api = {
  auth: {
    login: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await handleResponse(response);
      return storeAuthData(data);
    },

    loginCandidate: async (credentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/candidate/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const data = await handleResponse(response);
      return storeAuthData(data);
    },

    logout: async () => {
      try {
        await authFetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
      } finally {
        clearAuth();
      }
    },

    register: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(response);
    },

    refreshToken: async () => {
      const { refreshToken } = getAuthData();
      if (!refreshToken) throw new Error('No refresh token available');
      
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      return handleResponse(response);
    }
  },

  jobs: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const response = await authFetch(`${API_BASE_URL}/jobs?${query}`);
      return handleResponse(response);
    },

    getById: async (jobId) => {
      const response = await authFetch(`${API_BASE_URL}/jobs/${jobId}`);
      return handleResponse(response);
    },

    add_job: async (jobData) => {
    const user = getUser();    
    
    if (!user?.id) throw new Error('Authentication required');
    
    // Validate required fields
    if (!jobData.title || !jobData.description) {
        throw new Error('Title and description are required');
    }

    const response = await authFetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        body: JSON.stringify({
        title: jobData.title,
        description: jobData.description,
        requirements: jobData.requirements || [],
        responsibilities: jobData.responsibilities || [],
        department: jobData.department || '',
        location: jobData.location || '',
        employmentType: jobData.employmentType || 'Full-time',
        experienceLevel: jobData.experienceLevel || 'Mid-level',
        salaryRange: jobData.salaryRange || '',
        deadline: jobData.deadline || null,
        })
    });

    const data = await handleResponse(response);
    console.log('Job added:', data);
    
    return data;
    },

    updateJob: async (jobId, updates) => {
      const response = await authFetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      return handleResponse(response);
    },

    updateStatus: async (jobId, status) => {
      if (!['active', 'paused', 'closed'].includes(status)) {
        throw new Error('Invalid status value');
      }
      
      const response = await authFetch(`${API_BASE_URL}/jobs/${jobId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      return handleResponse(response);
    },

    getByEmployer: async () => {
      const user = getUser();
      if (!user?.id) throw new Error('Authentication required');
      
      const response = await authFetch(`${API_BASE_URL}/jobs/employer/${user.id}`);
      return handleResponse(response);
    },

    deleteJob: async (jobId) => {
      const response = await authFetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: 'DELETE'
      });
      return handleResponse(response);
    }
  },

  candidates: {
    add_candidate: async (candidateData) => {
      const response = await authFetch(`${API_BASE_URL}/candidates`, {
        method: 'POST',
        body: JSON.stringify(candidateData)
      });
      return handleResponse(response);
    },

    getByJob: async (jobId) => {
      const response = await authFetch(`${API_BASE_URL}/candidates/job/${jobId}`);
      return handleResponse(response);
    }
  },

  companies: {
    getCompany: async (companyId) => {
      const response = await authFetch(`${API_BASE_URL}/companies/${companyId}`);
      return handleResponse(response);
    },
    
    updateCompany: async (companyId, updates) => {
      const response = await authFetch(`${API_BASE_URL}/companies/${companyId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      return handleResponse(response);
    }
  }
};

export { api, getUser, clearAuth, getAuthData };