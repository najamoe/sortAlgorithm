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
        const arrayContainer = document.querySelector('#quickSortArrayContainer');
        const timerElement = document.querySelector('#quickSortTimer');
        const array = generateArray(); 
        console.log("Quick Sort started:", array);
        const startTime = performance.now();
        await quickSort(array, 0, array.length - 1, arrayContainer, timerElement);
        console.log("Quick Sort finished:", array);
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

    // Add class for bubble sort animation
    arrayItems[i].classList.add('bubble-swap-animation');
    arrayItems[j].classList.add('bubble-swap-animation');

    // Wait for a short duration to allow for the animation to start
    await sleep(50);

    // Calculate the distance to move the array items
    const deltaX = arrayItems[j].offsetLeft - arrayItems[i].offsetLeft;
    const deltaY = arrayItems[j].offsetTop - arrayItems[i].offsetTop;

    // Animate the movement of array items
    arrayItems[i].style.transition = 'transform 0.3s ease-in-out';
    arrayItems[j].style.transition = 'transform 0.3s ease-in-out';
    arrayItems[i].style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    arrayItems[j].style.transform = `translate(-${deltaX}px, -${deltaY}px)`;

    // Wait for the animation to finish
    await sleep(300);

    // Swap the text content of array items
    [arrayItems[i].textContent, arrayItems[j].textContent] = [arrayItems[j].textContent, arrayItems[i].textContent];

    // Reset styles and remove class for bubble sort animation
    arrayItems[i].style.transition = '';
    arrayItems[j].style.transition = '';
    arrayItems[i].style.transform = '';
    arrayItems[j].style.transform = '';
    arrayItems[i].classList.remove('bubble-swap-animation');
    arrayItems[j].classList.remove('bubble-swap-animation');
}


async function bubbleSort(arr) {
    const start = Date.now(); 
    const len = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            // Remove highlighting from previous comparison
            document.querySelectorAll('.array-item').forEach(item => item.classList.remove('bubbleCompare'));

            // Highlight the elements being compared
            document.querySelectorAll('.array-item')[i].classList.add('bubbleCompare');
            document.querySelectorAll('.array-item')[i + 1].classList.add('bubbleCompare');

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
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    return merge(await left, await right);
}

async function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        await renderMergeState(left, right, leftIndex, rightIndex);
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

async function renderMergeState(left, right, leftIndex, rightIndex) {
    const container = document.querySelector('#mergeSortArrayContainer');
    const mergedArray = left.slice(0, leftIndex).concat(right.slice(0, rightIndex)).concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    renderArray(mergedArray, container);
    await sleep(300);
}


async function quickSort(arr, left = 0, right = arr.length - 1, arrayContainer, timerElement) {
    const start = Date.now(); // Record start time
    if (left < right) {
        let pivotIndex = await partition(arr, left, right, arrayContainer, timerElement);
        await animatePartition(arr, pivotIndex, left, right, arrayContainer, timerElement);
        await quickSort(arr, left, pivotIndex - 1, arrayContainer, timerElement);
        await quickSort(arr, pivotIndex + 1, right, arrayContainer, timerElement);
    }
    const end = Date.now(); // Record end time
    const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
    timerElement.textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
}

async function partition(arr, left, right, arrayContainer, timerElement) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            await swapQuickSort(arr, i, j, arrayContainer);
        }
    }
    await swapQuickSort(arr, i + 1, right, arrayContainer);
    renderArray(arr, arrayContainer);
    return i + 1;
}


async function swapQuickSort(arr, i, j, arrayContainer, sortingAlgorithm) {
    const arrayItems = arrayContainer.children;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    // Swap the text content of array items
    arrayItems[i].textContent = arr[i];
    arrayItems[j].textContent = arr[j];

    // Add swap animation class
    arrayItems[i].classList.add('quick-swap-animation');
    arrayItems[j].classList.add('quick-swap-animation');

    // Wait for the animation to finish
    await sleep(300);

    // Remove swap animation class
    arrayItems[i].classList.remove('quick-swap-animation');
    arrayItems[j].classList.remove('quick-swap-animation');
}

async function animatePartition(arr, pivotIndex, left, right, arrayContainer, timerElement) {
    const arrayItems = arrayContainer.children;

    // Highlight the pivot element
    arrayItems[pivotIndex].classList.add('pivot');

    // Create a temporary text element for the pivot label
    const pivotLabel = document.createElement('div');
    pivotLabel.textContent = 'Pivot';
    pivotLabel.classList.add('pivot-label');

    // Position the pivot label above the pivot element
    const pivotElement = arrayItems[pivotIndex];
    pivotElement.parentNode.insertBefore(pivotLabel, pivotElement);

    // Highlight the elements being compared
    arrayItems[left].classList.add('quickCompare');
    arrayItems[right].classList.add('quickCompare');

    // Wait for a short duration to visualize the partitioning
    await sleep(1000);

    // Remove highlighting and pivot label after visualization
    arrayItems[pivotIndex].classList.remove('pivot');
    if (pivotLabel && pivotLabel.parentNode) {
        pivotLabel.parentNode.removeChild(pivotLabel);
    }
    arrayItems[left].classList.remove('quickCompare');
    arrayItems[right].classList.remove('quickCompare');

    renderArray(arr, arrayContainer);
}



