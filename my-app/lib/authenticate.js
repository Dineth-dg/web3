const TOKEN_KEY = "access_token";

export function setToken(token){
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(){
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(){
  localStorage.removeItem(TOKEN_KEY);
}

export function readToken(){
  try{
    return JSON.parse(atob(getToken().split('.')[1]));
  }catch(err){
    return null;
  }
}

export function isAuthenticated(){
  const token = readToken();
  return token ? true : false;
}

// LOGIN
export async function authenticateUser(user, password){

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: user,
      password: password
    })
  });

  const data = await res.json();

  if(res.status === 200){
    setToken(data.token);
    return true;
  }else{
    throw new Error(data.message);
  }
}

// REGISTER
export async function registerUser(user, password, password2){

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userName: user,
      password: password,
      password2: password2
    })
  });

  const data = await res.json();

  if(res.status === 200){
    return true; // NO TOKEN HERE
  }else{
    throw new Error(data.message);
  }
}