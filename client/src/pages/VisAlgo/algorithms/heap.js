// Heap Algorithm Logic (Max Heap)
export const heapCode = `
void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void buildHeap(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
}
`;

export const getHeapSteps = (initialArray, action, value) => {
    let arr = [...initialArray];
    const steps = [];

    const addStep = (description, line, highlight = [], color = 'compare') => {
        steps.push({
            array: [...arr],
            description,
            line,
            highlight,
            color
        });
    };

    const heapify = (idx, n) => {
        let largest = idx;
        let l = 2 * idx + 1;
        let r = 2 * idx + 2;

        addStep(`Checking Node ${idx} and its children.`, 3, [idx, l, r]);

        if (l < n && arr[l] > arr[largest]) largest = l;
        if (r < n && arr[r] > arr[largest]) largest = r;

        if (largest !== idx) {
            addStep(`Node ${idx} is smaller than child ${largest}. Swapping.`, 13, [idx, largest], 'swap');
            [arr[idx], arr[largest]] = [arr[largest], arr[idx]];
            addStep(`Swapped ${arr[largest]} and ${arr[idx]}.`, 14, [idx, largest], 'sorted');
            heapify(largest, n);
        } else {
            addStep(`Node ${idx} is in correct heap position.`, 12, [idx], 'sorted');
        }
    };

    if (action === 'insert') {
        addStep(`Inserting ${value} at the end of the heap.`, 1);
        arr.push(value);
        addStep("Inserted. Now 'bubbling up' to maintain heap property.", 1);

        let i = arr.length - 1;
        while (i > 0) {
            let parent = Math.floor((i - 1) / 2);
            addStep(`Comparing element ${arr[i]} with its parent ${arr[parent]}.`, 3, [i, parent]);
            if (arr[i] > arr[parent]) {
                addStep("Child is larger. Swapping with parent.", 13, [i, parent], 'swap');
                [arr[i], arr[parent]] = [arr[parent], arr[i]];
                i = parent;
            } else {
                break;
            }
        }
        addStep("Heap property restored.", 1, [], 'sorted');
    }

    if (action === 'build') {
        addStep("Starting Build Heap process from the last non-leaf node.", 20);
        for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
            heapify(i, arr.length);
        }
        addStep("Heap built successfully!", 21, [], 'sorted');
    }

    return steps;
};
