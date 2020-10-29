export const SERVER = (process.env.NODE_ENV === "production") ? '/' : "http://localhost:3001/";
export const COEFFICIENT = 1.15;
export var ranges = [
    { divider: 1e18, suffix: 'E' },
    { divider: 1e15, suffix: 'P' },
    { divider: 1e12, suffix: 'T' },
    { divider: 1e9, suffix: 'G' },
    { divider: 1e6, suffix: 'M' },
    { divider: 1e3, suffix: 'k' }
];

export function formatNumber(n) {
    for (var i = 0; i < ranges.length; i++) {
        if (n >= ranges[i].divider) {
            return (n / ranges[i].divider).toString() + ranges[i].suffix;
        }
    }
    return n.toString();
}