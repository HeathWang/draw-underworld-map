import {BossRoom, Gate, GemUnderWorldModel, TreasureRoom} from "../model/gemUnderWorldModel";
import {ShowMapTile} from "../model/showMapTile";
import {imageR} from "../resource/imageR";


export const genShownMapTiles = (originData: GemUnderWorldModel): ShowMapTile[] => {
    const {map, gates, firstNode, treasure, boss} = originData;
    let shownMapTiles: ShowMapTile[] = [];
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
            const gate = gates.find(gate => `${gate.node}` === `${tileValue}`)
            if (gate != null) {
                shownMapTiles.push({
                    type: 'gate',
                    title: getGateMapName(gate),
                    background: '#f5cdab',
                    indexValue: tileStr,
                    icon: getGateIcon(gate),
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
                });
                return;
            }

            // find treasure
            const treasureRoom = treasure.find(treasure => `${treasure.node}` === `${tileValue}`);
            if (treasureRoom != null) {
                shownMapTiles.push({
                    type: 'treasure',
                    title: getTreasureMapName(treasureRoom),
                    background: '#c3df79',
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
    '16166': imageR.chest,
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
    "16167": "蓝普通守卫",
    "16168": "蓝稀有守卫",
    "16169": "蓝罕见守卫",
    "16170": "蓝史诗守卫",
    "16171": "蓝传奇守卫",
    "16172": "蓝神话守卫",
    "16173": "绿普通守卫",
    "16174": "绿稀有守卫",
    "16175": "绿罕见守卫",
    "16176": "绿史诗守卫",
    "16177": "绿传奇守卫",
    "16178": "绿神话守卫",
    "16179": "红普通守卫",
    "16180": "红稀有守卫",
    "16181": "红罕见守卫",
    "16182": "红史诗守卫",
    "16183": "红传奇守卫",
    "16184": "红神话守卫",
    "16185": "黄普通守卫",
    "16186": "黄稀有守卫",
    "16187": "黄罕见守卫",
    "16188": "黄史诗守卫",
    "16189": "黄传奇守卫",
    "16190": "黄神话守卫",
    "16191": "紫普通守卫",
    "16192": "紫稀有守卫",
    "16193": "紫罕见守卫",
    "16194": "紫史诗守卫",
    "16195": "紫传奇守卫",
    "16196": "紫神话守卫",
    "16197": "棕普通守卫",
    "16198": "棕稀有守卫",
    "16199": "棕罕见守卫",
    "16200": "棕史诗守卫",
    "16201": "棕传奇守卫",
    "16202": "棕神话守卫",
}

const getTreasureMapName = (treasure: TreasureRoom): string => {
    return treasureMapping[`${treasure.category}`];
}

