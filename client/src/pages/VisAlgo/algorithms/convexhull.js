// Convex Hull Algorithm Logic (Graham Scan)
export const convexHullCode = `
struct Point { int x, y; };

int orientation(Point p, Point q, Point r) {
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // collinear
    return (val > 0)? 1 : 2; // clock or counterclock
}

void convexHull(Point points[], int n) {
    // 1. Find the bottommost point
    // 2. Sort points by polar angle
    // 3. Process points
    vector<Point> hull;
    hull.push_back(p1);
    hull.push_back(p2);
    for (int i = 2; i < n; i++) {
        while (hull.size() > 1 && orientation(hull[hull.size()-2], hull.back(), points[i]) != 2)
            hull.pop_back();
        hull.push_back(points[i]);
    }
}
`;

export const getConvexHullSteps = (points) => {
    if (points.length < 3) return [{ points, hull: [], description: "Need at least 3 points!", line: 12 }];

    const steps = [];
    const pts = [...points].sort((a, b) => a.y - b.y || a.x - b.x);
    const p0 = pts[0];

    steps.push({ points: pts, hull: [], description: "Found bottom-most point.", line: 12, highlight: [p0] });

    // Step 2: Sort points by polar angle with p0
    const sortedPts = pts.slice(1).sort((a, b) => {
        const order = orientation(p0, a, b);
        if (order === 0) return distSq(p0, a) - distSq(p0, b);
        return order === 2 ? -1 : 1;
    });
    const finalPts = [p0, ...sortedPts];
    steps.push({ points: finalPts, hull: [], description: "Sorted points by polar angle.", line: 14 });

    // Graham Scan
    const hull = [finalPts[0], finalPts[1]];
    steps.push({ points: finalPts, hull: [...hull], description: "Added first two points to hull.", line: 16 });

    for (let i = 2; i < finalPts.length; i++) {
        steps.push({ points: finalPts, hull: [...hull], checking: finalPts[i], description: `Checking point ${i}...`, line: 18 });

        while (hull.length > 1 && orientation(hull[hull.length - 2], hull[hull.length - 1], finalPts[i]) !== 2) {
            const popped = hull.pop();
            steps.push({ points: finalPts, hull: [...hull], description: `Orientation not counter-clockwise. Removing ${popped.x},${popped.y}`, line: 19 });
        }
        hull.push(finalPts[i]);
        steps.push({ points: finalPts, hull: [...hull], description: `Added point ${finalPts[i].x},${finalPts[i].y} to hull.`, line: 20 });
    }

    steps.push({ points: finalPts, hull: [...hull], description: "Convex Hull Completed!", line: 20 });
    return steps;
};

const orientation = (p, q, r) => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
};

const distSq = (p1, p2) => (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
