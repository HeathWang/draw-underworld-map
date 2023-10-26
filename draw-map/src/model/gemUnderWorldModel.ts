export {}
export interface GemUnderWorldModel {
    map: MapBlock[],
    gates: Gate[],
    firstNode: number,
    treasure: TreasureRoom[],
    boss: BossRoom[],
}

/**
 * x,y轴以左上角为原点
 */
export interface MapBlock {
    blockValue: number,
    x: number,
    y: number,
}

export interface Gate {
    index: number,
    node: number,
    dir: number,
}

export interface BossRoom {
    node: number,
    category: number,
}

export interface TreasureRoom {
    node: number,
    category: number,
}
