export function randomNum() {
  return Math.floor(Math.random() * 6) + 1;
}

export function replaceSpacesWithHyphens({ str }: any) {
  return str.replace(/\s+/g, '-');
}

export function formatGender(gender: any) {
  return gender.toString().replace(/,/g, ' - ');
}
export function getStatusMessage(status: any) {
  switch (status) {
    case 0:
      return 'Order created';
    case 1:
      return 'Order packed';
    case 2:
      return 'Order shipped';
    case 3:
      return 'Order in transit';
    case 4:
      return 'Order delivered';
    case 5:
      return 'Order completed';
    default:
      return 'Unknown status';
  }
}
function getMonthName(numMonth: any) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months[numMonth];
}

function addLeadingZero(value: any) {
  return value.toString().padStart(2, '0');
}

export function formatDateWithMinutes(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
}

export function formatDate(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function calculateCartDetails(car_product: any) {
  const taxRate = 0.1; // Por ejemplo, un impuesto del 10%
  const shippingCost = 5; // Establece un costo de envío fijo, si es necesario

  const subTotalA = car_product.productResults.reduce(
    (accumulator: any, product: any) => {
      return accumulator + product.price * product.quantity;
    },
    0
  );

  const descounts = car_product.productResults.reduce(
    (accumulator: any, product: any) => {
      const discountAmount =
        product.price * (product.discount / 100) * product.quantity;
      return accumulator + discountAmount;
    },
    0
  );

  const subTotal = parseFloat((subTotalA - descounts).toFixed(2));
  const tax = parseFloat((subTotal * taxRate).toFixed(2));
  const total = parseFloat((subTotal + tax + shippingCost).toFixed(2));

  return {
    subTotalA,
    descounts,
    subTotal,
    tax,
    shippingCost,
    total,
  };
}
