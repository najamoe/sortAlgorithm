document.addEventListener('DOMContentLoaded', () => {
    const bubbleSortButton = document.querySelector('.bubbleSortStartButton');
    const insertionSortButton = document.querySelector('.insertionSortStartButton');
    const mergeSortButton = document.querySelector('.mergeSortStartButton');
    const quickSortButton = document.querySelector('.quickSortStartButton');
    const slowInsertionSortButton = document.querySelector('.insertionSortSlowStartButton')

    initializeArrayAndTimer('bubbleSort', generateArray());
    initializeArrayAndTimer('insertionSort', generateArray());
    initializeArrayAndTimer('insertionSortSlow', generateArray());
    initializeArrayAndTimer('mergeSort', generateArray());
    initializeArrayAndTimer('quickSort', generateArray());

    bubbleSortButton.addEventListener('click', async () => {
        const array = generateArray();
        renderArray(array, document.querySelector('#bubbleSortArrayContainer'));
        
        // Show the modal
        const modal = document.getElementById('sortingModal');
        modal.style.display = "block";
    
        await bubbleSort(array);
    
        // Add event listener to close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    });
    
    
    insertionSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
    
        // Display the initial array in the modal
        renderArray(array, document.querySelector('#insertionSortArrayContainer'));
        const modal = document.getElementById('insertionSortModal');
        modal.style.display = "block";
    
        // Start measuring time
        const startTime = performance.now(); 
    
        // Call the insertion sort function
        await insertionSort(array); 
    
        // End measuring time
        const endTime = performance.now(); 
        const elapsedTime = endTime - startTime;
    
        // Display the sorted array in the modal
        renderArray(array, document.querySelector('#insertionSortArrayContainer'));
    
        // Get the time element and update it with the elapsed time
        const timeElement = document.getElementById('insertionSortTimer');
        timeElement.textContent = `Time: ${elapsedTime.toFixed(2)}ms`; // Display the elapsed time in milliseconds
    
    // Add event listener to close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    });
    
    

    slowInsertionSortButton.addEventListener('click', async () => {
        const array = generateArray(); 
        await insertionSortSlow(array); 
        renderArray(array, document.querySelector('#insertionSortSlowArrayContainer'));
    });
    
    mergeSortButton.addEventListener('click', async () => {
        // Show the modal
        const modal = document.getElementById('mergeSortModal');
        modal.style.display = "block";
    
        const array = generateArray(); // Generate the array
        const start = performance.now(); // Start measuring time
        const sortedArray = await mergeSort(array); // Perform merge sort
        const end = performance.now(); // End measuring time
    
        // Render the sorted array
        renderArray(sortedArray, document.querySelector('#mergeSortArrayContainer'));
    
        // Calculate and display the elapsed time
        const elapsedTime = (end - start) / 1000;
        document.getElementById('mergeSortTimer').textContent = `Time: ${elapsedTime.toFixed(2)}s`;
    
        // Get the close button element
        const closeButton = modal.querySelector('.close');
    
        // Add event listener to close the modal when the close button is clicked
        closeButton.addEventListener('click', () => {
            modal.style.display = "none";
        });
    });
    
    quickSortButton.addEventListener('click', async () => {
        // Show the modal
        const modal = document.getElementById('quickSortModal');
        modal.style.display = "block";
    
        const arrayContainer = document.querySelector('#quickSortArrayContainer');
        const timerElement = document.querySelector('#quickSortTimer');
        const array = generateArray(); 
        console.log("Quick Sort started:", array);
        const startTime = performance.now();
        await quickSort(array, 0, array.length - 1, arrayContainer, timerElement);
        console.log("Quick Sort finished:", array);
    
        // Get the close button element
        const closeButton = modal.querySelector('.close');
    
        // Add event listener to close the modal when the close button is clicked
        closeButton.addEventListener('click', () => {
            modal.style.display = "none";
        });
    });
});

function initializeArrayAndTimer(sortingAlgorithm, array, slow = false) {
    const arrayContainer = document.querySelector(`#${sortingAlgorithm}ArrayContainer`);
    const timerElement = document.querySelector(`#${sortingAlgorithm}Timer`);
    
    renderArray(array, arrayContainer); 
    timerElement.textContent = 'Time: 0.00s'; 

    if (slow) {
        const slowArrayContainer = document.createElement('div');
        slowArrayContainer.className = 'array-container';
        slowArrayContainer.id = `${sortingAlgorithm}SlowArrayContainer`;
        document.getElementById(sortingAlgorithm).appendChild(slowArrayContainer);

        const slowTimerElement = document.createElement('div');
        slowTimerElement.className = 'timer';
        slowTimerElement.id = `${sortingAlgorithm}SlowTimer`;
        document.getElementById(sortingAlgorithm).appendChild(slowTimerElement);

        renderArray(array, slowArrayContainer); 
        slowTimerElement.textContent = 'Time: 0.00s'; 
    }
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
        container.appendChild(arrayItem); 
    });
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swapAnimationBubbleSort(i, j) {
    // Get the array item elements
    const arrayItems = document.querySelectorAll('.bubble-sort-array .array-item');

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

    const arrayItems = document.querySelectorAll('.array-item');

    for (let i = 0; i < len - 1; i++) {
        swapped = false;
        for (let j = 0; j < len - 1 - i; j++) {
            arrayItems.forEach(item => item.classList.remove('bubbleCompare'));

            arrayItems[j].classList.add('bubbleCompare');
            arrayItems[j + 1].classList.add('bubbleCompare');

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                await swapAnimationBubbleSort(j, j + 1);
                swapped = true;
            }
            await sleep(300);
        }
        arrayItems[len - 1 - i].classList.add('bubbleSorted');

        if (!swapped) break;
    }

    for (let i = 0; i < len; i++) {
        arrayItems[i].classList.add('bubbleSorted');
    }

    const end = Date.now();
    const elapsedSeconds = (end - start) / 1000;
    document.getElementById('bubbleSortTimer').textContent = `Time: ${elapsedSeconds.toFixed(2)}s`;
}

