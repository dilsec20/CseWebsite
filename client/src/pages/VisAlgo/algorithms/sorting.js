export const bubbleSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        // Mark starting of a pass
        steps.push({
            array: [...arr],
            highlight: [],
            description: `Starting pass ${i + 1}`,
            line: 1 // for loop i
        });

        for (let j = 0; j < n - i - 1; j++) {
            // Compare arr[j] and arr[j+1]
            steps.push({
                array: [...arr],
                highlight: [j, j + 1],
                color: 'compare', // yellow
                description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
                line: 3 // if (arr[j] > arr[j+1])
            });

            if (arr[j] > arr[j + 1]) {
                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;

                steps.push({
                    array: [...arr],
                    highlight: [j, j + 1],
                    color: 'swap', // red/green
                    description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
                    line: 4 // swap
                });
            }
        }

        // Mark the last element as sorted
        steps.push({
            array: [...arr],
            highlight: [n - i - 1],
            color: 'sorted', // green
            description: `${arr[n - i - 1]} is sorted`,
            line: 1
        });

        if (!swapped) break;
    }

    // specific final sorted state
    steps.push({
        array: [...arr],
        highlight: arr.map((_, idx) => idx),
        color: 'sorted',
        description: 'Array is sorted!',
        line: 8
    });

    return steps;
};

export const selectionSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        steps.push({
            array: [...arr],
            highlight: [i],
            color: 'compare',
            description: `Starting pass ${i + 1}. Assume min is at index ${i} (val: ${arr[i]})`,
            line: 1
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                array: [...arr],
                highlight: [minIdx, j],
                color: 'compare',
                description: `Comparing min (${arr[minIdx]}) with check (${arr[j]})`,
                line: 3
            });

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                steps.push({
                    array: [...arr],
                    highlight: [minIdx],
                    color: 'swap', // Using red to indicate new min found
                    description: `New minimum found: ${arr[minIdx]} at index ${minIdx}`,
                    line: 4
                });
            }
        }

        if (minIdx !== i) {
            steps.push({
                array: [...arr],
                highlight: [i, minIdx],
                color: 'swap',
                description: `Swapping ${arr[i]} with new min ${arr[minIdx]}`,
                line: 6
            });

            let temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }

        steps.push({
            array: [...arr],
            highlight: [i],
            color: 'sorted',
            description: `${arr[i]} is now sorted`,
            line: 7
        });
    }

    // Final sorted
    steps.push({
        array: [...arr],
        highlight: arr.map((_, idx) => idx),
        color: 'sorted',
        description: 'Array is sorted!',
        line: 8
    });

    return steps;
};

export const bubbleSortCode = `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(&arr[j], &arr[j+1]);
            }
        }
    }
}`;

export const selectionSortCode = `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if (min_idx != i)
            swap(&arr[min_idx], &arr[i]);
    }
}`;

export const mergeSort = (array) => {
    const steps = [];
    const arr = [...array];
    const n = arr.length;

    const merge = (low, mid, high) => {
        const leftArr = [];
        const rightArr = [];

        for (let i = low; i <= mid; i++) leftArr.push(arr[i]);
        for (let i = mid + 1; i <= high; i++) rightArr.push(arr[i]);

        let i = 0, j = 0, k = low;

        steps.push({
            array: [...arr],
            highlight: [low, high], // Range being merged
            color: 'compare',
            description: `Merging range [${low}..${mid}] and [${mid + 1}..${high}]`,
            line: 3
        });

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({
                array: [...arr],
                highlight: [low + i, mid + 1 + j], // visual approximation of comparison
                color: 'compare',
                description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
                line: 5
            });

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                steps.push({
                    array: [...arr],
                    highlight: [k],
                    color: 'swap',
                    description: `Placed ${leftArr[i]} at index ${k}`,
                    line: 7
                });
                i++;
            } else {
                arr[k] = rightArr[j];
                steps.push({
                    array: [...arr],
                    highlight: [k],
                    color: 'swap',
                    description: `Placed ${rightArr[j]} at index ${k}`,
                    line: 9
                });
                j++;
            }
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            steps.push({
                array: [...arr],
                highlight: [k],
                color: 'swap',
                description: `Placed remaining ${leftArr[i]} at index ${k}`,
                line: 11
            });
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            steps.push({
                array: [...arr],
                highlight: [k],
                color: 'swap',
                description: `Placed remaining ${rightArr[j]} at index ${k}`,
                line: 13
            });
            j++;
            k++;
        }
    };

    const divide = (low, high) => {
        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            divide(low, mid);
            divide(mid + 1, high);
            merge(low, mid, high);
        }
    };

    divide(0, n - 1);

    steps.push({
        array: [...arr],
        highlight: arr.map((_, idx) => idx),
        color: 'sorted',
        description: 'Array is sorted!',
        line: 15
    });

    return steps;
};


export const mergeSortCode = `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`;
