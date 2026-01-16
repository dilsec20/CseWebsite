export const bfs = (grid, startNode, endNode, allowDiagonals = false) => {
    const steps = [];
    const queue = [startNode];
    const visited = new Set();
    const parent = {};
    visited.add(`${startNode.row}-${startNode.col}`);

    while (queue.length > 0) {
        const current = queue.shift();
        steps.push({
            type: 'visit',
            node: current,
            description: `Visiting cell (${current.row}, ${current.col})`
        });

        if (current.row === endNode.row && current.col === endNode.col) {
            return { steps, path: reconstructPath(parent, endNode) };
        }

        const neighbors = getNeighbors(grid, current, allowDiagonals);
        for (const neighbor of neighbors) {
            const key = `${neighbor.row}-${neighbor.col}`;
            if (!visited.has(key)) {
                visited.add(key);
                parent[key] = current;
                queue.push(neighbor);
                steps.push({ type: 'enqueue', node: neighbor, description: `Enqueuing neighbor (${neighbor.row}, ${neighbor.col})` });
            }
        }
    }
    return { steps, path: null };
};

export const dfs = (grid, startNode, endNode, allowDiagonals = false) => {
    const steps = [];
    const stack = [startNode];
    const visited = new Set();
    const parent = {};

    while (stack.length > 0) {
        const current = stack.pop();
        const key = `${current.row}-${current.col}`;

        if (visited.has(key)) continue;
        visited.add(key);

        steps.push({
            type: 'visit',
            node: current,
            description: `Visiting cell (${current.row}, ${current.col})`
        });

        if (current.row === endNode.row && current.col === endNode.col) {
            return { steps, path: reconstructPath(parent, endNode) };
        }

        const neighbors = getNeighbors(grid, current, allowDiagonals);
        for (const neighbor of neighbors) {
            const nKey = `${neighbor.row}-${neighbor.col}`;
            if (!visited.has(nKey)) {
                parent[nKey] = current;
                stack.push(neighbor);
                steps.push({ type: 'push', node: neighbor, description: `Pushing neighbor (${neighbor.row}, ${neighbor.col}) to stack` });
            }
        }
    }
    return { steps, path: null };
};

export const dijkstra = (grid, startNode, endNode, allowDiagonals = false) => {
    const steps = [];
    const dist = {};
    const parent = {};
    const pq = [{ node: startNode, d: 0 }];

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            dist[`${r}-${c}`] = Infinity;
        }
    }
    dist[`${startNode.row}-${startNode.col}`] = 0;

    while (pq.length > 0) {
        pq.sort((a, b) => a.d - b.d);
        const { node: current, d } = pq.shift();
        const key = `${current.row}-${current.col}`;

        if (d > dist[key]) continue;

        steps.push({
            type: 'visit',
            node: current,
            description: `Visiting cell (${current.row}, ${current.col}) with distance ${d.toFixed(1)}`
        });

        if (current.row === endNode.row && current.col === endNode.col) {
            return { steps, path: reconstructPath(parent, endNode) };
        }

        const neighbors = getNeighbors(grid, current, allowDiagonals);
        for (const neighbor of neighbors) {
            const nKey = `${neighbor.row}-${neighbor.col}`;
            const weight = (neighbor.row !== current.row && neighbor.col !== current.col) ? 1.4 : 1;
            if (dist[key] + weight < dist[nKey]) {
                dist[nKey] = dist[key] + weight;
                parent[nKey] = current;
                pq.push({ node: neighbor, d: dist[nKey] });
                steps.push({
                    type: 'update',
                    node: neighbor,
                    description: `Updating distance of (${neighbor.row}, ${neighbor.col}) to ${dist[nKey].toFixed(1)}`
                });
            }
        }
    }
    return { steps, path: null };
};

export const astar = (grid, startNode, endNode, allowDiagonals = false) => {
    const steps = [];
    const gScore = {};
    const fScore = {};
    const parent = {};
    const openSet = [{ node: startNode, f: heuristic(startNode, endNode, allowDiagonals) }];

    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            gScore[`${r}-${c}`] = Infinity;
            fScore[`${r}-${c}`] = Infinity;
        }
    }
    gScore[`${startNode.row}-${startNode.col}`] = 0;
    fScore[`${startNode.row}-${startNode.col}`] = heuristic(startNode, endNode, allowDiagonals);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const { node: current } = openSet.shift();
        const key = `${current.row}-${current.col}`;

        steps.push({
            type: 'visit',
            node: current,
            description: `Visiting cell (${current.row}, ${current.col}), f: ${fScore[key].toFixed(1)}`
        });

        if (current.row === endNode.row && current.col === endNode.col) {
            return { steps, path: reconstructPath(parent, endNode) };
        }

        const neighbors = getNeighbors(grid, current, allowDiagonals);
        for (const neighbor of neighbors) {
            const nKey = `${neighbor.row}-${neighbor.col}`;
            const weight = (neighbor.row !== current.row && neighbor.col !== current.col) ? 1.4 : 1;
            const tentativeG = gScore[key] + weight;

            if (tentativeG < gScore[nKey]) {
                parent[nKey] = current;
                gScore[nKey] = tentativeG;
                fScore[nKey] = tentativeG + heuristic(neighbor, endNode, allowDiagonals);
                if (!openSet.find(o => o.node.row === neighbor.row && o.node.col === neighbor.col)) {
                    openSet.push({ node: neighbor, f: fScore[nKey] });
                }
                steps.push({
                    type: 'update',
                    node: neighbor,
                    description: `New f-score for (${neighbor.row}, ${neighbor.col}): ${fScore[nKey].toFixed(1)}`
                });
            }
        }
    }
    return { steps, path: null };
};

