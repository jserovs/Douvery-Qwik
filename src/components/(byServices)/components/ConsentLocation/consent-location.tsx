import { $, component$, useStore, useTask$ } from '@builder.io/qwik';

import { fetchAddressUserIP } from '~/services/user/address/address';

export const ConsentLocation = component$(({ addressLine1 ,addressLine2,city,postalCode,country}:any) => {
  const latitude = useStore({ setLatitude: 0 });
  const longitude = useStore({ setLongitude: 0 });
  
  const eor = useStore({ setError: '' });

  const handleManualLocation = $(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.setLatitude = position.coords.latitude;
        longitude.setLongitude = position.coords.longitude;
      },
      (error) => {
        eor.setError = `No se pudo obtener la ubicación a través de la geolocalización del navegador: ${error.message}`;
      }
    );
  });
  fetchAddressUserIP(latitude.setLatitude,  longitude.setLongitude).then((result) => {
  addressLine1.setAddressLine1= result.features[0].properties.street + ' , ' +result.features[0].properties.district
  addressLine2.setAddressLine2= result.features[0].properties.address_line2
  city.setCity=result.features[0].properties.city
  postalCode.setPostalCode=result.features[0].properties.postcode
  country.setCountry=result.features[0].properties.country
  })
  .catch((error) => {
    console.error("Error fetching address:", error);
  });
 
  return (
     <div>
   
    <button onClick$={handleManualLocation}>
      Completar ubicación manualmente
    </button>
  </div>
  );
});
