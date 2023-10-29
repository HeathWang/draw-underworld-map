import React from "react";
import {Button, Input, notification} from "antd";
import {BossRoom, Gate, GemUnderWorldModel, MapBlock, TreasureRoom} from "../../model/gemUnderWorldModel";
import {genShownMapTiles} from "../../logic/mapDataHandle";
import {ShowMapTile} from "../../model/showMapTile";
import Tile from "./tile";
import "./styles.css";
import {imageR} from "../../resource/imageR";
import {findMapMainPath, testFind} from "../../logic/findPath";

const {TextArea} = Input;

const MapPage: React.FC = () => {

    const inputRef = React.useRef<string | null>(null);
    const [showMapTiles, setShowMapTiles] = React.useState<ShowMapTile[]>([]);
    const notifyError = () => {
        notification.error({
            message: "抓包数据为空或格式错误",
            description: "请将完整的抓包数据全选粘贴。",
            duration: 5,
        })
    }

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

                if (underWorldModel.map.length < 400) {
                    notifyError();
                    return;
                }

                const results = genShownMapTiles(underWorldModel);
                // console.log(`${JSON.stringify(showMapTiles, null, 2)}`);
                setShowMapTiles(results.shownMapTiles);
                findMapMainPath(underWorldModel, results.shownMapTiles, results.index).then((tiles) => {
                    setShowMapTiles(tiles);
                });
            } else {
                notifyError();
            }


        } catch (e) {
            notifyError();
        }

    }

    const renderRow = (rowData: ShowMapTile[], index: number) => {
        return (
            <div className="map-container__map-row" key={`${index}`}>
                {
                    rowData.map((tile, index) => {
                        return <Tile showMapTile={tile} key={tile.indexValue}/>
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
                renderRow(row, rowIndex)
            ))
        );
    }


    return (
        <div>
            <div style={{paddingBottom: "4px"}}>
                <span> 请将抓包获取的json<span className="guide-top">数据全选</span>，粘贴到下面的输入框，点击开始透视按钮</span>
            </div>
            <TextArea
                rows={4}
                onChange={e => {
                    inputRef.current = e.target.value;
                }}
            />


            <div className="button">
                <Button type={"primary"} size={"large"} style={{width: "100%"}}
                        onClick={handleInputData}
                >
                    开始透视
                </Button>
                {/*<Button onClick={testPath}>测试</Button>*/}
            </div>

            {showMapTiles != null && showMapTiles.length > 0 &&
                <div className="map-container">
                    {renderMap()}
                </div>
            }


            <div className="map-tips">
                <div className="map-tips__boss">
                    <li>棕龙 100文书+铜球</li>
                    <li>绿龙 皇契+SS钥匙</li>
                    <li>蓝龙 3宝石钥匙+黄球</li>
                    <li>紫龙 SS钥匙+银球</li>
                    <li>黄龙 10诅咒符文+小篮球</li>
                    <li>红龙 小红球+金球</li>
                    <li>钻龙 50龙石+小爪牙</li>
                </div>

                <div className="map-tips__chest">
                    <div className="map-tips__chest__sub">
                        宝箱分为普通、稀有、罕见、史诗、传奇、神话<img src={`${imageR.chest_treasure}`}
                                                                  style={{width: "20px", height: '20px'}}/>
                    </div>
                    <div className="map-tips__chest__sub">
                        <span>史诗以下宝箱以<span style={{background: "#aae3a7"}}>绿色背景</span>标识</span>
                    </div>
                    <div className="map-tips__chest__sub">
                        <span><span style={{background: "#ce47c5"}}>史诗</span>、<span
                            style={{background: "#ecaf10"}}>传奇</span>、<span
                            style={{background: "rgba(23,175,151,0.67)"}}>神话</span>以不同背景色标识</span>
                    </div>
                </div>

                <div className="map-tips__path">
                    <div>
                        <span>主路径7步到达，在地图上以<span
                            style={{background: "rgba(225,121,107,0.8)"}}>棕红色标识</span></span>
                    </div>
                    <div style={{background: "rgba(225,121,107,0.8)"}}>主路径同时显示跑动小人 <img className="icon"
                                                                                                   src={imageR.run}
                                                                                                   alt=""/></div>
                    <div><span className="map-tips__path__doing">门到boss路线推理开发中...</span></div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
