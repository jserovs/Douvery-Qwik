import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="container-title">
        <p>My Profile</p>
        <h6>Personal Information</h6>
      </div>
      <div class="container-box">
        <div class="container-box-content">
          <div class="container-box-title"></div>
          <ul>
            <li>
              <p>First Name:</p>
              <p>Douvery</p>
            </li>
            <li>
              <p>Last Name:</p>
              <p>Alvarez</p>
            </li>
            <li>
              <p>Email:</p>
              <p>juanchito@gmail.com</p>
            </li>
            <li>
              <p>Phone:</p>
              <p>+1 809-670-4346 </p>
            </li>
            <li>
              <p>Address:</p>
              <p> stre 1 s 2sd da 12312 </p>
            </li>
            <li>
              <p>City:</p>
              <p> stre </p>
            </li>
            <li>
              <p>State:</p>
              <p> streJR </p>
            </li>
            <li>
              <p>Zip Code:</p>
              <p>35666 </p>
            </li>
          </ul>
        </div>
        <div class="container-box-avatar">
          <img
            src="https://res.cloudinary.com/douvery/image/upload/v1676456401/LOGO/z7neu6qunez6ygx9xxho.webp"
            alt="avatar"
          />
          <p>Cambiada por ultima vez el 7 de abril de 2022</p>
          <div class="container-button-change-avatar">
            <button>Change Avatar</button>
          </div>
        </div>
      </div>
    </div>
  );
});
