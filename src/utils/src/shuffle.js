export default function shuffle(array) {
    let n = array.length;
    let arr = array.slice(); // Copy the array
    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i); // Get a random index
        if (j === i) j--; // Ensure it's different from the current index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}
