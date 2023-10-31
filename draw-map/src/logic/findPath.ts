import {GemUnderWorldModel} from "../model/gemUnderWorldModel";
import map from "../pages/map";
import {ShowMapTile} from "../model/showMapTile";
import {imageR} from "../resource/imageR";
import {DIR} from "../const/mapInfoDefine";

export {}

function findSevenStepPath(grid: number[][], x1: number, y1: number, x2: number, y2: number): { x: number, y: number }[][] {
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

    const paths: { x: number, y: number }[][] = [];

    function dfs(x: number, y: number, steps: number): void {
        if (x === x2 && y === y2 && steps === maxSteps) {
            paths.push(pathStack.slice()); // 找到了7步路径
            return;
        }

        if (steps >= maxSteps) {
            return; // 超过7步还没找到路径
        }

        for (let i = 0; i < 4; i++) {
            const newX = x + dx[i];
            const newY = y + dy[i];

            if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && !visited[newY][newX] && grid[newY][newX] === 1) {
                visited[newY][newX] = true;
                pathStack.unshift({ x: newX, y: newY });
                dfs(newX, newY, steps + 1);
                visited[newY][newX] = false;
                pathStack.shift();
            }
        }
    }

    if (grid[y1][x1] === 1) {
        pathStack.unshift({ x: x1, y: y1 });
        visited[y1][x1] = true;
        dfs(x1, y1, 0);
    }

    return paths;
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

// 上右下左对应0123
export const nextPath = (x: number, y: number, dir: number) => {
    let nextX = x;
    let nextY = y;
    if (dir === 0) {
        nextY = y - 1;
    } else if (dir === 1) {
        nextX = x + 1;
    } else if (dir === 2) {
        nextY = y + 1;
    } else if (dir === 3) {
        nextX = x - 1;
    }
    return {x: nextX, y: nextY};
}

export const meNextArrow = (dir: number): DIR => {
    if (dir === 0) {
        return 'up';
    } else if (dir === 1) {
        return 'right';
    } else if (dir === 2) {
        return 'down';
    } else if (dir === 3) {
        return 'left';
    } else {
        return 'up';
    }
}

export const findMapMainPath = async (mapData: GemUnderWorldModel, mapTileList: ShowMapTile[], gatesIndex: Record<string, {"node": number, "Dir": number}>): Promise<ShowMapTile[]> => {
    let grids: number[][] = [];
    let mainPathList: {x: number, y: number}[] = []
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
    console.log(`gateIndex: ${JSON.stringify(gatesIndex)}`);
    const gate1 = mapTileList[`${gatesIndex["0"].node}`];
    console.log(`gate1: ${JSON.stringify(gate1)}`);
    const gate1Dir = gatesIndex["0"].Dir;
    const path1 = findSevenStepPath(grids, startTile?.x ?? 0, startTile?.y ?? 0, gate1.x, gate1.y);
    console.log(`path1: ${JSON.stringify(path1)}`)

    // const gate2 = mapTileList[gatesIndex["1"].node];
    // const path2 = findSevenStepPath(grids, gate1.x, gate1.y, gate2.x, gate2.y);
    // console.log(`path2: ${JSON.stringify(path2)}`)
    //
    // const gate3 = mapTileList[gatesIndex[2].node];
    // const path3 = findSevenStepPath(grids, gate2.x, gate2.y, gate3.x, gate3.y);
    // console.log(`path3: ${JSON.stringify(path3)}`)
    //
    // const gate4 = mapTileList[gatesIndex[3].node];
    // const path4 = findSevenStepPath(grids, gate3.x, gate3.y, gate4.x, gate4.y);
    // console.log(`path4: ${JSON.stringify(path4)}`)
    //
    // const gate5 = mapTileList[gatesIndex[4].node];
    // const path5 = findSevenStepPath(grids, gate4.x, gate4.y, gate5.x, gate5.y);
    // console.log(`path5: ${JSON.stringify(path5)}`)
    //
    // const gate6 = mapTileList[gatesIndex[5].node];
    // const path6 = findSevenStepPath(grids, gate5.x, gate5.y, gate6.x, gate6.y);
    // console.log(`path6: ${JSON.stringify(path6)}`)
    //

    // if (path1 != null) {
    //     mainPathList.push(...path1.slice(1, -1));
    // }
    //
    // if (path2 != null) {
    //     mainPathList.push(...path2.slice(1, -1));
    // }
    //
    // if (path3 != null) {
    //     mainPathList.push(...path3.slice(1, -1));
    // }
    //
    // if (path4 != null) {
    //     mainPathList.push(...path4.slice(1, -1));
    // }
    //
    // if (path5 != null) {
    //     mainPathList.push(...path5.slice(1, -1));
    // }
    //
    // if (path6 != null) {
    //     mainPathList.push(...path6.slice(1, -1));
    // }

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


