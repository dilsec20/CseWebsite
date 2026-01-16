// Graph represented as Adjacency Dictionary: { nodeId: [neighborId, ...] }

export const bfs = (graph, startNode, targetNode) => {
    const steps = [];
    const queue = [startNode];
    const visited = new Set();
    const parent = {};
    const traversalOrder = [];
    visited.add(startNode);
    parent[startNode] = null;

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

        if (currentNode === targetNode && targetNode !== null) {
            steps.push({
                queue: [...queue],
                visited: [...visited],
                current: currentNode,
                description: `Target node ${targetNode} found!`,
                path: reconstructPath(parent, targetNode),
                line: 3
            });
            break;
        }

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
                parent[neighbor] = currentNode;
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

    // Final step to highlight path if target exists, or otherwise just end
    const finalPath = (targetNode !== null && visited.has(targetNode)) ? reconstructPath(parent, targetNode) : [];
    if (finalPath.length > 0) {
        steps.push({
            visited: [...visited],
            description: `BFS Complete. Path to ${targetNode} found.`,
            path: finalPath,
            result: finalPath, // Result is the path
            line: 10
        });
    } else {
        steps.push({
            visited: [...visited],
            description: `BFS Complete. All reachable nodes visited.`,
            result: traversalOrder, // Result is traversal order
            line: 10
        });
    }

    return steps;
};

export const dfs = (graph, startNode, targetNode) => {
    const steps = [];
    const stack = [startNode];
    const visited = new Set();
    const parent = {};
    const traversalOrder = [];

    steps.push({ stack: [...stack], visited: [...visited], current: null, description: `Starting DFS from ${startNode}`, line: 1 });

    while (stack.length > 0) {
        const u = stack.pop();
        if (!visited.has(u)) {
            visited.add(u);
            traversalOrder.push(u);
            steps.push({ stack: [...stack], visited: [...visited], current: u, description: `Visiting Node ${u}`, line: 3 });

            if (u === targetNode && targetNode !== null) {
                steps.push({
                    stack: [...stack],
                    visited: [...visited],
                    current: u,
                    description: `Target node ${targetNode} found!`,
                    path: reconstructPath(parent, targetNode),
                    line: 3
                });
                break;
            }

            const neighbors = graph[u] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                const v = neighbors[i];
                if (!visited.has(v)) {
                    stack.push(v);
                    parent[v] = u; // Note: In DFS, parent might be overwritten if visited multiple times before popping, but standard DFS tree logic works
                    steps.push({ stack: [...stack], visited: [...visited], current: u, checking: v, description: `Pushed ${v} to stack`, line: 6 });
                }
            }
        }
    }

    const finalPath = (targetNode !== null && visited.has(targetNode)) ? reconstructPath(parent, targetNode) : [];
    if (finalPath.length > 0) {
        steps.push({
            visited: [...visited],
            description: `DFS Complete. Path to ${targetNode} found.`,
            path: finalPath,
            result: finalPath,
            line: 10
        });
    } else {
        steps.push({
            visited: [...visited],
            description: `DFS Complete. All reachable nodes visited.`,
            result: traversalOrder,
            line: 10
        });
    }

    return steps;
};

export const dijkstra = (adj, startNode, targetNode, nodes) => {
    const steps = [];
    const dist = {};
    const parent = {};
    const unvisited = new Set();
    nodes.forEach(n => {
        dist[n.id] = Infinity;
        parent[n.id] = null;
        unvisited.add(n.id);
    });
    dist[startNode] = 0;

    steps.push({
        dist: { ...dist },
        visited: [],
        description: `Initial distances set to Infinity. Source is ${startNode}.`,
        line: 1
    });

    while (unvisited.size > 0) {
        let u = null;
        let minDist = Infinity;
        for (const node of unvisited) {
            if (dist[node] < minDist) { minDist = dist[node]; u = node; }
        }

        if (u === null || dist[u] === Infinity) break;
        unvisited.delete(u);

        steps.push({
            dist: { ...dist },
            visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)),
            current: u,
            description: `Pick node ${u} with min distance ${dist[u]}`,
            line: 3
        });

        if (u === targetNode && targetNode !== null) {
            steps.push({
                dist: { ...dist },
                current: u,
                description: `Target node ${targetNode} reached!`,
                path: reconstructPath(parent, targetNode),
                line: 3
            });
            break;
        }

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            if (unvisited.has(v)) {
                steps.push({ dist: { ...dist }, current: u, checking: v, description: `Checking edge to ${v}`, line: 5 });
                if (dist[u] + edge.w < dist[v]) {
                    dist[v] = dist[u] + edge.w;
                    parent[v] = u;
                    steps.push({
                        dist: { ...dist },
                        current: u,
                        checking: v,
                        description: `Update distance of ${v} to ${dist[v]} (via ${u})`,
                        line: 6
                    });
                }
            }
        }
    }

    const finalPath = targetNode !== null ? reconstructPath(parent, targetNode) : [];
    steps.push({
        dist: { ...dist },
        visited: nodes.map(n => n.id).filter(id => !unvisited.has(id)),
        description: targetNode !== null ? `Dijkstra complete. Shortest path to ${targetNode} found.` : "Dijkstra complete. All reachable nodes visited.",
        path: finalPath,
        line: 10
    });

    return steps;
};

