'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const bubbleSortButton = document.querySelector('.bubbleSortStartButton');
    const insertionSortButton = document.querySelector('.insertionSortStartButton');
    const mergeSortButton = document.querySelector('.mergeSortStartButton');
    const quickSortButton = document.querySelector('.quickSortStartButton');

    const originalArray = generateArray(); // Store the original array

    bubbleSortButton.addEventListener('click', async () => {
        const array = originalArray.slice(); // Create a copy of the original array
        console.log("Bubble Sort started:", array);
        await bubbleSort(array); // Pass a copy of the array
        renderArray(array, document.querySelector('#bubbleSortArrayContainer')); // Display the sorted array in the bubble sort container
    });

    insertionSortButton.addEventListener('click', async () => {
        const array = originalArray.slice(); // Create a copy of the original array
        console.log("Insertion Sort started:", array);
        await insertionSort(array); // Pass a copy of the array
        renderArray(array, document.querySelector('#insertionSortArrayContainer')); // Display the sorted array in the insertion sort container
    });

    mergeSortButton.addEventListener('click', async () => {
        const array = originalArray.slice(); // Create a copy of the original array
        console.log("Merge Sort started:", array);
        await mergeSort(array); // Pass a copy of the array
        renderArray(array, document.querySelector('#mergeSortArrayContainer')); // Display the sorted array in the merge sort container
    });

    quickSortButton.addEventListener('click', async () => {
        const array = originalArray.slice(); // Create a copy of the original array
        console.log("Quick Sort started:", array);
        await quickSort(array); // Pass a copy of the array
        renderArray(array, document.querySelector('#quickSortArrayContainer')); // Display the sorted array in the quick sort container
    });
});

function generateArray(){
    return [5, 9, 12, 7, 14, 21, 43, 35, 3];
}

function sortedArrayManually(){
    return [3, 5, 7, 9, 12, 14, 21, 35, 43]
}

function renderArray(arr, container) {
    console.log("Rendering array:", arr);
    container.innerHTML = ''; // Clear the container
    arr.forEach(item => {
        const arrayItem = document.createElement('div');
        arrayItem.className = 'array-item';
        arrayItem.textContent = item;
        container.appendChild(arrayItem); // Append the array item to the specified container
    });
}

const realarrayContainer = document.getElementById('realarray');
const sortedArray = sortedArrayManually(); // Generate the array
renderArray(sortedArray, realarrayContainer); // Render the array inside the realarray container

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(arr, i, j) {
    await sleep(300); // Adjust speed here for visualization
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

async function bubbleSort(arr) {
    const start = Date.now(); // Record start time
    const len = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                await swap(arr, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    document.getElementById('bubbleSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
    console.log("Bubble Sort finished:", arr);
}

async function insertionSort(arr) {
    const start = Date.now();
    console.log("Insertion Sort started:", arr);
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        console.log("Current element:", current);
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
        console.log("Array after iteration", i, ":", arr);
    }
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    document.getElementById('insertionSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
    console.log("Insertion Sort finished:", arr);
}

async function mergeSort(arr) {
    const start = Date.now();
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, middle));
    const right = await mergeSort(arr.slice(middle));
    const result = await merge(left, right);
    console.log("Merge Sort finished:", result);
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    document.getElementById('bubblmergeSortTimereSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
    return result ;
}

async function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    const start = Date.now();
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
    console.log("Quick Sort finished:", arr);
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    document.getElementById('quickSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, right);
    return i + 1;
}
