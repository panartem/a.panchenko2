export default function formatNumber(number, locale = 'ru-Ru', options = {}) {
  const defaultOptions = {
    style: 'decimal',
    currency: 'RUB',
    minimumFractionDigits: 0
  }

  options = Object.assign(defaultOptions, options)

  return new Intl.NumberFormat(locale, options).format(number);
}
