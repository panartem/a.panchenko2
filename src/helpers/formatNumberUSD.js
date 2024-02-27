import formatNumber from "@/helpers/formatNumber.js";
export default function formatNumberUSD(number) {
  return formatNumber(number, 'en-US', {currency: 'USD'})
}
