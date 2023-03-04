
export function saveData(data: string) {
  localStorage.setItem('userInfo', data);
}




const OPTIONS_KEY = 'userInfo';

export interface User {
  name: string;
}

export const defaultUser = <User>{
  name: '',
};

export const isAppReady = () => {
  return null !== localStorage.getItem(OPTIONS_KEY);
};


export function  getData  () {
  const stored = localStorage.getItem(OPTIONS_KEY);

  try {
    const settings = JSON.parse(stored as string);

    return { ...defaultUser, ...settings };

  } catch (e) {
    return defaultUser;
  }
}




export async function fetchUser(
  token: string,
  controller?: AbortController
): Promise<any> {
   const response = await fetch(
                `http://localhost:7629/api/user`,
                {
signal: controller?.signal,
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 400) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.msg);
              }

     const data = await response.json();

  
    return data.name;
}