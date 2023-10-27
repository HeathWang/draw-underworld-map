import {BossRoom, Gate, GemUnderWorldModel} from "../model/gemUnderWorldModel";
import {ShowMapTile} from "../model/showMapTile";


export const genShownMapTiles = (originData: GemUnderWorldModel): ShowMapTile[] => {
    const {map, gates, firstNode, treasure, boss} = originData;
    let shownMapTiles: ShowMapTile[] = [];
    map.forEach((block, index) => {
        const tileStr = `${block.y}${block.x.toString().padStart(2, '0')}`;
        const tileValue = parseInt(`${block.y}${block.x.toString().padStart(2, '0')}`);
        if (block.blockValue === 15) {
            shownMapTiles.push({
                type: 'empty',
                title: '',
                background: 'white',
                indexValue: tileStr,
            });
        } else {
            if (tileStr === `${firstNode}`) {
                shownMapTiles.push({
                    type: 'start',
                    title: '起点',
                    background: '#73d044',
                    indexValue: tileStr,
                });
                return;
            }

            // find gate
            const gate = gates.find(gate => `${gate.node}` === tileStr)
            if (gate != null) {
                shownMapTiles.push({
                    type: 'gate',
                    title: getGateMapName(gate),
                    background: '#ef9736',
                    indexValue: tileStr,
                });
                return;
            }

            // find boss
            const bossRoom = boss.find(boss => `${boss.node}` === tileStr);
            if (bossRoom != null) {
                shownMapTiles.push({
                    type: 'boss',
                    title: getBossMapName(bossRoom),
                    background: getBossMapBackground(bossRoom),
                    indexValue: tileStr,
                });
                return;
            }

            shownMapTiles.push({
                type: 'path',
                title: `${tileValue}`,
                background: '#d1d1d1',
                indexValue: tileStr,
            })
        }
    });
    return shownMapTiles;
}

const getGateMapName = (gate: Gate): string => {
    if (gate.index === 0) {
        return '1棕门';
    } else if (gate.index === 1) {
        return '2绿门';
    } else if (gate.index === 2) {
        return '3蓝门';
    } else if (gate.index === 3) {
        return '4紫门';
    } else if (gate.index === 4) {
        return '5黄门';
    } else if (gate.index === 5) {
        return '6红门';
    } else {
        return "";
    }
}

const bossMapping: Record<string, string> = {
    '16165': '1棕龙',
    '16161': '2绿龙',
    '16160': '3蓝龙',
    '16164': '4紫龙',
    '16163': '5黄龙',
    '16162': '6红龙',
    '16166': '7钻龙',
}
const getBossMapName = (boss: BossRoom): string => {
    return bossMapping[`${boss.category}`];
}

const bossMappingColor: Record<string, string> = {
    '16165': '#cf8a5a',
    '16161': '#b5d594',
    '16160': '#3fb8e9',
    '16164': '#8b59af',
    '16163': '#ebec55',
    '16162': '#f43d3c',
    '16166': '#1497d1',
}

const getBossMapBackground = (boss: BossRoom): string => {
    return bossMappingColor[`${boss.category}`];
}

