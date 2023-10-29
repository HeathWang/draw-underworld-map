export {}

export interface ShowMapTile {
    type: 'gate' | 'boss' | 'treasure' | 'start' | 'path' | 'mainpath' | 'empty',
    title: string,
    background: string,
    indexValue?: string,
    icon?: string,
    x: number,
    y: number,


}
