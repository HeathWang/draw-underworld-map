import {GemUnderWorldModel} from "../model/gemUnderWorldModel";
import map from "../pages/map";
import {ShowMapTile} from "../model/showMapTile";
import {imageR} from "../resource/imageR";

export {}

function findSevenStepPath(grid: number[][], x1: number, y1: number, x2: number, y2: number): { x: number, y: number }[] | null {
    const rows = grid.length;
    const cols = grid[0].length;
    const maxSteps = 7;

    // 用于标记已访问的格子
    const visited: boolean[][] = new Array(rows);
    for (let i = 0; i < rows; i++) {
        visited[i] = new Array(cols).fill(false);
    }

    // 移动方向：上、下、左、右
    const dx: number[] = [-1, 1, 0, 0];
    const dy: number[] = [0, 0, -1, 1];

    // 存储路径的栈
    const pathStack: { x: number, y: number }[] = [];

    function dfs(x: number, y: number, steps: number): { x: number, y: number }[] | null {
        if (x === x2 && y === y2 && steps === maxSteps) {
            return pathStack.slice(); // 找到了7步路径
        }

        if (steps >= maxSteps) {
            return null; // 超过7步还没找到路径
        }

        for (let i = 0; i < 4; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];

            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !visited[newX][newY] && grid[newY][newX] === 1) {
                visited[newX][newY] = true;
                pathStack.push({ x: newX, y: newY });
                const result = dfs(newX, newY, steps + 1);
                visited[newX][newY] = false;
                pathStack.pop();

                if (result) {
                    return result;
                }
            }
        }

        return null;
    }

    if (grid[y1][x1] === 1) {
        pathStack.push({ x: x1, y: y1 });
        visited[x1][y1] = true;
        const result = dfs(x1, y1, 0);
        visited[x1][y1] = false;
        pathStack.pop();
        return result;
    } else {
        return null;
    }
}

export const testFind = () => {
    // Example usage:
    const grid: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    const startX: number = 0;
    const startY: number = 10;
    const endX: number = 4;
    const endY: number = 9;

    const sevenStepPath = findSevenStepPath(grid, startX, startY, endX, endY);

    if (sevenStepPath) {
        console.log("7-Step Path Found:");
        console.log(sevenStepPath);
    } else {
        console.log("No 7-Step Path Found.");
    }
}

export const findMapMainPath = async (mapData: GemUnderWorldModel, mapTileList: ShowMapTile[], gatesIndex: Record<string, number>): Promise<ShowMapTile[]> => {
    let grids: number[][] = [];
    for (let i = 0; i < mapTileList.length; i += 20) {
        const chunk = mapTileList.slice(i, i + 20);
        const list = chunk.map(item => {
            if (item.type === 'start' || item.type === "path" || item.type === "gate") {
                return 1;
            } else {
                return 0;
            }
        });
        grids.push(list);
    }

    const startTile = mapTileList.find(tile => tile.type === 'start');
    const gate1 = mapTileList[gatesIndex["0"]];
    const path1 = findSevenStepPath(grids, startTile?.x ?? 0, startTile?.y ?? 0, gate1.x, gate1.y);
    // console.log(`path1: ${JSON.stringify(path1)}`)

    const gate2 = mapTileList[gatesIndex["1"]];
    const path2 = findSevenStepPath(grids, gate1.x, gate1.y, gate2.x, gate2.y);
    // console.log(`path2: ${JSON.stringify(path2)}`)

    const gate3 = mapTileList[gatesIndex[2]];
    const path3 = findSevenStepPath(grids, gate2.x, gate2.y, gate3.x, gate3.y);
    // console.log(`path3: ${JSON.stringify(path3)}`)

    const gate4 = mapTileList[gatesIndex[3]];
    const path4 = findSevenStepPath(grids, gate3.x, gate3.y, gate4.x, gate4.y);
    // console.log(`path3: ${JSON.stringify(path4)}`)

    const gate5 = mapTileList[gatesIndex[4]];
    const path5 = findSevenStepPath(grids, gate4.x, gate4.y, gate5.x, gate5.y);
    // console.log(`path3: ${JSON.stringify(path5)}`)

    const gate6 = mapTileList[gatesIndex[5]];
    const path6 = findSevenStepPath(grids, gate5.x, gate5.y, gate6.x, gate6.y);
    // console.log(`path3: ${JSON.stringify(path6)}`)

    let mainPathList: {x: number, y: number}[] = []
    if (path1 != null) {
        mainPathList.push(...path1.slice(1, -1));
    }

    if (path2 != null) {
        mainPathList.push(...path2.slice(1, -1));
    }

    if (path3 != null) {
        mainPathList.push(...path3.slice(1, -1));
    }

    if (path4 != null) {
        mainPathList.push(...path4.slice(1, -1));
    }

    if (path5 != null) {
        mainPathList.push(...path5.slice(1, -1));
    }

    if (path6 != null) {
        mainPathList.push(...path6.slice(1, -1));
    }

    // console.log(`mainPathList: ${JSON.stringify(mainPathList)}`);

    mainPathList.forEach((item, index) => {
        const tile = mapTileList.find(tile => tile.x === item.x && tile.y === item.y);
        if (tile != null) {
            tile.type = 'mainpath';
            tile.icon = imageR.run;
            tile.background = 'rgba(225,121,107,0.8)';
        }
    });

    return mapTileList;
}

