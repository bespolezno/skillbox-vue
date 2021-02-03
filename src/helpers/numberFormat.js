export default function numberFormat(value) {
    if (Number.isNaN(value) || (!value && value !== 0)) return "";

    return new Intl.NumberFormat().format(value);
}