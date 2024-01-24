export function renameKey(obj, oldKey, newKey) {
    console.log(obj)
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}
