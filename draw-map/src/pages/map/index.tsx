import React, {useEffect} from "react";
import {Button, Input, notification} from "antd";
import {BossRoom, Gate, GemUnderWorldModel, MapBlock, TreasureRoom} from "../../model/gemUnderWorldModel";
import {genShownMapTiles} from "../../logic/mapDataHandle";
import {ShowMapTile} from "../../model/showMapTile";
import Tile from "./tile";
import "./styles.css";
import "./tile/styles.css";
import {imageR} from "../../resource/imageR";
import {
    COLOR_TILE_SELECTED,
    COLOR_TREASURE_EPIC,
    COLOR_TREASURE_LEGEND,
    COLOR_TREASURE_MYTHIC,
    COLOR_TREASURE_NORMAL
} from "../../const/colorDefine";
import {
    ArrowRightOutlined,
    ArrowUpOutlined,
} from '@ant-design/icons';
import MapColorPicker from "../../uiComponent/colorPicker/mapColorPicker";
import {CACHE_MAP_KEY} from "../../const/mapInfoDefine";

const {TextArea} = Input;

const MapPage: React.FC = () => {

    const inputRef = React.useRef<string | null>(null);
    const [showMapTiles, setShowMapTiles] = React.useState<ShowMapTile[]>([]);
    const [textAreaValue, setTextAreaValue] = React.useState<string>("");
    const notifyError = () => {
        notification.error({
            message: "抓包数据为空或格式错误",
            description: "请将完整的抓包数据全选粘贴。",
            duration: 5,
        })
    }

    const handleInputData = () => {

        try {
            localStorage.setItem(CACHE_MAP_KEY, inputRef.current ?? "");
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
                // findMapMainPath(underWorldModel, results.shownMapTiles, results.index).then((tiles) => {
                //     // setShowMapTiles(tiles);
                // });
            } else {
                notifyError();
                setShowMapTiles([]);
            }

        } catch (e) {
            notifyError();
            setShowMapTiles([]);
        }

    }

    useEffect(() => {
        console.log("useEffect");
        const input = localStorage.getItem('mapInput');
        if (input != null) {
            inputRef.current = input;
            setTextAreaValue(input);
            if (input.length > 256) {
                handleInputData();
            }
        }

    }, []);

    const updateTile = (tile: ShowMapTile) => {

        const index = showMapTiles.findIndex((value, index, arr) => value.indexValue === tile.indexValue);
        const newTiles = [...showMapTiles];
        newTiles[index] = tile;
        setShowMapTiles(newTiles);
    }

    const renderRow = (rowData: ShowMapTile[], index: number) => {
        return (
            <div className="map-container__map-row" key={`${index}`}>
                {
                    rowData.map((tile, index) => {
                        return <Tile
                            showMapTile={tile}
                            key={tile.indexValue}
                            updateCallback={updateTile}
                        />
                    })
                }
            </div>
        );
    }

    const selectedTileColorChanged = (colorHex: string) => {
      console.log(`selectedTileColorChanged: ${colorHex}`);
        const newTiles = [...showMapTiles];
        newTiles.forEach((value, index, arr) => {
            if (value.selected === true) {
                value.selectedBackground = colorHex;
            }
        });
        setShowMapTiles(newTiles);
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
                value={textAreaValue}
                onChange={e => {
                    inputRef.current = e.target.value;
                    setTextAreaValue(e.target.value);
                }}
            />


            <div className="action">
                <Button className="action__button" type={"primary"} size={"large"}
                        onClick={handleInputData}
                >
                    开始透视
                </Button>
                <MapColorPicker colorChangedCallback={selectedTileColorChanged} />
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
                                                                  style={{width: "20px", height: '20px'}} alt={""}/>
                    </div>
                    <div className="map-tips__chest__sub">
                        <span>史诗以下宝箱以<span style={{background: COLOR_TREASURE_NORMAL}}>绿色背景</span>标识</span>
                    </div>
                    <div className="map-tips__chest__sub">
                        <span><span style={{background: COLOR_TREASURE_EPIC}}>史诗</span>、<span
                            style={{background: COLOR_TREASURE_LEGEND}}>传奇</span>、<span
                            style={{background: COLOR_TREASURE_MYTHIC}}>神话</span>以不同背景色标识</span>
                    </div>
                </div>

                <div className="map-tips__tag">
                    <div>
                        <span><span className="map-tips__tag__title">地图标记</span>：通过点击地图上的节点来标记</span>
                    </div>
                    <div>
                        <span>点击标记后，节点以<span
                            style={{background: COLOR_TILE_SELECTED, color: "white"}}>棕灰色背景</span>显示，再次点击取消标记</span>
                    </div>
                    <div>
                        <span><span className="map-tips__tag__title">门朝向</span>：以箭头标识门下一步走向</span>
                        <ArrowUpOutlined className="content-icon__dir"/>
                        <ArrowUpOutlined rotate={180} className="content-icon__dir"/>
                        <ArrowRightOutlined rotate={180} className="content-icon__dir"/>
                        <ArrowRightOutlined className="content-icon__dir" />
                    </div>
                </div>

                {/*<div className="map-tips__path">*/}
                {/*    <div>*/}
                {/*        <span>主路径7步到达，在地图上以<span*/}
                {/*            style={{background: "rgba(225,121,107,0.8)"}}>棕红色标识</span></span>*/}
                {/*    </div>*/}
                {/*    <div style={{background: "rgba(225,121,107,0.8)"}}>主路径同时显示跑动小人 <img className="icon"*/}
                {/*                                                                                   src={imageR.run}*/}
                {/*                                                                                   alt=""/></div>*/}
                {/*    <div><span className="map-tips__path__doing">门到boss路线推理开发中...</span></div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default MapPage;
