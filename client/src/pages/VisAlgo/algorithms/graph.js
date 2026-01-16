// Graph represented as Adjacency Dictionary: { nodeId: [neighborId, ...] }

export const bfs = (graph, startNode) => {
    const steps = [];
    const queue = [startNode];
    const visited = new Set();
    const traversalOrder = [];
    visited.add(startNode);

    steps.push({
        queue: [...queue],
        visited: [...visited],
        current: null,
        description: `Starting BFS from node ${startNode}`,
        line: 1
    });

    while (queue.length > 0) {
        const currentNode = queue.shift();
        traversalOrder.push(currentNode);

        steps.push({
            queue: [...queue],
            visited: [...visited],
            current: currentNode,
            description: `Visiting Node ${currentNode}`,
            line: 3
        });

        const neighbors = graph[currentNode] || [];
        for (const neighbor of neighbors) {
            steps.push({
                queue: [...queue],
                visited: [...visited],
                current: currentNode,
                checking: neighbor,
                description: `Checking neighbor ${neighbor}`,
                line: 5
            });

            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                steps.push({
                    queue: [...queue],
                    visited: [...visited],
                    current: currentNode,
                    checking: neighbor,
                    description: `Node ${neighbor} not visited. Enqueued.`,
                    line: 7
                });
            }
        }
    }
    return steps;
};

export const dfs = (graph, startNode) => {
    const steps = [];
    const stack = [startNode];
    const visited = new Set();
    const traversalOrder = [];

    steps.push({ stack: [...stack], visited: [...visited], current: null, description: `Starting DFS from ${startNode}`, line: 1 });

    while (stack.length > 0) {
        const u = stack.pop();
        if (!visited.has(u)) {
            visited.add(u);
            traversalOrder.push(u);
            steps.push({ stack: [...stack], visited: [...visited], current: u, description: `Visiting Node ${u}`, line: 3 });

            const neighbors = graph[u] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const v = neighbors[i];
                if (!visited.has(v)) {
                    stack.push(v);
                    steps.push({ stack: [...stack], visited: [...visited], current: u, checking: v, description: `Pushed ${v} to stack`, line: 6 });
                }
            }
        }
    }
    return steps;
};

export const dijkstra = (adj, startNode, nodes) => {
    const steps = [];
    const dist = {};
    const unvisited = new Set();
    nodes.forEach(n => { dist[n.id] = Infinity; unvisited.add(n.id); });
    dist[startNode] = 0;

    steps.push({ dist: { ...dist }, visited: [], description: "Initial distances set to Infinity.", line: 1 });

    while (unvisited.size > 0) {
        let u = null;
        let minDist = Infinity;
        for (const node of unvisited) {
            if (dist[node] < minDist) { minDist = dist[node]; u = node; }
        }

        if (u === null || dist[u] === Infinity) break;
        unvisited.delete(u);

        steps.push({ dist: { ...dist }, visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)), current: u, description: `Pick node ${u} with min distance ${dist[u]}`, line: 3 });

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            if (unvisited.has(v)) {
                steps.push({ dist: { ...dist }, current: u, checking: v, description: `Relaxing edge to ${v}`, line: 5 });
                if (dist[u] + edge.w < dist[v]) {
                    dist[v] = dist[u] + edge.w;
                    steps.push({ dist: { ...dist }, current: u, checking: v, description: `Update distance of ${v} to ${dist[v]}`, line: 6 });
                }
            }
        }
    }
    return steps;
};

