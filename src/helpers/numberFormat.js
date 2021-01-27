export default function numberFormat(value) {
    if (Number.isNaN(value) || !value) return "";

    return new Intl.NumberFormat().format(value);
}