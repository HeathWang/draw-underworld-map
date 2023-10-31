import {BossRoom, Gate, GemUnderWorldModel, TreasureRoom} from "../model/gemUnderWorldModel";
import {ShowMapTile} from "../model/showMapTile";
import {imageR} from "../resource/imageR";
import {
    COLOR_TREASURE_EPIC,
    COLOR_TREASURE_LEGEND,
    COLOR_TREASURE_MYTHIC,
    COLOR_TREASURE_NORMAL
} from "../const/colorDefine";


export const genShownMapTiles = (originData: GemUnderWorldModel): {shownMapTiles: ShowMapTile[], index: Record<string, {"node": number, "Dir": number}>} => {
    const {map, gates, firstNode, treasure, boss} = originData;
    let shownMapTiles: ShowMapTile[] = [];
    let gatesIndex: Record<string, {"node": number, "Dir": number}> = {};
    map.forEach((block, index) => {
        let tileStr = `${block.y}${block.x.toString().padStart(2, '0')}`;
        tileStr = tileStr.replace(/^0+/, '')
        const tileValue = parseInt(`${block.y}${block.x.toString().padStart(2, '0')}`);
        if (block.blockValue === 15) {
            shownMapTiles.push({
                type: 'empty',
                title: '',
                background: 'white',
                indexValue: tileStr,
                x: block.x,
                y: block.y,
            });
        } else {
            if (tileStr === `${firstNode}`) {
                shownMapTiles.push({
                    type: 'start',
                    title: '起点',
                    background: '#73d044',
                    indexValue: tileStr,
                    x:block.x,
                    y:block.y
                });
                return;
            }

            // find gate
            const gate = gates.find(gate => `${gate.node}` === `${tileValue}`)

            if (gate != null) {
                gatesIndex[`${gate?.index}`] = {"node": index, "Dir": gate.dir};
                shownMapTiles.push({
                    type: 'gate',
                    title: getGateMapName(gate),
                    background: '#f5cdab',
                    indexValue: tileStr,
                    icon: getGateIcon(gate),
                    x: block.x,
                    y: block.y,
                });
                return;
            }

            // find boss
            const bossRoom = boss.find(boss => `${boss.node}` === `${tileValue}`);
            if (bossRoom != null) {
                shownMapTiles.push({
                    type: 'boss',
                    title: getBossMapName(bossRoom),
                    background: getBossMapBackground(bossRoom),
                    indexValue: tileStr,
                    icon: getBossIcon(bossRoom),
                    x: block.x,
                    y: block.y,
                });
                return;
            }

            // find treasure
            const treasureRoom = treasure.find(treasure => `${treasure.node}` === `${tileValue}`);
            if (treasureRoom != null) {
                shownMapTiles.push({
                    type: 'treasure',
                    title: getTreasureMapName(treasureRoom),
                    background: getTreasureMapColor(treasureRoom),
                    indexValue: tileStr,
                    icon: imageR.chest_treasure,
                    x: block.x,
                    y: block.y,
                });
                return;
            }

            shownMapTiles.push({
                type: 'path',
                title: `${tileValue}`,
                background: '#d1d1d1',
                indexValue: tileStr,
                x: block.x,
                y: block.y,
            })
        }
    });
    return {shownMapTiles, index: gatesIndex};
}

const getGateMapName = (gate: Gate): string => {
    if (gate.index === 0) {
        return '门';
    } else if (gate.index === 1) {
        return '门';
    } else if (gate.index === 2) {
        return '门';
    } else if (gate.index === 3) {
        return '门';
    } else if (gate.index === 4) {
        return '门';
    } else if (gate.index === 5) {
        return '门';
    } else {
        return "";
    }
}


const gateIconsMapping: Record<string, string> = {
    "0": imageR.t_gray,
    "1": imageR.t_green,
    "2": imageR.t_blue,
    "3": imageR.t_purple,
    "4": imageR.t_yellow,
    "5": imageR.t_red,
}

const getGateIcon = (gate: Gate): string => {
    return gateIconsMapping[`${gate.index}`];
}

