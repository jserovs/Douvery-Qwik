
import { Base64 } from 'js-base64';


const OPTIONS_KEY = 'userInfo';

export const isAppReady = () => {
  return null !== localStorage.getItem(OPTIONS_KEY);
};
export function generateToken(userInfo:any, password:any, serverKey:any) {
  const userInfoString = JSON.stringify(userInfo);
  const userInfoStringWithPasswordAndKey =
    userInfoString + password + serverKey;
  const encodedUserInfo = Buffer.from(
    userInfoStringWithPasswordAndKey
  ).toString('base64');
  return encodedUserInfo;
}

export function divideAndMultiplyToken(token:any, password:any, serverKey:any) {
  const decodedToken = Buffer.from(token, 'base64').toString();
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
  const decodedToken = Base64.decode(token);
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


export const passwordKEY = 'password';
export const serverKey = 'clave_secreta_del_servidor';

 

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







// Llamamos a la función getUserInfo con el token de autenticación

export function getData() {
  const stored = localStorage.getItem(OPTIONS_KEY);
  if (stored != null) {
    try {
      const data = JSON.parse(stored);
       const dret = fetchUser(data);
 
      return dret;
     
    } catch (error) {
      console.error('Error al decodificar los datos:', error);
    }
  } else {
    console.warn('No se encontraron datos en localStorage');
  }
  
}
