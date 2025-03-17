import { preferences } from "../storage/securestorage";



export const headers =  () => {
  return {
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json',
  };
};


export const headersWithToken = async () => {
  const token = await preferences.getValue('token');
  return {
    ...headers(),
    Authorization: `Bearer ${token}`,
  };
};

