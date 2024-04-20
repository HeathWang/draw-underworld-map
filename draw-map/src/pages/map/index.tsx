import React, {useEffect} from "react";
import {Button, Input, notification, Modal} from "antd";
import {BossRoom, Gate, GemUnderWorldModel, MapBlock, TreasureRoom} from "../../model/gemUnderWorldModel";
import {genShownMapTiles} from "../../logic/mapDataHandle";
import {ShowMapTile, UserInfoSummary} from "../../model/showMapTile";
import Tile from "./tile";
import "./styles.css";
import "./tile/styles.css";
import {imageR} from "../../resource/imageR";
import {
    COLOR_TILE_SELECTED,
    COLOR_TREASURE_EPIC,
    COLOR_TREASURE_LEGEND,
    COLOR_TREASURE_MYTHIC,
    COLOR_TREASURE_NORMAL_2,
    COLOR_TREASURE_RARE,
    COLOR_TREASURE_UNNORMAL
} from "../../const/colorDefine";
import {ArrowRightOutlined, ArrowUpOutlined,} from '@ant-design/icons';
import MapColorPicker from "../../uiComponent/colorPicker/mapColorPicker";
import {
    CACHE_MAP_KEY,
    CACHE_MAP_TILES_KEY,
    CACHE_MAP_USER_INFO_KEY,
    CACHE_SWITCH_MUL_COLOR
} from "../../const/mapInfoDefine";
import UserSummary from "./userSummary";

const {TextArea} = Input;

const MapPage: React.FC = () => {

    const inputRef = React.useRef<string | null>(null);
    const [showMapTiles, setShowMapTiles] = React.useState<ShowMapTile[]>([]);
    const [textAreaValue, setTextAreaValue] = React.useState<string>("");
    const [userSummary, setUserSummary] = React.useState<UserInfoSummary | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

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
                const nickName = data.result.NewHeroData.Name;
                const lvl = data.result.Info.PlayerLeaderboardEntry.Level;

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
                getUserSummary(results.shownMapTiles, nickName, lvl);
                localStorage.setItem(CACHE_MAP_TILES_KEY, JSON.stringify(results.shownMapTiles));
            } else {
                notifyError();
                setShowMapTiles([]);
            }

        } catch (e) {
            notifyError();
            setShowMapTiles([]);
        }

    }

    const getUserSummary = (mapTiles: ShowMapTile[], nick: string, lvl?: number) => {
        let normal = 0;
        let unnormal = 0;
        let rare = 0;
        let epic = 0;
        let legend = 0;
        let mythic = 0;

        mapTiles.forEach((item) => {
            if (item.type === "treasure") {
                if (item.chestLevel === 1) {
                    normal++;
                } else if (item.chestLevel === 2) {
                    unnormal++;
                } else if (item.chestLevel === 3) {
                    rare++;
                } else if (item.chestLevel === 4) {
                    epic++;
                } else if (item.chestLevel === 5) {
                    legend++;
                } else if (item.chestLevel === 6) {
                    mythic++;
                }
            }
        });
        const user: UserInfoSummary = {
            lvl: lvl,
            nickName: nick,
            chestNormal: normal,
            chestUnNormal: unnormal,
            chestRare: rare,
            chestEpic: epic,
            chestLegend: legend,
            chestMythic: mythic,
        }

        setUserSummary(user);
        localStorage.setItem(CACHE_MAP_USER_INFO_KEY, JSON.stringify(user));
    }

    useEffect(() => {
        document.title = "地图";
        console.log("useEffect");
        const input = localStorage.getItem('mapInput');
        if (input != null) {
            inputRef.current = input;
            setTextAreaValue(input);
        }
        const mapTiles = localStorage.getItem(CACHE_MAP_TILES_KEY);
        if (mapTiles != null) {
            const tiles = JSON.parse(mapTiles);
            setShowMapTiles(tiles);
        }

        const userInfo = localStorage.getItem(CACHE_MAP_USER_INFO_KEY);
        if (userInfo != null) {
            const user = JSON.parse(userInfo);
            setUserSummary(user);
        }

    }, []);

    const updateTile = (tile: ShowMapTile) => {

        const index = showMapTiles.findIndex((value, index, arr) => value.indexValue === tile.indexValue);
        const newTiles = [...showMapTiles];
        newTiles[index] = tile;
        setShowMapTiles(newTiles);
        localStorage.setItem(CACHE_MAP_TILES_KEY, JSON.stringify(newTiles));
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

    const selectedTileColorChanged = (colorHex: string, isMain = true) => {
        // console.log(`selectedTileColorChanged: ${colorHex} isMain: ${isMain}`);
        // const newTiles = [...showMapTiles];
        // newTiles.forEach((value, index, arr) => {
        //     if (value.selected === true) {
        //         value.selectedBackground = colorHex;
        //     }
        // });
        // setShowMapTiles(newTiles);
        // localStorage.setItem(CACHE_MAP_TILES_KEY, JSON.stringify(newTiles));
    }

    const cleanAllMark = () => {
        const newTiles = [...showMapTiles];
        newTiles.forEach((value, index, arr) => {
            value.selected = false;
        });
        setShowMapTiles(newTiles);
        localStorage.setItem(CACHE_MAP_TILES_KEY, JSON.stringify(newTiles));
        setIsModalOpen(false);
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
                <Button className="action__button" type={"primary"} size={"large"} style={{width: "140px"}}
                        onClick={() => setIsModalOpen(true)}
                >
                    清除所有标记
                </Button>
                <MapColorPicker title={"标记颜色"} isMain={true} colorChangedCallback={(color: string) => {
                    selectedTileColorChanged(color, true)
                }}/>

                {/*<Button onClick={testPath}>测试</Button>*/}
            </div>


            {showMapTiles != null && showMapTiles.length > 0 &&
                <div className="map-container">
                    {renderMap()}
                </div>
            }
            <div>
                {
                    userSummary != null && <UserSummary userSummary={userSummary}/>
                }
            </div>


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
                        <span>
                            <span style={{background: COLOR_TREASURE_NORMAL_2}}>普通</span>、
                            <span style={{background: COLOR_TREASURE_UNNORMAL}}>稀有</span>、
                            <span style={{background: COLOR_TREASURE_RARE}}>罕见</span>、
                            <span style={{background: COLOR_TREASURE_EPIC}}>史诗</span>、
                            <span style={{background: COLOR_TREASURE_LEGEND}}>传奇</span>、
                            <span style={{background: COLOR_TREASURE_MYTHIC}}>神话</span>以不同背景色标识</span>
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
                        <ArrowRightOutlined className="content-icon__dir"/>
                    </div>
                </div>
            </div>
            <Modal
                title={"清除地图上所有手动标记颜色"}
                open={isModalOpen}
                closable={false}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => cleanAllMark()}
            >
                <p className="confirm_text">请明白自己正在干嘛！</p>
                <p className="confirm_text">确认后会清除掉所有你已经标记的地图色块！</p>
            </Modal>
        </div>

    );
};

export default MapPage;
