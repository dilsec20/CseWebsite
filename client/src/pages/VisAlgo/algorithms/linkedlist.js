// Linked List Algorithm Logic
export const linkedListCode = `
struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

void insertAtTail(Node*& head, int data) {
    if (!head) {
        head = new Node(data);
        return;
    }
    Node* temp = head;
    while (temp->next) temp = temp->next;
    temp->next = new Node(data);
}

void deleteNode(Node*& head, int key) {
    if (!head) return;
    if (head->data == key) {
        Node* temp = head;
        head = head->next;
        delete temp;
        return;
    }
    Node* temp = head;
    while (temp->next && temp->next->data != key) {
        temp = temp->next;
    }
    if (temp->next) {
        Node* del = temp->next;
        temp->next = temp->next->next;
        delete del;
    }
}
`;

export const generateLinkedListSteps = (initialNodes, action, params) => {
    let nodes = initialNodes.map(n => ({ ...n }));
    const steps = [];

    const addStep = (desc, line, current = null, checking = null) => {
        steps.push({
            nodes: nodes.map(n => ({ ...n })),
            description: desc,
            line: line,
            currentNode: current,
            checkingNode: checking
        });
    };

    if (action === 'insertTail') {
        const newVal = params.value;
        addStep(`Inserting ${newVal} at the tail.`, 10);

        if (nodes.length === 0) {
            nodes.push({ value: newVal, id: Date.now() });
            addStep("List was empty. New node becomes head.", 12, nodes[0].id);
        } else {
            addStep("Traversing to find the last node.", 15);
            for (let i = 0; i < nodes.length; i++) {
                addStep(`Checking node ${nodes[i].value}`, 16, null, nodes[i].id);
            }
            nodes.push({ value: newVal, id: Date.now() });
            addStep(`Created new node ${newVal} and linked it to the tail.`, 17, nodes[nodes.length - 1].id);
        }
    }

    if (action === 'delete') {
        const key = params.value;
        addStep(`Searching for node with value ${key} to delete.`, 22);

        let foundIdx = -1;
        for (let i = 0; i < nodes.length; i++) {
            addStep(`Comparing ${nodes[i].value} with ${key}`, 31, null, nodes[i].id);
            if (nodes[i].value === key) {
                foundIdx = i;
                addStep(`Found node ${key}. Deleting...`, 32, nodes[i].id);
                break;
            }
        }

        if (foundIdx !== -1) {
            nodes.splice(foundIdx, 1);
            addStep("Node removed. Re-linking neighbors.", 35);
        } else {
            addStep(`Node with value ${key} not found.`, 30);
        }
    }

    return steps;
};
