import { $, component$, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import styles from './consent-location.css?inline'
import { fetchAddressUserIP } from '~/services/user/address/address';

export const ConsentLocation = component$(({ addressLine1 ,addressLine2,city,postalCode,country ,states}:any) => {
  useStylesScoped$(styles)
  const latitude = useStore({ setLatitude: 0 });
  const longitude = useStore({ setLongitude: 0 });


  const loader = useStore({setLoader:false})
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
  useTask$(async ({ track }) => {
    track(() => latitude.setLatitude);

    loader.setLoader = true;
fetchAddressUserIP(latitude.setLatitude,  longitude.setLongitude).then((result) => {

addressLine1.setAddressLine1= result.features[0].properties.street + ' , ' +result.features[0].properties.district
addressLine2.setAddressLine2= result.features[0].properties.address_line2
city.setCity=result.features[0].properties.city
states.setState=result.features[0].properties.state
postalCode.setPostalCode=result.features[0].properties.postcode
country.setCountry=result.features[0].properties.country

})
.catch((error) => {
  console.error("Error fetching address:", error);
});
loader.setLoader = false
  });

  return (
    <div class="consent-location">
      <button class="manual-location-button" onClick$={handleManualLocation}>{loader.setLoader == !loader.setLoader  ? <><div class="loader"></div></>: <></>} Completar ubicación manualmente</button>
      <p class="security-note">  Mas rapido ,mas eficiente</p>
    </div>
  );
});
