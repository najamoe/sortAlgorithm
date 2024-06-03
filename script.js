'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const bubbleSortButton = document.querySelector('.bubbleSortStartButton');
    const insertionSortButton = document.querySelector('.insertionSortStartButton');
    const mergeSortButton = document.querySelector('.mergeSortStartButton');
    const quickSortButton = document.querySelector('.quickSortStartButton');

    // Initialize the array and timer elements for each algorithm
    initializeArrayAndTimer('bubbleSort', generateArray());
    initializeArrayAndTimer('insertionSort', generateArray());
    initializeArrayAndTimer('mergeSort', generateArray());
    initializeArrayAndTimer('quickSort', generateArray());

    bubbleSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
        console.log("Bubble Sort started:", array);
        await bubbleSort(array); 
        renderArray(array, document.querySelector('#bubbleSortArrayContainer')); 
    });
    
    insertionSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
        console.log("Insertion Sort started:", array);
        await insertionSort(array); 
        renderArray(array, document.querySelector('#insertionSortArrayContainer'));
    });
    
    mergeSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
        console.log("Merge Sort started:", array);
        
        const start = performance.now(); 
        const sortedArray = await mergeSort(array); 
        const end = performance.now(); 
        
        renderArray(sortedArray, document.querySelector('#mergeSortArrayContainer')); 
        
        const elapsedTime = (end - start) / 1000; 
        document.getElementById('mergeSortTimer').textContent = `Time: ${elapsedTime.toFixed(2)}s`; 
    });
    
    quickSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
        console.log("Quick Sort started:", array);
        await quickSort(array);
        renderArray(array, document.querySelector('#quickSortArrayContainer')); 
    });
    
});

function initializeArrayAndTimer(sortingAlgorithm, array) {
    const arrayContainer = document.querySelector(`#${sortingAlgorithm}ArrayContainer`);
    const timerElement = document.querySelector(`#${sortingAlgorithm}Timer`);
    
    renderArray(array, arrayContainer); 
    timerElement.textContent = 'Time: 0.00s'; 
}

function generateArray(){
    return [5, 9, 12, 7, 14, 21, 43, 35, 3];
}


function renderArray(arr, container) {
    container.innerHTML = ''; 
    arr.forEach(item => {
        const arrayItem = document.createElement('div');
        arrayItem.className = 'array-item';
        arrayItem.textContent = item;
        container.appendChild(arrayItem); // Append the array item to the specified container
    });
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swapBubbleSort(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    // Get the array item elements
    const arrayItems = document.querySelectorAll('.array-item');

    // Get the positions of the array items being swapped
    const rect1 = arrayItems[i].getBoundingClientRect();
    const rect2 = arrayItems[j].getBoundingClientRect();

    // Calculate the distance to move the array items
    const deltaX = rect2.left - rect1.left;
    const deltaY = rect2.top - rect1.top;

    // Animate the movement of array items
    arrayItems[i].style.transition = 'transform 0.3s ease-in-out';
    arrayItems[j].style.transition = 'transform 0.3s ease-in-out';
    arrayItems[i].style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    arrayItems[j].style.transform = `translate(-${deltaX}px, -${deltaY}px)`;

    // Wait for the animation to finish
    await sleep(300);

    // Update the text content of the array items
    arrayItems[i].textContent = arr[i];
    arrayItems[j].textContent = arr[j];

    // Reset the transform property
    arrayItems[i].style.transition = '';
    arrayItems[j].style.transition = '';
    arrayItems[i].style.transform = '';
    arrayItems[j].style.transform = '';
}

async function bubbleSort(arr) {
    const start = Date.now(); // Record start time
    const len = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            // Remove highlighting from previous comparison
            document.querySelectorAll('.array-item').forEach(item => item.classList.remove('compare'));

            // Highlight the elements being compared
            document.querySelectorAll('.array-item')[i].classList.add('compare');
            document.querySelectorAll('.array-item')[i + 1].classList.add('compare');

            if (arr[i] > arr[i + 1]) {
                await swapBubbleSort(arr, i, i + 1);
                swapped = true;
            }
            // Wait for the animation to finish
            await sleep(300);
        }
    } while (swapped);
    
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    document.getElementById('bubbleSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
    console.log("Bubble Sort finished:", arr);

    // Remove highlighting after sorting is complete
    document.querySelectorAll('.array-item').forEach(item => item.classList.remove('compare'));
}



async function insertionSort(arr) {
    const startTime = performance.now(); // Record start time with high precision
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
    
    const endTime = performance.now(); // Record end time with high precision
    const elapsedTime = endTime - startTime;

    let timeString;
    if (elapsedTime >= 1000) {
        const seconds = elapsedTime / 1000;
        timeString = `${seconds.toFixed(2)}s`; // Display time in seconds
    } else {
        timeString = `${elapsedTime.toFixed(2)}ms`; // Display time in milliseconds
    }

    document.getElementById('insertionSortTimer').textContent = `Time: ${timeString}`; // Update timer display
    console.log("Insertion Sort finished:", arr);
}

async function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, middle));
    const right = await mergeSort(arr.slice(middle));
    return merge(left, right);
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