export const primsMSTGrid = (grid, startNode, allowDiagonals = false) => {
    const steps = [];
    const visited = new Set();
    const mstEdges = [];
    const pq = [{ from: null, to: startNode, weight: 0 }];

    while (pq.length > 0) {
        pq.sort((a, b) => a.weight - b.weight);
        const { from, to, weight } = pq.shift();
        const key = `${to.row}-${to.col}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (from) {
            mstEdges.push({ from, to });
            steps.push({
                type: 'mst-edge',
                from,
                to,
                description: `Adding edge from (${from.row}, ${from.col}) to (${to.row}, ${to.col}) to MST`
            });
        } else {
            steps.push({
                type: 'visit',
                node: to,
                description: `Starting MST from (${to.row}, ${to.col})`
            });
        }

        const neighbors = getNeighbors(grid, to, allowDiagonals);
        for (const neighbor of neighbors) {
            const nKey = `${neighbor.row}-${neighbor.col}`;
            if (!visited.has(nKey)) {
                const weight = (neighbor.row !== to.row && neighbor.col !== to.col) ? 1.4 : 1;
                pq.push({ from: to, to: neighbor, weight: weight });
            }
        }
    }
    return { steps, mstEdges };
};

const getNeighbors = (grid, node, allowDiagonals) => {
    const neighbors = [];
    const { row, col } = node;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    if (allowDiagonals) {
        directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
    }

    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            if (!grid[newRow][newCol].isWall) {
                neighbors.push({ row: newRow, col: newCol });
            }
        }
    }
    return neighbors;
};

const heuristic = (n1, n2, allowDiagonals) => {
    const dr = Math.abs(n1.row - n2.row);
    const dc = Math.abs(n1.col - n2.col);
    if (!allowDiagonals) return dr + dc;
    return (dr + dc) + (1.4 - 2) * Math.min(dr, dc); // Octile distance
};

const reconstructPath = (parent, endNode) => {
    const path = [];
    let current = endNode;
    while (current) {
        path.push(current);
        current = parent[`${current.row}-${current.col}`];
    }
    return path.reverse();
};

export const bfsCode = `void BFS(Node start, Node end) {
    queue.push(start);
    visited[start] = true;
    while (!queue.empty()) {
        Node curr = queue.front(); queue.pop();
        if (curr == end) return reconstructPath();
        for (Node n : getNeighbors(curr)) {
            if (!visited[n]) {
                visited[n] = true;
                parent[n] = curr;
                queue.push(n);
            }
        }
    }
}`;

export const dfsCode = `void DFS(Node start, Node end) {
    stack.push(start);
    while (!stack.empty()) {
        Node curr = stack.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        if (curr == end) return reconstructPath();
        for (Node n : getNeighbors(curr)) {
            if (!visited[n]) {
                parent[n] = curr;
                stack.push(n);
            }
        }
    }
}`;

export const dijkstraCode = `void Dijkstra(Node start, Node end) {
    dist[start] = 0;
    pq.push({0, start});
    while (!pq.empty()) {
        Node curr = pq.top().second; pq.pop();
        if (curr == end) return reconstructPath();
        for (Node n : getNeighbors(curr)) {
            if (dist[curr] + weight < dist[n]) {
                dist[n] = dist[curr] + weight;
                parent[n] = curr;
                pq.push({dist[n], n});
            }
        }
    }
}`;

export const astarCode = `void AStar(Node start, Node end) {
    gScore[start] = 0;
    fScore[start] = h(start, end);
    openSet.push(start);
    while (!openSet.empty()) {
        curr = openSet.popBest();
        if (curr == end) return reconstructPath();
        for (n : neighbors(curr)) {
            if (newG < gScore[n]) {
                parent[n] = curr;
                gScore[n] = newG;
                fScore[n] = gScore[n] + h(n, end);
            }
        }
    }
}`;

export const primsMSTCode = `void PrimMSTGrid(Node start) {
    pq.push({0, null, start});
    while (!pq.empty()) {
        e = pq.top(); pq.pop();
        if (visited[e.to]) continue;
        visited[e.to] = true;
        if (e.from) addMSTEdge(e.from, e.to);
        for (Node n : getNeighbors(e.to)) {
            if (!visited[n]) pq.push({weight(n), e.to, n});
        }
    }
}`;
