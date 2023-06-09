
import { Base64 } from 'js-base64';


const OPTIONS_KEY = 'userInfo';
export const passwordKEY = 'SARID-773CA148-8E63C189-76E912B1';
export const serverKey = 'SARID-0B756348-92D0EF2F-542AA93A';


export const isAppReady = () => {
  return null !== localStorage.getItem(OPTIONS_KEY);
};

export function generateToken(userInfo:any, password:any, serverKey:any) {
  const userInfoString = JSON.stringify(userInfo);
  const userInfoStringWithPasswordAndKey =
    userInfoString + password + serverKey;
  const encodedUserInfo = Base64.encode(userInfoStringWithPasswordAndKey);
  return encodedUserInfo;
}

export function divideAndMultiplyToken(token:any, password:any, serverKey:any) {
 const decodedToken = Base64.decode(token).toString();
  const userInfoString = decodedToken.slice(
    0,
    -(password.length + serverKey.length)
  );
  const providedPassword = decodedToken.slice(
    -(password.length + serverKey.length),
    -serverKey.length
  );
  const providedServerKey = decodedToken.slice(-serverKey.length);
  if (providedPassword !== password || providedServerKey !== serverKey) {
    throw new Error('Contraseña o clave del servidor incorrectas');
  }
  const userInfoObject = JSON.parse(userInfoString);

  const newToken = generateToken(userInfoObject, password, serverKey);
  return newToken;
}
export function decodeToken(token:any, password:any, serverKey:any) {
 const decodedToken = Base64.decode(token).toString();
  const userInfoString = decodedToken.slice(
    0,
    -(password.length + serverKey.length)
  );
  const providedPassword = decodedToken.slice(
    -(password.length + serverKey.length),
    -serverKey.length
  );
  const providedServerKey = decodedToken.slice(-serverKey.length);
  if (providedPassword !== password || providedServerKey !== serverKey) {
    throw new Error('Contraseña o clave del servidor incorrectas');
  }
  const userInfoObject = JSON.parse(userInfoString);
  return userInfoObject;
}


export async function fetchUser(
  token: string,
){
   const response = await fetch(
                `http://localhost:7629/api/user`,
                {

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

 
    return  data;
}

export async function getUserInfo() {
   try {
 
    const userInfo = await fetchUser('');

    console.log('Información del usuario:', userInfo);
    console.log('Nombre del usuario:', userInfo.decodedUserInfo.name);
    
    console.log('Correo electrónico del usuario:', userInfo.decodedUserInfo.email);
   return  userInfo.decodedUserInfo.name; 
  } catch (err) {
  ''
  }
}






