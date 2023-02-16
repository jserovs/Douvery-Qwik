import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './view3.css?inline';
export const View3 = component$(({ product }: any) => {
  useStylesScoped$(style);
  product;
  return (
    <div class="ctnr-view-3">
      {' '}
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Detalles del producto</hs-sr3>
          <div class="srs-v">
            <a-sr1-info>Saber mas</a-sr1-info>
          </div>
        </div>
        <p-sr1>Detalles interesantes del producto</p-sr1>
        <div class="srs-md">
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>
      </div>
      <div class="content">
        <iframe></iframe>
      </div>
      <div class="ctr-video-360">
        <div style={{ width: '50vw', height: '50vh' }}>
          <a-scene embedded>
            <a-assets>
              <video
                autoPlay
                id="video"
                src="https://res.cloudinary.com/douvery/video/upload/v1676570904/VIDEO/n5vy6hzzd6s00vifsadc.mp4"
                loop
              ></video>
            </a-assets>
            <a-videosphere src="#video"></a-videosphere>
          </a-scene>
        </div>
      </div>
    </div>
  );
});
