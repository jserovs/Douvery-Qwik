import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { ChangeAvatar } from '~/components/(Account)/User/verified-segure/changes/change-avatar/change-avatar';
import { useGetCurrentUser } from '~/routes/layout';
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
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
              <div>
                {' '}
                <p>You Name:</p>
                <p>{userACC?.name}</p>
              </div>
              <div>
                {' '}
                <button>Change Name</button>
              </div>
            </li>
            <li>
              <div>
                <p> You Last Name:</p>
                <p>{userACC?.lastname}</p>
              </div>
              <div>
                {' '}
                <button>Change Last Name</button>
              </div>
            </li>
            <li>
              <div>
                <p>Email:</p>
                <p>juanchito@gmail.com</p>
              </div>
              <div>
                {' '}
                <button>Change Email</button>
              </div>
            </li>
            <li>
              <div>
                <p>Address:</p>
                <p> stre 1 s 2sd da 12312 </p>
              </div>
              <div>
                {' '}
                <button>Change Address</button>
              </div>
            </li>{' '}
            <li>
              <div>
                {' '}
                <p>Phone:</p>
                <p>+1 809-670-4346 </p>
              </div>
              <div>
                {' '}
                <button>Change Phone</button>
              </div>
            </li>
            <div class="title-centered">
              <div class="line"></div>
              <p>Security for the profile</p>
              <div class="line"></div>
            </div>
            <li>
              <div>
                {' '}
                <p>Session verification</p>
                <p>No activate</p>
              </div>
              <div>
                {' '}
                <button>Activate verification</button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>VeriTool verification</p>
                <p>No activate</p>
              </div>
              <div>
                {' '}
                <button>Activate VeriTool</button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>2-step verification</p>
                <p>No activate</p>
              </div>
              <div>
                {' '}
                <button>Activate 2-step </button>
              </div>
            </li>
            <li>
              <div>
                {' '}
                <p>Notification</p>
                <p>None </p>
              </div>
              <div>
                {' '}
                <button>Change Notification</button>
              </div>
            </li>
          </ul>
        </div>
        <ChangeAvatar />
      </div>
    </div>
  );
});