const bossMapping: Record<string, string> = {
    '16165': '棕龙',
    '16161': '绿龙',
    '16160': '蓝龙',
    '16164': '紫龙',
    '16163': '黄龙',
    '16162': '红龙',
    '16166': '钻龙',
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
    '16166': '#6fefdb',
}

const getBossMapBackground = (boss: BossRoom): string => {
    return bossMappingColor[`${boss.category}`];
}

/**
 *     t_gray: "icons/Troopcardall_Orange.png",
 *     t_red: "icons/Troopcardall_Red.png",
 *     t_blue: "icons/Troopcardall_Blue.png",
 *     t_green: "icons/Troopcardall_Green.png",
 *     t_yellow: "icons/Troopcardall_Yellow.png",
 *     t_purple: "icons/Troopcardall_Purple.png",
 */
const bossIconsMapping: Record<string, string> = {
    '16165': imageR.boss_gray,
    '16161': imageR.boss_green,
    '16160': imageR.boss_blue,
    '16164': imageR.boss_purple,
    '16163': imageR.boss_yellow,
    '16162': imageR.boss_red,
    '16166': imageR.chest_crystal,
}

const getBossIcon = (boss: BossRoom): string => {
    return bossIconsMapping[`${boss.category}`];
}

/**
 *          普通	    稀有	    罕见	    史诗	    传奇	    神话
 * 蓝守卫	16167	16168	16169	16170	16171	16172
 * 绿守卫	16173	16174	16175	16176	16177	16178
 * 红守卫	16179	16180	16181	16182	16183	16184
 * 黄守卫	16185	16186	16187	16188	16189	16190
 * 紫守卫	16191	16192	16193	16194	16195	16196
 * 棕守卫	16197	16198	16199	16200	16201	16202
 */

const treasureMapping: Record<string, string> = {
    "16167": "蓝普通",
    "16168": "蓝稀有",
    "16169": "蓝罕见",
    "16170": "蓝史诗",
    "16171": "蓝传奇",
    "16172": "蓝神话",
    "16173": "绿普通",
    "16174": "绿稀有",
    "16175": "绿罕见",
    "16176": "绿史诗",
    "16177": "绿传奇",
    "16178": "绿神话",
    "16179": "红普通",
    "16180": "红稀有",
    "16181": "红罕见",
    "16182": "红史诗",
    "16183": "红传奇",
    "16184": "红神话",
    "16185": "黄普通",
    "16186": "黄稀有",
    "16187": "黄罕见",
    "16188": "黄史诗",
    "16189": "黄传奇",
    "16190": "黄神话",
    "16191": "紫普通",
    "16192": "紫稀有",
    "16193": "紫罕见",
    "16194": "紫史诗",
    "16195": "紫传奇",
    "16196": "紫神话",
    "16197": "棕普通",
    "16198": "棕稀有",
    "16199": "棕罕见",
    "16200": "棕史诗",
    "16201": "棕传奇",
    "16202": "棕神话",
}

const getTreasureMapName = (treasure: TreasureRoom): string => {
    return treasureMapping[`${treasure.category}`];
}


const treasureEpicCategoryList: number[] = [16170, 16176, 16182, 16188, 16194, 16200];
const treasureLegendCategoryList: number[] = [16171, 16177, 16183, 16189, 16195, 16201];
const treasureGodCategoryList: number[] = [16172, 16178, 16184, 16190, 16196, 16202];

const getTreasureMapColor = (treasure: TreasureRoom): string => {
    const obj = treasureEpicCategoryList.find(item => item === treasure.category);
    if (obj != null) {
        return COLOR_TREASURE_EPIC;
    }

    if (treasureLegendCategoryList.find(item => item === treasure.category) != null) {
        return COLOR_TREASURE_LEGEND;
    }

    if (treasureGodCategoryList.find(item => item === treasure.category) != null) {
        return COLOR_TREASURE_MYTHIC;
    }

    return COLOR_TREASURE_NORMAL;
}