export const prim = (adj, startNode, nodes) => {
    const steps = [];
    const key = {};
    const mstSet = new Set();
    const unvisited = new Set(nodes.map(n => n.id));
    nodes.forEach(n => key[n.id] = Infinity);
    key[startNode] = 0;

    steps.push({ dist: { ...key }, visited: [], description: "Wait for growth.", line: 1 });

    while (unvisited.size > 0) {
        let u = null;
        let minKey = Infinity;
        for (const node of unvisited) {
            if (key[node] < minKey) { minKey = key[node]; u = node; }
        }
        if (u === null) break;

        unvisited.delete(u);
        mstSet.add(u);
        steps.push({ dist: { ...key }, visited: [...mstSet], current: u, description: `Add ${u} to MST`, line: 3 });

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            if (unvisited.has(v) && edge.w < key[v]) {
                key[v] = edge.w;
                steps.push({ dist: { ...key }, visited: [...mstSet], current: u, checking: v, description: `Update key of ${v} to ${edge.w}`, line: 5 });
            }
        }
    }
    return steps;
};

export const kruskal = (edges, nodes) => {
    const steps = [];
    const mst = [];
    const sortedEdges = [...edges].sort((a, b) => a.w - b.w);
    const parent = {};
    const find = (i) => parent[i] === i ? i : (parent[i] = find(parent[i]));
    const union = (i, j) => {
        const rootI = find(i); const rootJ = find(j);
        if (rootI !== rootJ) { parent[rootI] = rootJ; return true; }
        return false;
    };
    nodes.forEach(n => parent[n.id] = n.id);

    steps.push({ mst: [], description: "Sorted all edges by weight.", line: 1 });

    for (const edge of sortedEdges) {
        steps.push({ mst: [...mst], checking: edge, description: `Checking edge (${edge.u}-${edge.v}) [${edge.w}]`, line: 5 });
        if (union(edge.u, edge.v)) {
            mst.push(edge);
            steps.push({ mst: [...mst], highlight: edge, description: `Success! Added edge (${edge.u}-${edge.v}) to MST.`, line: 6 });
        } else {
            steps.push({ mst: [...mst], description: `Skipped edge (${edge.u}-${edge.v}) [Cycle]`, line: 8 });
        }
    }
    return steps;
};

export const topologicalSort = (adj, nodes) => {
    const steps = [];
    const inDegree = {};
    nodes.forEach(n => inDegree[n.id] = 0);
    Object.values(adj).forEach(edges => edges.forEach(e => inDegree[e.to]++));

    const queue = [];
    nodes.forEach(n => { if (inDegree[n.id] === 0) queue.push(n.id); });

    steps.push({ inDegree: { ...inDegree }, queue: [...queue], description: "Found nodes with In-Degree 0", line: 1 });
    const result = [];
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);
        steps.push({ inDegree: { ...inDegree }, queue: [...queue], current: u, description: `Visited ${u}`, line: 5 });
        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            inDegree[v]--;
            steps.push({ inDegree: { ...inDegree }, current: u, checking: v, description: `Decremented in-degree of ${v}`, line: 8 });
            if (inDegree[v] === 0) {
                queue.push(v);
                steps.push({ queue: [...queue], description: `${v} in-degree is 0. Enqueued.`, line: 9 });
            }
        }
    }
    return steps;
};

export const boruvka = (edges, nodes) => {
    const steps = [];
    const mst = [];
    const parent = {};
    const find = (i) => parent[i] === i ? i : (parent[i] = find(parent[i]));
    const union = (i, j) => { const rootI = find(i); const rootJ = find(j); if (rootI !== rootJ) { parent[rootI] = rootJ; return true; } return false; };
    nodes.forEach(n => parent[n.id] = n.id);

    let numTrees = nodes.length;
    steps.push({ mst: [], description: "Boruvka: Every node starts as its own component.", line: 1 });

    while (numTrees > 1) {
        const cheapest = {};
        for (const edge of edges) {
            const set1 = find(edge.u);
            const set2 = find(edge.v);
            if (set1 !== set2) {
                if (!cheapest[set1] || edge.w < cheapest[set1].w) cheapest[set1] = edge;
                if (!cheapest[set2] || edge.w < cheapest[set2].w) cheapest[set2] = edge;
            }
        }

        let changed = false;
        for (const set in cheapest) {
            const edge = cheapest[set];
            if (union(edge.u, edge.v)) {
                mst.push(edge);
                numTrees--;
                changed = true;
                steps.push({ mst: [...mst], highlight: edge, description: `Merged components using edge (${edge.u}-${edge.v})`, line: 5 });
            }
        }
        if (!changed) break;
    }
    return steps;
};