const reconstructPath = (parent, target) => {
    const path = [];
    let curr = target;
    while (curr !== null && curr !== undefined) {
        path.push(curr);
        curr = parent[curr];
    }
    return path.length > 1 ? path.reverse() : []; // Only return path if it has at least start and end
};

export const prim = (adj, startNode, nodes) => {
    const steps = [];
    const key = {};
    const mstSet = new Set();
    const parent = {}; // To reconstruct MST edges
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

        // Collect current MST edges
        const currentMSTEdges = [];
        for (const node of mstSet) {
            if (parent[node] !== undefined) {
                currentMSTEdges.push({ u: parent[node], v: node });
            }
        }

        steps.push({ dist: { ...key }, visited: [...mstSet], mstEdges: currentMSTEdges, current: u, description: `Add ${u} to MST`, line: 3 });

        const neighbors = adj[u] || [];
        for (const edge of neighbors) {
            const v = edge.to;
            if (unvisited.has(v) && edge.w < key[v]) {
                key[v] = edge.w;
                parent[v] = u;
                steps.push({ dist: { ...key }, visited: [...mstSet], mstEdges: currentMSTEdges, current: u, checking: v, description: `Update key of ${v} to ${edge.w}`, line: 5 });
            }
        }
    }

    // Final MST Edges
    const finalMSTEdges = [];
    nodes.forEach(n => {
        if (parent[n.id] !== undefined) finalMSTEdges.push({ u: parent[n.id], v: n.id });
    });
    steps.push({ visited: [...mstSet], mstEdges: finalMSTEdges, description: "Prim's MST Completed.", line: 10 });

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
    // Final Step with plain mst list (already in 'mst' prop)
    steps.push({ mst: [...mst], description: "Kruskal's MST Completed.", line: 10 });
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
    steps.push({ inDegree: { ...inDegree }, queue: [], description: "Topological Sort Completed: " + result.join(" -> "), path: result, line: 10 });
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
    steps.push({ mst: [...mst], description: "Boruvka's MST Completed.", line: 10 });
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
            steps.push({ path: [...path, startNode], current: u, description: hasEdgeBack ? "Cycle found!" : "No edge back to start.", line: 8 });
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
export const bellmanFord = (edges, startNode, targetNode, nodes) => {
    const steps = [];
    const dist = {};
    const parent = {};
    nodes.forEach(n => {
        dist[n.id] = Infinity;
        parent[n.id] = null;
    });
    dist[startNode] = 0;

    steps.push({
        dist: { ...dist },
        description: `Initialized distances. Source: ${startNode}`,
        line: 1
    });

    // Relax edges |V| - 1 times
    for (let i = 1; i < nodes.length; i++) {
        let changed = false;
        steps.push({
            dist: { ...dist },
            description: `Iteration ${i}: Relaxing edges...`,
            line: 3
        });

        for (const edge of edges) {
            const u = edge.source;
            const v = edge.target;
            const w = edge.weight || 1;

            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                changed = true;
                steps.push({
                    dist: { ...dist },
                    current: u,
                    checking: v,
                    highlight: { u, v }, // highlight edge
                    description: `Relaxed edge ${u}->${v}. New dist[${v}] = ${dist[v]}`,
                    line: 6
                });
            } else {
                steps.push({
                    dist: { ...dist },
                    current: u,
                    checking: v,
                    highlight: { u, v },
                    description: `Checked edge ${u}->${v}. No update.`,
                    line: 4 // checking line
                });
            }
        }
        if (!changed) {
            steps.push({ description: "No changes in this iteration. Optimization: Stop early.", line: 8 });
            break;
        }
    }

    // Check for negative weight cycles (optional step usually, helpful for visualizer)
    for (const edge of edges) {
        const u = edge.source;
        const v = edge.target;
        const w = edge.weight || 1;
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            steps.push({
                dist: { ...dist },
                current: u,
                checking: v,
                description: `Negative cycle detected involving edge ${u}->${v}!`,
                line: 10
            });
            return steps;
        }
    }

    const finalPath = (targetNode !== null && dist[targetNode] !== Infinity) ? reconstructPath(parent, targetNode) : [];
    steps.push({
        dist: { ...dist },
        path: finalPath,
        description: targetNode !== null ? `Bellman-Ford Complete. Path found.` : "Bellman-Ford Complete. All reachable nodes updated.",
        line: 12
    });

    return steps;
};

