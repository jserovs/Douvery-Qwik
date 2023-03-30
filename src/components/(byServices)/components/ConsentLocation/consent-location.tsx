import { component$, useStore, useTask$ } from '@builder.io/qwik';

export const ConsentLocation = component$(() => {
    const latitude = useStore({setLatitude:0})
    const longitude = useStore({setLongitude:0})
    const eor = useStore({setError:''})
   
   
    useTask$(() => {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
            eor.setError ="La geolocalización no está disponible en este navegador.";
            return;
        }
    
        const consentimiento = () => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              latitude.setLatitude=position.coords.latitude;
              longitude.setLongitude=position.coords.longitude;
            
            },
            (error) => {
                eor.setError= error.message
            }
          );
        };
    
        const denegarConsentimiento = () => {
            eor.setError=    "Para obtener su ubicación, debe aceptar el uso de la geolocalización."
         
        };
        eor.setError=  ''
       
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (permissionStatus.state === "granted") {
              consentimiento();
            } else if (permissionStatus.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitude.setLatitude=position.coords.latitude;
                    longitude.setLongitude=position.coords.longitude;
                },
                (error) => {
                    eor.setError= error.message
                }
              );
            } else {
              denegarConsentimiento();
            }
    
            permissionStatus.onchange = () => {
              if (permissionStatus.state === "granted") {
                consentimiento();
              } else {
                denegarConsentimiento();
              }
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }, );
    
      return (
        <div>
          {latitude.setLatitude && longitude.setLongitude ? (
            <>
              <p>Latitud: {latitude.setLatitude}</p>
              <p>Longitud: {longitude.setLongitude}</p>
            </>
          ) : (
            <p>{eor.setError}</p>
          )}
        </div>
      );
});