async function insertionSort(arr) {
    const startTime = performance.now(); 
    
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    
    const endTime = performance.now(); 
    const elapsedTime = endTime - startTime;

    let timeString;
    if (elapsedTime >= 1000) {
        const seconds = elapsedTime / 1000;
        timeString = `${seconds.toFixed(2)}s`; 
    } else {
        timeString = `${elapsedTime.toFixed(2)}ms`;
    }

    document.getElementById('insertionSortTimer').textContent = `Time: ${timeString}`; 
    renderArray(arr, document.querySelector('#insertionSortArrayContainer'));
}

async function insertionSortSlow(arr) {
    const startTime = performance.now();
    const arrayContainer = document.getElementById('insertionSortSlowArrayContainer');

    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        let currentIndex = i;

        arrayContainer.children[currentIndex].classList.add('current-element');

       
        arrayContainer.children[currentIndex].classList.add('lifted');
        await sleep(300); 

        while (j >= 0 && arr[j] > current) {
            
            arrayContainer.children[j].style.transform = `translateX(${arrayContainer.children[currentIndex].offsetWidth}px)`;
            await sleep(300); 

            // Swap the elements in the array
            arr[j + 1] = arr[j];

            // Move the visual representation to the left
            arrayContainer.insertBefore(arrayContainer.children[currentIndex], arrayContainer.children[j]);

            j--;

           
            await sleep(300);
        }


        arr[j + 1] = current;

        // Move the current element visually to its correct position
        arrayContainer.children[currentIndex].style.transform = '';

        // Remove the lifted class to drop the element back down
        arrayContainer.children[currentIndex].classList.remove('lifted');

        // Remove the current element highlight
        arrayContainer.children[currentIndex].classList.remove('current-element');

        // Update the width of the array container dynamically based on the number of elements
        arrayContainer.style.width = `${(arr.length + 2) * (arrayContainer.children[0].offsetWidth + 54)}px`; 

      
        await sleep(300);

        // Update the visual representation of the array after each iteration
        renderArray(arr, arrayContainer);

        // Add animation delay
        await sleep(300);
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    let timeString;
    if (elapsedTime >= 1000) {
        const seconds = elapsedTime / 1000;
        timeString = `${seconds.toFixed(2)}s`;
    } else {
        timeString = `${elapsedTime.toFixed(2)}ms`;
    }

    document.getElementById('insertionSortSlowTimer').textContent = `Time: ${timeString}`;
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
    // Choose a random pivot index within the partition range
    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    
    // Swap the pivot element with the rightmost element
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

    let pivot = arr[right]; // Pivot is now the last element of the partition
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

    // Highlight the elements being compared
    arrayItems[left].classList.add('quickCompare');
    arrayItems[right].classList.add('quickCompare');

    // Wait for a short duration to visualize the partitioning
    await sleep(1000);

    // Remove highlighting after visualization
    arrayItems[pivotIndex].classList.remove('pivot');
    arrayItems[left].classList.remove('quickCompare');
    arrayItems[right].classList.remove('quickCompare');

    renderArray(arr, arrayContainer);
}




