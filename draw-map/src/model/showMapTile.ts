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
}