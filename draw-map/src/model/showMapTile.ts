import {DIR} from "../const/mapInfoDefine";

export {}

export interface ShowMapTile {
    type: 'gate' | 'boss' | 'treasure' | 'start' | 'path' | 'mainpath' | 'empty',
    dir?: DIR,
    title: string,
    background: string,
    indexValue?: string,
    icon?: string,
    x: number,
    y: number,

    selected?: boolean,
    selectedBackground?: string,

    // 1 - 6
    chestLevel?: number,
}

export interface UserInfoSummary {
    nickName: string;
    // 普通
    chestNormal?: number;
    // 稀有
    chestUnNormal?: number;
    // 罕见
    chestRare?: number;
    chestEpic?: number;
    chestLegend?: number;
    chestMythic?: number;
}
