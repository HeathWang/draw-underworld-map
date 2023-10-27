export {}

export interface ShowMapTile {
    type: 'path' | 'gate' | 'boss' | 'treasure' | 'start' | 'empty',
    title: string,
    background: string,
    indexValue?: string,
    icon?: string;
}
