const currentFormat = (value: number, currencyFormat: string, formatCountry: string) => {
  return new Intl.NumberFormat(formatCountry, {
    currency: currencyFormat,
    maximumFractionDigits: 2
  }).format(value)
}

export default currentFormat