const mock_portals = [
    { location: 55, destination: 38 },
    { location: 14, destination: 35 },
    { location: 91, destination: 48 },
    { location: 30, destination: 8 },
    { location: 31, destination: 70 },
    { location: 63, destination: 83 },
    { location: 3, destination: 5 },
    { location: 47, destination: 86 },
    { location: 71, destination: 93 },
    { location: 21, destination: 4 },
    { location: 44, destination: 65 },
    { location: 96, destination: 66 },
    { location: 79, destination: 42 },
    { location: 87, destination: 54 },
    { location: 90, destination: 119 },
    { location: 120, destination: 149 },
    { location: 150, destination: 179 },
    { location: 180, destination: 200 }
]
function quickestPath({
    portals,
}: {
    portals: { location: number; destination: number }[];
}): number {
    const dict: Record<number, number> = {};
    for (const portal of portals) {
        dict[portal.location] = portal.destination;
    }

    const checked = new Set<number>();
    const queue = [{ position: 1, turn: 0 }];
    checked.add(1);

    while (queue.length > 0) {
        const { position, turn: turn } = queue.shift()!;

        if (position === 200) {
            return turn;
        }
        for (let step = 1; step <= 11; step++) {
            let next = position + step;
            if (dict[next] !== undefined && dict[next] > next) {
                next = dict[next];
            }
            if (!checked.has(next)) {
                checked.add(next);
                queue.push({ position: next, turn: turn + 1 });
            }
        }
    }

    return -1; 
}

console.log(quickestPath({ portals: mock_portals }));
