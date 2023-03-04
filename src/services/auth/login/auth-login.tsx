import { useNavigate } from '@builder.io/qwik-city';
import { setToken } from '../token/token';
const navigate = useNavigate();
const urlServerNode = 'https://server-douvery.vercel.app';

export const AuthServicesLogin = (credentiales: {
  email: string;
  password: string;
}) => {
  console.log(
    '⚡⚡ Servicio externo que se encarga de validar mis credenciales: ',
    credentiales
  );
  console.log(`⚡⚡ Retorna un token session (JWT Json Web Token)`);

  const JWT = 'TOKEN_SESSION_123';
  document.cookie = `Login_Info=${JWT}; Secure; SameSite=Strict; path=/`;
};

export async function AuthServiceLogin(
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch(
      `https://server-douvery.vercel.app/api/signin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    if (response.status === 400) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.msg);
    }
    const data = await response.json();
    setToken(JSON.stringify(data));
    navigate('/');
  } catch (error: any) {
    console.error(error);
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Error: ' + error.message;
    document.querySelector('.ctr-login').appendChild(errorMessage);
  }
}
