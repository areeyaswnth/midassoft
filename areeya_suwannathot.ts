function getMinMove(
start:string, target:string, brokenTiles: string[]): number {
    function boradPos(pos: string): [number, number] {
        const col = pos.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(pos[1]);
        return [row, col];
    }
    const memo = Array.from({ length: 8 }, () => Array(8).fill(-1));
    const visited = new Set();
    const brokenSet = new Set()
    for (let i=0 ;i<brokenTiles.length;i++){
        brokenSet.add(boradPos(brokenTiles[i]).join(','))
    }
    const startPos=boradPos(start)
    const targetPos=boradPos(target)
    function bfs(row:number,col:number){
        if (row>=8||col>=8||row<0||col<0) return  Infinity
        if (brokenSet.has(`${row},${col}`)) return Infinity;
        if (row===targetPos[0]&&col===targetPos[1]) return 0
        if (memo[row][col]!=-1) return memo[row][col]
        const key = `${row},${col}`;
        if (visited.has(key)) return Infinity;
        visited.add(key);
        const a = bfs(row - 2, col - 1);
        const b = bfs(row - 1, col - 2);
        const c = bfs(row + 1, col - 2);
        const d = bfs(row + 2, col - 1);
        const e = bfs(row + 2, col + 1);
        const f = bfs(row + 1, col + 2);
        const g = bfs(row - 1, col + 2);
        const h = bfs(row - 2, col + 1);
        const minMove = Math.min(a, b, c, d, e, f, g, h);
        memo[row][col] = minMove === Infinity ? Infinity : minMove + 1;
        visited.delete(key);
        return memo[row][col];    
    }
    const result = bfs(startPos[0], startPos[1]);
    return result === Infinity ? -1 : result;

}

console.log(getMinMove('d6','h8',['f6','f7'])) 