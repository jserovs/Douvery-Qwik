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