export const floydWarshall = (adj, nodes, isDirected) => {
    // Note: FW is all-pairs. Visualizing it on a single graph view is complex.
    // We will visualize the iterations and maybe update a "current shortest path" matrix conceptually
    // or just animate the triplets.
    // For this visualizer's "dist" prop, we can't easily show N*N distances.
    // We will NOT update 'dist' on nodes to avoid confusion, or perhaps show dist from Node 0?
    // Let's decide to NOT show 'dist' labels on nodes during FW, but describe the updates.

    const steps = [];
    const dist = {}; // 2D map: dist[i][j]
    const next = {}; // To reconstruct path
    const nodeIds = nodes.map(n => n.id);
    const INF = Infinity;

    // Initialize
    nodeIds.forEach(i => {
        dist[i] = {};
        next[i] = {};
        nodeIds.forEach(j => {
            if (i === j) dist[i][j] = 0;
            else dist[i][j] = INF;
            next[i][j] = null;
        });
    });

    // Edges
    // Reconstruct edge list from adj or passed edges.
    // Assuming adj is passed: { u: [{to: v, w: w}, ...] }
    Object.keys(adj).forEach(u => {
        adj[u].forEach(edge => {
            dist[u][edge.to] = edge.w;
            next[u][edge.to] = edge.to;
        });
    });

    steps.push({ description: "Initialized distance matrix.", line: 1 });

    for (const k of nodeIds) {
        steps.push({ current: k, description: `Pivot Node k=${k}. Checking all pairs (i, j) passing through ${k}...`, line: 2 });
        for (const i of nodeIds) {
            for (const j of nodeIds) {
                if (dist[i][k] !== INF && dist[k][j] !== INF) {
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[k][j]; //Standard FW path reconstruction update uses next[i][j] = next[i][k], wait.
                        // Actually standard is: next[i][j] = next[i][k]. Wait, for 'next' meaning "next step from i to j".
                        // Let's use standard predecessor logic or next pointer.
                        // Standard: if path goes i->...->k->...->j.
                        // If we use predecessor: pred[i][j] = pred[k][j].
                        // If we use next: next[i][j] = next[i][k]. Correct.
                        // Let's stick to simplest.
                        // Correct logic for 'next' pointer initialization:
                        // if edge (u,v), next[u][v] = v.
                        // Update: next[i][j] = next[i][k].
                        next[i][j] = next[i][k];

                        steps.push({
                            current: k,
                            checking: j, // roughly saying we are checking j relative to i via k
                            // highlight: {u: i, v: j}, // Can't easily highlight 'virtual' edge i->j
                            description: `Update dist(${i}, ${j}) = ${dist[i][j]} (via ${k})`,
                            line: 4
                        });
                    }
                }
            }
        }
    }

    steps.push({ description: "Floyd-Warshall Complete. All-pairs shortest paths computed.", line: 8 });
    return steps;
};


export const bellmanFordCode = `void BellmanFord(int src) {
    dist[src] = 0;
    for(int i=0; i<V-1; i++) {
        for(auto e : edges) {
            if(dist[e.u] + e.w < dist[e.v]) {
                dist[e.v] = dist[e.u] + e.w;
            }
        }
    }
}`;

export const floydWarshallCode = `void FloydWarshall() {
    for(int k=0; k<V; k++) {
        for(int i=0; i<V; i++) {
            for(int j=0; j<V; j++) {
                if(dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`;
