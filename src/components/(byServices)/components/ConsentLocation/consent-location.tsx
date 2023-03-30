import { $, component$, useStore, useTask$ } from '@builder.io/qwik';

export const ConsentLocation = component$(() => {
  const latitude = useStore({ setLatitude: 0 });
  const longitude = useStore({ setLongitude: 0 });
  const address = useStore({ setAddress: '' });
  const city = useStore({ setCity: '' });
  const postalCode = useStore({ setPostalCode: '' });
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
useTask$( () => {
    const apiKey = '2ebef1a3ac4c44c3b629a19330701d14';

    fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.location) {
          latitude.setLatitude = parseFloat(data.location.lat);
          longitude.setLongitude = parseFloat(data.location.lng);

          fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude.setLatitude}&lon=${longitude.setLongitude}&apiKey=${apiKey}`
          ).then((response) => response.json())
           .then((data) => {
  if (
    data.features &&
    data.features.length > 0 &&
    data.features[0].properties
  ) {
    const properties = data.features[0].properties;
 console.log( `fdssfs`);
    city.setCity = properties.city || properties.hamlet;
    postalCode.setPostalCode = properties.postcode;
  } else {
    eor.setError =
      'No se pudo obtener la dirección a través de la API de Geoapify.';
  }
})

            .catch((error) => {
              eor.setError =
                'Error al obtener la dirección a través de la API de Geoapify: ' +
                error.message;
            });
        } else {
          eor.setError =
            'No se pudo obtener la ubicación a través de la geolocalización basada en IP.';
        }
      })
      .catch((error) => {
        eor.setError =
          'Error al obtener la ubicación a través de la geolocalización basada en IP: ' +
          error.message;
      });
  },);
  return (
     <div>
    <>{
      address.setAddress
    }
      <p>Latitud: {latitude.setLatitude || 'No disponible'}</p>
      <p>Longitud: {longitude.setLongitude || 'No disponible'}</p>
      <p>Dirección: {address.setAddress || 'No disponible'}</p>
      <p>Ciudad: {city.setCity || 'No disponible'}</p>
      <p>Código postal: {postalCode.setPostalCode || 'No disponible'}</p>
    </>
    <button onClick$={handleManualLocation}>
      Completar ubicación manualmente
    </button>
  </div>
  );
});
