import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './invoice-order-1.css?inline';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
export const InvoiceOrder1 = component$(({ invoiceData, state }: any) => {
  invoiceData;
  useStylesScoped$(styles);

  function obtenerNombreMes(numeroMes: any) {
    const meses = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ];

    return meses[numeroMes];
  }

  // Función para obtener la fecha actual en el formato deseado
  function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = obtenerNombreMes(fecha.getMonth());
    const anio = fecha.getFullYear();

    return `${dia} de ${mes} ${anio}`;
  }
  const taxRate = 10;
  const dateNow = obtenerFechaActual();
  function calculateTax(price: number, taxRate: number) {
    const priceWithoutTax = price / (1 + taxRate / 100);
    const tax = price - priceWithoutTax;
    return Math.round(tax * 100) / 100; // Redondea a dos decimales
  }

  function calculatePriceWithoutTax(price: number, taxRate: number) {
    const priceWithoutTax = price / (1 + taxRate / 100);
    return Math.round(priceWithoutTax * 100) / 100; // Redondea a dos decimales
  }
  function calculateTotal(price: number, taxRate: number, quantity: number) {
    const priceWithoutTax = price / (1 + taxRate / 100);
    const tax = price - priceWithoutTax;
    const total = (priceWithoutTax + tax) * quantity;
    return Math.round(total * 100) / 100; // Redondea a dos decimales
  }
  return (
    <div id="invoice">
      <div class="container-body">
        <div class="header">
          <div class="container-title-douvery">
            <DouveryLogo40x40 size="60" color="var(--color-primary)" />
            <div class="title-douvery">
              {' '}
              <span class="font-bold tracking-wide text-gray-800 uppercase">
                Douvery
              </span>
              <p>Disfruta, compra y comparte tu felicidad con nosotros.</p>
            </div>
          </div>

          <div class="container-date">
            <strong>FACTURA </strong>
            <p>{dateNow}</p>
          </div>
        </div>

        <div class="separator"></div>
        <h2 class="titleThank">Thank you for your purchase!</h2>
        <div class="separator"></div>

        <div class="invoice-date">
          <strong>Direccion de envio:</strong>
          <p>
            <TextCL text={state.order.orderShippingAddress.addressLine1} /> ,
            {state.order.orderShippingAddress.street} ,
            {state.order.orderShippingAddress.city} ,
            {state.order.orderShippingAddress.zip} ,
            <TextCL text={state.order.orderShippingAddress.country} />{' '}
          </p>
        </div>

        <table class="order-table">
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Metodo de pago</th>
              <th>Enviar por</th>
              <th>Douvery Extend</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Var</td>
              <td>
                <TextCL text={state.order.orderPaymentMethod.method} />
              </td>
              <td>Douvery</td>
              <td>No aplicado</td>
            </tr>
          </tbody>
        </table>
        <table class="article-table">
          <thead>
            <tr>
              <th>Dui</th>
              <th>Descripcion</th>
              <th>Cantidad</th>
              <th>Price</th>
              <th>Taxt</th>
              <th>Total</th>
            </tr>
          </thead>
          {state.order.orderItems.length > 0 ? (
            <>
              {state.order.orderItems.map((item: any) => {
                return (
                  <>
                    <tbody key={item.dui}>
                      <tr>
                        <td>{item.dui}</td>
                        <td>
                          <TextCL text={item.name} />
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          <UsePrice
                            price={calculatePriceWithoutTax(
                              item.price,
                              taxRate
                            )}
                          />
                        </td>
                        <td>
                          <UsePrice price={calculateTax(item.price, taxRate)} />
                        </td>
                        <td>
                          <UsePrice
                            price={calculateTotal(
                              item.price,
                              taxRate,
                              item.quantity
                            )}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}{' '}
            </>
          ) : (
            <> </>
          )}
        </table>

        <div class="total-box">
          <div class="box">
            <div class="total-item">
              <strong>Impuesto:</strong>
              <span>
                <UsePrice price={state.order.orderTotaltax} />
              </span>
            </div>
            <div class="total-item">
              <strong>Envío:</strong>
              <span>
                <UsePrice price={5} />
              </span>
            </div>
            <div class="total-item">
              <strong>Total:</strong>
              <span>
                <UsePrice price={state.order.orderTotalAmout} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="container-number-order ">
        <strong>Order</strong>{' '}
        <p>
          <TextCL text={state.order.orderId} />{' '}
        </p>
      </div>
    </div>
  );
});
