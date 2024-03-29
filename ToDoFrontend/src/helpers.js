export function getLocalStorageItem(key) {
    const res = localStorage.getItem(key);
    if (res) {
        return JSON.parse(res)
    } else {
        return ''
    }
}