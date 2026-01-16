// Stack and Queue Algorithm Logic
export const stackCode = `
// Stack Implementation (LIFO)
stack<int> s;
s.push(10); // Adds to top
s.push(20);
int val = s.top(); // Returns 20
s.pop(); // Removes 20
`;

export const queueCode = `
// Queue Implementation (FIFO)
queue<int> q;
q.push(10); // Adds to back
q.push(20);
int val = q.front(); // Returns 10
q.pop(); // Removes 10
`;

export const generateStackSteps = (initialStack, action, value) => {
    let stack = [...initialStack];
    const steps = [];

    if (action === 'push') {
        steps.push({ items: [...stack], description: `Preparing to push ${value} onto stack.`, line: 4 });
        stack.push(value);
        steps.push({ items: [...stack], description: `Pushed ${value} to the top!`, line: 4, highlight: stack.length - 1 });
    } else if (action === 'pop') {
        if (stack.length === 0) {
            steps.push({ items: [], description: "Stack is empty. Cannot pop!", line: 6 });
        } else {
            const popped = stack[stack.length - 1];
            steps.push({ items: [...stack], description: `About to pop the top element: ${popped}`, line: 6, highlight: stack.length - 1 });
            stack.pop();
            steps.push({ items: [...stack], description: `Popped ${popped} from the stack.`, line: 6 });
        }
    }
    return steps;
};

export const generateQueueSteps = (initialQueue, action, value) => {
    let queue = [...initialQueue];
    const steps = [];

    if (action === 'enqueue') {
        steps.push({ items: [...queue], description: `Preparing to enqueue ${value} to the back.`, line: 4 });
        queue.push(value);
        steps.push({ items: [...queue], description: `Enqueued ${value} to the back of the queue.`, line: 4, highlight: queue.length - 1 });
    } else if (action === 'dequeue') {
        if (queue.length === 0) {
            steps.push({ items: [], description: "Queue is empty. Cannot dequeue!", line: 6 });
        } else {
            const dequeued = queue[0];
            steps.push({ items: [...queue], description: `About to dequeue the front element: ${dequeued}`, line: 6, highlight: 0 });
            queue.shift();
            steps.push({ items: [...queue], description: `Dequeued ${dequeued} from the front.`, line: 6 });
        }
    }
    return steps;
};
