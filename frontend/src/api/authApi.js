import api from "./axios";

export const register = async (payload) => {
  const { data } = await api.post("/user/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/user/login", payload);
  return data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const { data } = await api.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `token ${token}`,
      },
    },
  );
  return data;
};


export const createTask = async (payload) => {
  const token = localStorage.getItem('token')
  const { data } = await api.post('/task/create', payload, {
    headers: {
      "Authorization": `token ${token}`
    }
  })
  return data
}

export const getTasks = async () => {
  const token = localStorage.getItem('token')

  const { data } = await api.get('/task/get', {
    headers: {
      "Authorization": `token ${token}`
    }
  })
  return data
}

export const deleteTask = async (id) => {
  const token = localStorage.getItem('token')
  const { data } = await api.delete(`/task/delete/${id}`, {
    headers: {
      "Authorization": `token ${token}`
    }
  })
  return data;
}

export const editTask = async (id, payload) => {
  const token = localStorage.getItem('token')
  const data = await api.post(`/task/edit/${id}`, payload, {
    headers: {
      "Authorization": `token ${token}`
    }
  })
  return data;
}