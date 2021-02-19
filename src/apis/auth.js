export const login = async (credentials) => {
  try {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const response = await fetch(`http://localhost:4000/users/login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const register = async (user) => {
  try {
    const response = await fetch(`http://localhost:4000/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
