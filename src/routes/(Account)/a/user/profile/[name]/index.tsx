import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { useNavigate } from '@builder.io/qwik-city';
import { TextCL } from '~/components/use/textCL/textCL';
import { ChangeAvatar } from '~/components/(Account)/User/verified-segure/changes/change-avatar/change-avatar';
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const nav = useNavigate();

  const renderPhones = (phones: any) => {
    if (!phones) {
      return 'No se encontraron teléfonos.';
    }

    if (phones.length > 1) {
      return `${phones.join(', ')}`;
    } else if (phones.length === 1) {
      return `${phones[0]}`;
    } else {
      return 'No se encontraron teléfonos.';
    }
  };
  const renderAddress = (address: any) => {
    if (!address) {
      return 'No se encontraron direcciones.';
    }

    const formatAddress = (addr: any) => {
      return `${addr.addressLine1}, ${addr.addressLine2}, ${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}, ${addr.country}`;
    };

    if (address.length > 1) {
      const addresses = address
        .map((addr: any) => formatAddress(addr))
        .join('; ');
      return `${addresses}`;
    } else if (address.length === 1) {
      return `${formatAddress(address[0])}`;
    } else {
      return 'No se encontraron direcciones.';
    }
  };

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
                <p>
                  <TextCL text={userACC?.name} />
                </p>
              </div>
              <div>
                {' '}
                <button
                  onClick$={() =>
                    nav('/a/user/verified-segure/changes/name-lastname/')
                  }
                >
                  Change Name
                </button>
              </div>
            </li>
            <li>
              <div>
                <p> You Last Name:</p>
                <p>
                  <TextCL
                    text={
                      userACC?.lastname
                        ? userACC?.lastname
                        : 'No se encontraron lastname.'
                    }
                  />
                </p>
              </div>
              <div>
                {' '}
                <button
                  onClick$={() =>
                    nav('/a/user/verified-segure/changes/name-lastname/')
                  }
                >
                  Change Last Name
                </button>
              </div>
            </li>
            <li>
              <div>
                <p>Email:</p>
                <p>
                  <TextCL text={userACC?.email} />
                </p>
              </div>
              <div>
                {' '}
                <button
                  onClick$={() =>
                    nav('/a/user/verified-segure/changes/email-user/')
                  }
                >
                  Change Email
                </button>
              </div>
            </li>
            <li>
              <div>
                <p>Address:</p>
                <p>
                  {' '}
                  <TextCL text={renderAddress(userACC?.address[0])} />
                </p>
              </div>
              <div>
                {' '}
                <button
                  onClick$={() =>
                    nav('/a/user/verified-segure/changes/address-delivery/')
                  }
                >
                  Change Address
                </button>
              </div>
            </li>{' '}
            <li>
              <div>
                {' '}
                <p>Phone:</p>
                <p>
                  <TextCL text={renderPhones(userACC?.phones)} />
                </p>
              </div>
              <div>
                {' '}
                <button>Change Phone</button>
              </div>
            </li>{' '}
            <li>
              <div>
                {' '}
                <p>Password:</p>
                <p>**********</p>
              </div>
              <div>
                {' '}
                <button
                  onClick$={() =>
                    nav('/a/user/verified-segure/changes/password/')
                  }
                >
                  Change Password
                </button>
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
                <p>
                  <TextCL
                    text={
                      userACC?.sessionVerification ? 'Activada' : 'No activada'
                    }
                  />{' '}
                </p>
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
                <p>
                  <TextCL
                    text={
                      userACC?.veriToolVerification ? 'Activada' : 'No activada'
                    }
                  />{' '}
                </p>
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
                <p>
                  <TextCL
                    text={
                      userACC?.twoStepVerification ? 'Activada' : 'No activada'
                    }
                  />{' '}
                </p>
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
                <p>
                  <TextCL
                    text={userACC?.notification ? 'Activada' : 'No activada'}
                  />{' '}
                </p>
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
