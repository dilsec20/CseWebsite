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

// Map line numbers in logic to lines in the code string above (1-indexed)
// 1: for i
// 2:   // passed
// 3:   for j
// 4:       if >
// 5:           swap
