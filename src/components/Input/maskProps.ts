export const maskProps = {
  money: {
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: ".",
    decimalSeparator: ",",
  },
  percent: {
    decimalSeparator: ",",
    decimalScale: 2,
    suffix: "%",
    fixedDecimalScale: true,
  },
  date: {
    format: "##/##/####",
    mask: "_",
  },
  tel: {
    format: "(##) ####-####",
    mask: "_",
  },
  cel: {
    format: "(##) #####-####",
    mask: "_",
  },
  hiddenCel: {
    format: "(##) ####*-***#",
    mask: "_",
  },
  cpf: {
    format: "###.###.###-##",
    mask: "_",
  },
  cep: {
    format: "#####-###",
    mask: "_",
  },
  text: {},
  number: {},
  password: {
    type: "password",
  },
};
