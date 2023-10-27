import React from "react";
import {Button, Input, notification} from "antd";
import {BossRoom, Gate, GemUnderWorldModel, MapBlock, TreasureRoom} from "../../model/gemUnderWorldModel";
import {genShownMapTiles} from "../../logic/mapDataHandle";
import {ShowMapTile} from "../../model/showMapTile";
import Tile from "./tile";
import "./styles.css";

const {TextArea} = Input;

const MapPage: React.FC = () => {

    const inputRef = React.useRef<string | null>(null);
    const [api, contextHolder] = notification.useNotification();
    const [showMapTiles, setShowMapTiles] = React.useState<ShowMapTile[]>([]);

    const handleInputData = () => {

        try {
            if (inputRef.current != null) {
                const data = JSON.parse(inputRef.current);
                console.log(data.result.Info.UnderspireData);
                const map = data.result.Info.UnderspireData.Map;
                const gates = data.result.Info.UnderspireData.Gates;
                const bossRoomInfo = data.result.Info.UnderspireData.BossRoomInfo;
                const firstNode = data.result.Info.UnderspireData.Completed[0];
                const treasureRooms = data.result.Info.UnderspireData.TreasureRoomInfo;

                let mapObj: MapBlock[] = [];
                for (let i = 0; i < map.length; i++) {
                    for (let j = 0; j < map[i].length; j++) {
                        mapObj.push({
                            blockValue: map[i][j],
                            x: j,
                            y: i,
                        });
                    }
                }

                // console.log(`mapObj: ${JSON.stringify(mapObj)}`);

                let gatesObj: Gate[] = [];
                for (let i = 0; i < Object.keys(gates).length; i++) {
                    const gate = gates[i];
                    gatesObj.push({
                        index: i,
                        node: gate.Node,
                        dir: gate.Dir
                    });
                }
                // console.log(`gateObj: ${JSON.stringify(gatesObj)}`);

                let bossRoomObj: BossRoom[] = [];
                const bossRoomKeys = Object.keys(bossRoomInfo);
                for (let i = 0; i < bossRoomKeys.length; i++) {
                    const roomValue = bossRoomInfo[bossRoomKeys[i]];
                    bossRoomObj.push({
                        category: roomValue,
                        node: parseInt(bossRoomKeys[i])

                    });
                }
                // console.log(`bossRoomObj: ${JSON.stringify(bossRoomObj)}`);

                let treasureRoomObj: TreasureRoom[] = [];
                const treasureRoomKeys = Object.keys(treasureRooms);
                for (let i = 0; i < treasureRoomKeys.length; i++) {
                    const roomValue = treasureRooms[treasureRoomKeys[i]];
                    treasureRoomObj.push({
                        category: roomValue,
                        node: parseInt(treasureRoomKeys[i])

                    });
                }
                // console.log(`treasureRoomObj: ${JSON.stringify(treasureRoomObj)}`);


                const underWorldModel: GemUnderWorldModel = {
                    map: mapObj,
                    gates: gatesObj,
                    boss: bossRoomObj,
                    treasure: treasureRoomObj,
                    firstNode: firstNode,
                };
                console.log(`${JSON.stringify(underWorldModel, null, 2)}`);

                const showMapTiles = genShownMapTiles(underWorldModel);
                // console.log(`${JSON.stringify(showMapTiles, null, 2)}`);
                setShowMapTiles(showMapTiles);
            } else {
                console.log("input is null");
            }


        } catch (e) {

        }

    }

    const renderRow = (rowData: ShowMapTile[]) => {
        return (
        <div className="map-container__map-row" >
            {
                rowData.map((tile, index) => {
                    return <Tile showMapTile={tile} />
                })
            }
        </div>
        );
    }

    const renderMap = () => {

        // 定义一个空数组，用于存储拆分后的子数组
        const result: ShowMapTile[][] = [];

        // 使用循环将数据拆分成包含 20 个元素的子数组
        for (let i = 0; i < showMapTiles.length; i += 20) {
            const chunk = showMapTiles.slice(i, i + 20);
            result.push(chunk);
        }


        return (
            result.map((row, rowIndex) => (
                // 对 result 数组进行映射，row 代表每一行的数据
                renderRow(row)
            ))
        );
    }

    return (
        <div>
            <div>请将抓包获取的json数据全选，粘贴到下面的输入框，点击开始透视按钮</div>
            <TextArea
                rows={4}
                onChange={e => {
                    inputRef.current = e.target.value;
                }}
            />


            <div className="button" >
                <Button type={"primary"} size={"large"} style={{width: "100%"}}
                        onClick={handleInputData}
                >
                    开始透视
                </Button>
            </div>


            <div className="map-container">
                {showMapTiles != null && showMapTiles.length > 0 && renderMap()

                }
            </div>
            <div className="map-tips">
                <div className="map-tips__boss">
                <li>棕龙	100文书+铜球	</li>
                <li>绿龙	皇契+SS钥匙	</li>
                <li>蓝龙	3宝石钥匙+黄球</li>
                <li>紫龙	SS钥匙+银球	</li>
                <li>黄龙	10诅咒符文+小篮球	</li>
                <li>红龙	小红球+金球	</li>
                <li>钻龙	50龙石+小爪牙	</li>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
