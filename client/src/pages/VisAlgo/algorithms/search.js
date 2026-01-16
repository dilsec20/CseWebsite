export const binarySearch = (array, target) => {
    const steps = [];
    let low = 0;
    let high = array.length - 1;
    let found = false;

    steps.push({
        low,
        high,
        mid: null,
        found: null,
        description: `Starting Binary Search for ${target}`,
        line: 1 // Initial setup
    });

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        steps.push({
            low,
            high,
            mid,
            found: null,
            description: `Middle element is ${array[mid]} at index ${mid}`,
            line: 3 // Calculate mid
        });

        if (array[mid] === target) {
            steps.push({
                low,
                high,
                mid,
                found: mid,
                description: `Found ${target} at index ${mid}!`,
                line: 5 // Found
            });
            found = true;
            break;
        } else if (array[mid] < target) {
            steps.push({
                low,
                high,
                mid,
                found: null,
                description: `${array[mid]} < ${target}, moving low to mid + 1`,
                line: 7 // Move right
            });
            low = mid + 1;
        } else {
            steps.push({
                low,
                high,
                mid,
                found: null,
                description: `${array[mid]} > ${target}, moving high to mid - 1`,
                line: 9 // Move left
            });
            high = mid - 1;
        }
    }

    if (!found) {
        steps.push({
            low,
            high,
            mid: null,
            found: -1,
            description: `${target} not found in the array.`,
            line: 12 // Not found
        });
    }

    return steps;
};

export const binarySearchCode = `int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            low = mid + 1;
        else
            high = mid - 1;
    }
    return -1;
}`;

// Line mapping:
// 1: int low = 0...
// 2: while
// 3:   int mid...
// 4:
// 5:   if (arr[mid] == target)
// 6:       return mid;
// 7:   if (arr[mid] < target)
// 8:       low...
// 9:   else
// 10:      high...
// 11: }
// 12: return -1;
