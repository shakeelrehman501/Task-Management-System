import api from "./axios";

export const register = async (payload) => {
  const { data } = await api.post("/register", payload);
  return data;
};

export const login = async (payload) => {
  const { data } = await api.post("/login", payload);
  return data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const { data } = await api.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `token ${token}`,
      },
    },
  );
  return data;
};
