export default function resetArrayPosition(array) {
    let arr = array.slice(); // Copy the array
    for (let i = 0; i < arr.length; i++) {
        while (i !== arr[i].index) {
            let temp = arr[i];
            arr[i] = arr[temp.index];
            arr[temp.index] = temp;
        }
    }
    return arr;
}
