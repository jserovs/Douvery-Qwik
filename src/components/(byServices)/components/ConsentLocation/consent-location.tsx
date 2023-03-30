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

  useTask$(() => {
    const apiKey = '0d62ca75f9e230';

    fetch(`https://ipinfo.io/json?token=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.loc) {
          const [lat, lon] = data.loc.split(',');
          latitude.setLatitude = parseFloat(lat);
          longitude.setLongitude = parseFloat(lon);

          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=API_KEY`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                address.setAddress = data.results[0].formatted_address;
                for (const component of data.results[0].address_components) {
                  if (component.types.includes('locality')) {
                    city.setCity = component.long_name;
                  }
                  if (component.types.includes('postal_code')) {
                    postalCode.setPostalCode = component.long_name;
                  }
                }
              } else {
                eor.setError =
                  'No se pudo obtener la dirección a través de la API de Geocoding de Google.';
              }
            })
            .catch((error) => {
              eor.setError =
                'Error al obtener la dirección a través de la API de Geocoding de Google: ' +
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
  });
  return (
    <div>
      {latitude.setLatitude && longitude.setLongitude ? (
        <>
          <p>Latitud: {latitude.setLatitude}</p>
          <p>Longitud: {longitude.setLongitude}</p>
          {address.setAddress && <p>Dirección: {address.setAddress}</p>}
          {city.setCity && <p>Ciudad: {city.setCity}</p>}
          {postalCode.setPostalCode && (
            <p>Código postal: {postalCode.setPostalCode}</p>
          )}
        </>
      ) : (
        <p>{eor.setError}</p>
      )}
      <button onClick$={handleManualLocation}>
        Completar ubicación manualmente
      </button>
    </div>
  );
});