export const hamiltonianCycle = (adj, nodes) => {
    const steps = [];
    const path = [];
    const visited = new Set();
    const startNode = nodes[0]?.id;
    if (!startNode) return [];

    const solve = (u) => {
        path.push(u); visited.add(u);
        steps.push({ path: [...path], current: u, description: `Backtracking: Try node ${u}`, line: 5 });

        if (path.length === nodes.length) {
            const hasEdgeBack = (adj[u] || []).some(e => e.to === startNode);
            steps.push({ path: [...path], current: u, description: hasEdgeBack ? "Cycle found!" : "No edge back to start.", line: 8 });
            if (hasEdgeBack) return true;
        } else {
            for (const edge of (adj[u] || [])) {
                if (!visited.has(edge.to) && solve(edge.to)) return true;
            }
        }

        const popped = path.pop(); visited.delete(popped);
        steps.push({ path: [...path], current: popped, description: `Backtrack from ${popped}`, line: 10 });
        return false;
    };

    solve(startNode);
    return steps;
};

export const bfsCode = `void BFS(int s) {
    visited[s] = true; q.push(s);
    while(!q.empty()) {
        int u = q.front(); q.pop();
        for(int v : adj[u]) {
            if(!visited[v]) {
                visited[v] = true; q.push(v);
            }
        }
    }
}`;

export const dfsCode = `void DFS(int u) {
    visited[u] = true;
    for(int v : adj[u]) {
        if(!visited[v]) DFS(v);
    }
}`;

export const dijkstraCode = `void Dijkstra(int src) {
    dist[src] = 0; pq.push({0, src});
    while(!pq.empty()) {
        int u = pq.top().second; pq.pop();
        for(auto e : adj[u]) {
            if(dist[u] + e.w < dist[e.v]) {
                dist[e.v] = dist[u] + e.w;
                pq.push({dist[e.v], e.v});
            }
        }
    }
}`;

export const primsCode = `void Prim(int src) {
    key[src] = 0; pq.push({0, src});
    while(!pq.empty()) {
        int u = pq.top().second; pq.pop();
        inMST[u] = true;
        for(auto e : adj[u]) {
            if(!inMST[e.v] && e.w < key[e.v]) {
                key[e.v] = e.w; pq.push({key[e.v], e.v});
            }
        }
    }
}`;

export const kruskalCode = `void Kruskal() {
    sort(edges.begin(), edges.end());
    for(auto e : edges) {
        if(find(e.u) != find(e.v)) {
            union(e.u, e.v); mst.push_back(e);
        }
    }
}`;

export const boruvkaCode = `void Boruvka() {
    while(numTrees > 1) {
        for(auto e : edges) {
            updateCheapestForComponent(e);
        }
        for(auto e : cheapest) {
            if(union(e.u, e.v)) addMST(e);
        }
    }
}`;

export const topoCode = `void TopologicalSort() {
    for(int i=0; i<V; i++) if(inDegree[i]==0) q.push(i);
    while(!q.empty()) {
        int u = q.front(); q.pop(); res.push_back(u);
        for(int v : adj[u]) if(--inDegree[v]==0) q.push(v);
    }
}`;

export const hamiltonianCode = `bool Hamiltonian(int u) {
    if(path.size() == V) return hasEdgeBack(u);
    for(int v : adj[u]) {
        if(!visited[v]) {
            visited[v] = true;
            if(Hamiltonian(v)) return true;
            visited[v] = false;
        }
    }
    return false;
}`;
