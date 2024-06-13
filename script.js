

document.addEventListener("DOMContentLoaded", () => {

  
  const bubbleSortButton = document.querySelector(".bubbleSortStartButton");
  const insertionSortButton = document.querySelector(".insertionSortStartButton");
  const mergeSortButton = document.querySelector(".mergeSortStartButton");
  const quickSortButton = document.querySelector(".quickSortStartButton");
  const slowInsertionSortButton = document.querySelector(".insertionSortSlowStartButton");

  initializeArrayAndTimer("bubbleSort", generateArray());
  initializeArrayAndTimer("insertionSort", generateArray());
  initializeArrayAndTimer("insertionSortSlow", generateArray());
  initializeArrayAndTimer("mergeSort", generateArray());
  initializeArrayAndTimer("quickSort", generateArray());

  bubbleSortButton.addEventListener("click", async () => {
    const array = generateArray();
    renderArray(array, document.querySelector("#bubbleSortArrayContainer"));

    
    const modal = document.getElementById("sortingModal");
    modal.style.display = "block";

    await bubbleSort(array);

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  insertionSortButton.addEventListener("click", async () => {
    const array = generateArray();

    renderArray(array, document.querySelector("#insertionSortArrayContainer"));
    const modal = document.getElementById("insertionSortModal");
    modal.style.display = "block";

    const startTime = performance.now();

    await insertionSort(array);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    renderArray(array, document.querySelector("#insertionSortArrayContainer"));

    const timeElement = document.getElementById("insertionSortTimer");
    timeElement.textContent = `Time: ${elapsedTime.toFixed(2)}ms`;

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  slowInsertionSortButton.addEventListener("click", async () => {
    const array = generateArray();
    renderArray(array, document.querySelector("#insertionSortSlowArrayContainer"));

    const modal = document.getElementById("insertionSortSlowModal");
    modal.style.display = "block";

    await insertionSortSlow(array);

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
  });

  mergeSortButton.addEventListener("click", async () => {
    const array = generateArray();
    renderArray(array, document.querySelector("#mergeSortArrayContainer"));

    const modal = document.getElementById("mergeSortModal");
    modal.style.display = "block";

    const canvas = document.getElementById('mergeSortCanvas');
    const ctx = canvas.getContext('2d');

    // Initial drawing of the array
    drawArray(array, ctx, canvas.width / array.length);

    const startTime = performance.now();
    const sortedArray = await mergeSort(array);
    const endTime = performance.now();
    const elapsedTime = (endTime - startTime) / 1000;

    // Final drawing of the sorted array
    drawArray(sortedArray, ctx, canvas.width / sortedArray.length);

    document.getElementById("mergeSortTimer").textContent = `Time: ${elapsedTime.toFixed(3)}s`;

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  quickSortButton.addEventListener("click", async () => {  
    const modal = document.getElementById("quickSortModal");
    modal.style.display = "block";

    const arrayContainer = document.querySelector("#quickSortArrayContainer");
    const timerElement = document.querySelector("#quickSortTimer");
    const array = generateArray();
    const startTime = performance.now();
    await quickSort(array, 0, array.length - 1, arrayContainer, timerElement);
    
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  });

  function initializeArrayAndTimer(sortingAlgorithm, array, slow = false) {
    const arrayContainer = document.querySelector(
      `#${sortingAlgorithm}ArrayContainer`
    );
    const timerElement = document.querySelector(`#${sortingAlgorithm}Timer`);
  
    renderArray(array, arrayContainer);
    timerElement.textContent = "Time: 0.00s";
  
    if (sortingAlgorithm === 'mergeSort') {
      const canvas = document.getElementById('mergeSortCanvas');
      const ctx = canvas.getContext('2d');
  
      drawArray(array, ctx, canvas.width / array.length);
  
      if (slow) {
        const slowArrayContainer = document.createElement("div");
        slowArrayContainer.className = "array-container";
        slowArrayContainer.id = `${sortingAlgorithm}SlowArrayContainer`;
        document.getElementById(sortingAlgorithm).appendChild(slowArrayContainer);
  
        const slowTimerElement = document.createElement("div");
        slowTimerElement.className = "timer";
        slowTimerElement.id = `${sortingAlgorithm}SlowTimer`;
        document.getElementById(sortingAlgorithm).appendChild(slowTimerElement);
  
        renderArray(array, slowArrayContainer);
        slowTimerElement.textContent = "Time: 0.00s";
  
        // Create a canvas and draw the array on it for the slow container
        const slowCanvas = document.createElement('canvas');
        slowCanvas.width = array.length * 10; // Adjust the width based on the array length
        slowCanvas.height = 200; // Adjust the height as needed
        const slowContext = slowCanvas.getContext('2d');
  
        // Draw the array on the slow canvas
        drawArray(array, slowContext, 10);
  
        // Append the slow canvas to the slow array container
        slowArrayContainer.appendChild(slowCanvas);
      }
    }
  }
  
function generateArray() {
  return [5, 9, 12, 7, 14, 21, 43, 35, 3];
}

function renderArray(arr, container, useSVG = false) {
  container.innerHTML = ""; // Clear previous content

    arr.forEach((item) => {
      const arrayItem = document.createElement("div");
      arrayItem.className = "array-item";
      arrayItem.textContent = item;
      container.appendChild(arrayItem);
    });
  }


async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swapAnimationBubbleSort(i, j) {
  const arrayItems = document.querySelectorAll(".bubble-sort-array .array-item");

  const deltaX = arrayItems[j].offsetLeft - arrayItems[i].offsetLeft;

  arrayItems[i].classList.add("bubble-swap-animation");
  arrayItems[j].classList.add("bubble-swap-animation");

  arrayItems[i].style.transform = `translateX(${deltaX}px)`;
  arrayItems[j].style.transform = `translateX(-${deltaX}px)`;

  await sleep(300);

  [arrayItems[i].textContent, arrayItems[j].textContent] = [
    arrayItems[j].textContent,
    arrayItems[i].textContent,
  ];

  arrayItems[i].style.transform = "";
  arrayItems[j].style.transform = "";

  arrayItems[i].classList.remove("bubble-swap-animation");
  arrayItems[j].classList.remove("bubble-swap-animation");
}

async function bubbleSort(arr) {
  const start = Date.now();
  const len = arr.length;
  let swapped;

  const arrayItems = document.querySelectorAll(".array-item");

  for (let i = 0; i < len - 1; i++) {
    swapped = false;
    for (let j = 0; j < len - 1 - i; j++) {
      arrayItems.forEach((item) => item.classList.remove("bubbleCompare"));

      arrayItems[j].classList.add("bubbleCompare");
      arrayItems[j + 1].classList.add("bubbleCompare");

      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        await swapAnimationBubbleSort(j, j + 1);
        swapped = true;
      }
      await sleep(300);
    }
    arrayItems[len - 1 - i].classList.add("bubbleSorted");

    if (!swapped) break;
  }

  for (let i = 0; i < len; i++) {
    arrayItems[i].classList.add("bubbleSorted");
  }

  const end = Date.now();
  const elapsedSeconds = (end - start) / 1000;
  document.getElementById(
    "bubbleSortTimer"
  ).textContent = `Time: ${elapsedSeconds.toFixed(2)}s`;
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

  document.getElementById(
    "insertionSortTimer"
  ).textContent = `Time: ${timeString}`;
  renderArray(arr, document.querySelector("#insertionSortArrayContainer"));
}

async function insertionSortSlow(arr) {
  const startTime = performance.now();
  const arrayContainer = document.getElementById("insertionSortSlowArrayContainer");

  for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      let currentIndex = i;

      const currentElement = arrayContainer.children[currentIndex];
      currentElement.classList.add("current-element", "lifted");
      await sleep(300);

      while (j >= 0 && arr[j] > current) {
          const movedElement = arrayContainer.children[j];
          
          movedElement.classList.add("moved");
          await sleep(300);

          arr[j + 1] = arr[j];
          arrayContainer.insertBefore(currentElement, arrayContainer.children[j]);

          j--;
          await sleep(300);
      }

      arr[j + 1] = current;
      currentElement.classList.remove("lifted", "current-element");
      currentElement.style.transform = "";

      for (let k = 0; k < arrayContainer.children.length; k++) {
          arrayContainer.children[k].classList.remove("moved");
          arrayContainer.children[k].style.transform = "";
      }

      renderArray(arr, arrayContainer);
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

  document.getElementById("insertionSortSlowTimer").textContent = `Time: ${timeString}`;
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

  result = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  return result;
}
function drawArray(arr, ctx, barWidth) {
  const canvasHeight = ctx.canvas.height;
  const maxValue = Math.max(...arr);
  const scaleFactor = canvasHeight / maxValue;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  arr.forEach((value, index) => {
    const x = index * barWidth;
    const barHeight = value * scaleFactor;
    ctx.fillStyle = 'black';
    ctx.fillRect(x, canvasHeight - barHeight, barWidth - 1, barHeight);
  });
}



async function quickSort(
  arr,
  left = 0,
  right = arr.length - 1,
  arrayContainer,
  timerElement
) {
  const start = Date.now(); // Record start time
  if (left < right) {
    let pivotIndex = await partition(
      arr,
      left,
      right,
      arrayContainer,
      timerElement
    );
    await animatePartition(
      arr,
      pivotIndex,
      left,
      right,
      arrayContainer,
      timerElement
    );
    await quickSort(arr, left, pivotIndex - 1, arrayContainer, timerElement);
    await quickSort(arr, pivotIndex + 1, right, arrayContainer, timerElement);
  }
  const end = Date.now(); // Record end time
  const elapsedSeconds = (end - start) / 1000; // Calculate elapsed seconds
  timerElement.textContent = `Time: ${elapsedSeconds.toFixed(2)}s`; // Update timer display
}

async function partition(arr, left, right, arrayContainer, timerElement) {
  
  const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;

  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

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

  arrayItems[i].textContent = arr[i];
  arrayItems[j].textContent = arr[j];

  arrayItems[i].classList.add("quick-swap-animation");
  arrayItems[j].classList.add("quick-swap-animation");

  await sleep(300);

  arrayItems[i].classList.remove("quick-swap-animation");
  arrayItems[j].classList.remove("quick-swap-animation");
}

async function animatePartition(
  arr,
  pivotIndex,
  left,
  right,
  arrayContainer,
  timerElement
) {
  const arrayItems = arrayContainer.children;

  // Highlight the pivot element
  arrayItems[pivotIndex].classList.add("pivot");

  // Highlight the elements being compared
  arrayItems[left].classList.add("quickCompare");
  arrayItems[right].classList.add("quickCompare");

  // Wait for a short duration to visualize the partitioning
  await sleep(1000);

  // Remove highlighting after visualization
  arrayItems[pivotIndex].classList.remove("pivot");
  arrayItems[left].classList.remove("quickCompare");
  arrayItems[right].classList.remove("quickCompare");

  renderArray(arr, arrayContainer);
}

