import React from "react";
import { Input, Button, notification } from "antd";
import {Gate, GemUnderWorldModel, BossRoom, TreasureRoom, MapBlock} from "../../model/gemUnderWorldModel";

const { TextArea } = Input;

const MapPage: React.FC = () => {

    const inputRef = React.useRef<string | null>(null);
    const [api, contextHolder] = notification.useNotification();

    const handleInputData = () => {
        // console.log("handleInputData");
        // console.log(e.target.value);
        // convert input string to json object

        try {
            if (inputRef.current != null) {
                const data = JSON.parse(inputRef.current);
                /**
                 * {
                 *     "Map": [
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             18874443,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             16924683,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             18874461,
                 *             33615874,
                 *             16850953,
                 *             50417671,
                 *             15,
                 *             15,
                 *             139272,
                 *             54525991,
                 *             37748795,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             34603163,
                 *             15,
                 *             33615881,
                 *             16850951,
                 *             15,
                 *             67166216,
                 *             67170310,
                 *             16916489,
                 *             33681413,
                 *             114689,
                 *             126982,
                 *             16916489,
                 *             50479108,
                 *             4194375,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             50405388,
                 *             67170307,
                 *             67166220,
                 *             33607685,
                 *             33607681,
                 *             16834562,
                 *             15,
                 *             147468,
                 *             52428951,
                 *             106506,
                 *             33693709,
                 *             16904194,
                 *             33714185,
                 *             35651767,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             33615881,
                 *             50388992,
                 *             33607685,
                 *             33599493,
                 *             50376706,
                 *             16838668,
                 *             16850949,
                 *             50417669,
                 *             33652741,
                 *             33660932,
                 *             50446337,
                 *             16891906,
                 *             50479114,
                 *             33878025,
                 *             67444741,
                 *             50679813,
                 *             360455,
                 *             15,
                 *             72351803,
                 *             15
                 *         ],
                 *         [
                 *             33628174,
                 *             55574638,
                 *             28681,
                 *             151,
                 *             67145738,
                 *             33579017,
                 *             33583105,
                 *             16814083,
                 *             50479113,
                 *             16916485,
                 *             16904198,
                 *             67235852,
                 *             33693702,
                 *             17100808,
                 *             50667525,
                 *             33902593,
                 *             17125377,
                 *             50692101,
                 *             17149958,
                 *             15
                 *         ],
                 *         [
                 *             16777243,
                 *             20971611,
                 *             24586,
                 *             4194363,
                 *             28684,
                 *             33579010,
                 *             33591306,
                 *             67153930,
                 *             159752,
                 *             16936967,
                 *             17051657,
                 *             67395589,
                 *             33853445,
                 *             33865730,
                 *             33935371,
                 *             360458,
                 *             360456,
                 *             33927175,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             10,
                 *             33579020,
                 *             67129348,
                 *             67125252,
                 *             12291,
                 *             20490,
                 *             16822282,
                 *             50384906,
                 *             33734666,
                 *             33804297,
                 *             33816582,
                 *             360461,
                 *             33902595,
                 *             33865738,
                 *             372744,
                 *             67481602,
                 *             22020158,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             67109052,
                 *             33554437,
                 *             33558533,
                 *             50339841,
                 *             33566724,
                 *             33570822,
                 *             50384910,
                 *             51380414,
                 *             67301386,
                 *             33792008,
                 *             50569219,
                 *             17125385,
                 *             50667520,
                 *             17100806,
                 *             33935374,
                 *             67489802,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             50348045,
                 *             12289,
                 *             33562628,
                 *             67121155,
                 *             15,
                 *             15,
                 *             15,
                 *             16986124,
                 *             225282,
                 *             67358730,
                 *             69206062,
                 *             33902604,
                 *             33914885,
                 *             71303319,
                 *             33939464,
                 *             56623271,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             37748814,
                 *             15,
                 *             16396,
                 *             16797703,
                 *             15,
                 *             36700347,
                 *             33792009,
                 *             67334150,
                 *             50593804,
                 *             67383301,
                 *             17063939,
                 *             15,
                 *             15,
                 *             33939466,
                 *             33964041,
                 *             55574711,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             20971565,
                 *             67371012,
                 *             33804292,
                 *             17039365,
                 *             33828869,
                 *             70254743,
                 *             4194494,
                 *             15,
                 *             15,
                 *             33947656,
                 *             67518468,
                 *             17186821,
                 *             34603047,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             17186825,
                 *             409605,
                 *             67518470,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             72351902,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ],
                 *         [
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15,
                 *             15
                 *         ]
                 *     ],
                 *     "Seed": 1855419013,
                 *     "Gates": {
                 *         "0": {
                 *             "Node": 1105,
                 *             "Dir": 0
                 *         },
                 *         "1": {
                 *             "Node": 605,
                 *             "Dir": 2
                 *         },
                 *         "2": {
                 *             "Node": 810,
                 *             "Dir": 3
                 *         },
                 *         "3": {
                 *             "Node": 1209,
                 *             "Dir": 0
                 *         },
                 *         "4": {
                 *             "Node": 913,
                 *             "Dir": 0
                 *         },
                 *         "5": {
                 *             "Node": 1215,
                 *             "Dir": 1
                 *         }
                 *     },
                 *     "CurrentNode": 604,
                 *     "Completed": [
                 *         900,
                 *         1000,
                 *         1100,
                 *         1101,
                 *         1102,
                 *         1103,
                 *         1104,
                 *         1004,
                 *         1003,
                 *         8903,
                 *         1002,
                 *         902,
                 *         802,
                 *         803,
                 *         1001,
                 *         8901,
                 *         1203,
                 *         1202,
                 *         9302,
                 *         1204,
                 *         1304,
                 *         1105,
                 *         1005,
                 *         905,
                 *         904,
                 *         804,
                 *         704,
                 *         604
                 *     ],
                 *     "Collected": [
                 *         903,
                 *         901,
                 *         1302
                 *     ],
                 *     "MerchantData": [
                 *         100,
                 *         2,
                 *         5,
                 *         3,
                 *         4,
                 *         0,
                 *         5,
                 *         3,
                 *         2,
                 *         1,
                 *         5,
                 *         0
                 *     ],
                 *     "DataVersion": 11,
                 *     "FreeOfferAvailable": false,
                 *     "BossRoomInfo": {
                 *         "500": 16161,
                 *         "608": 16160,
                 *         "803": 16165,
                 *         "1214": 16163,
                 *         "1216": 16166,
                 *         "1411": 16164,
                 *         "1613": 16162
                 *     },
                 *     "TreasureRooms": [
                 *         16167,
                 *         16168,
                 *         16169,
                 *         16170,
                 *         16171,
                 *         16172,
                 *         16173,
                 *         16174,
                 *         16175,
                 *         16176,
                 *         16177,
                 *         16178,
                 *         16179,
                 *         16180,
                 *         16181,
                 *         16182,
                 *         16183,
                 *         16184,
                 *         16185,
                 *         16186,
                 *         16187,
                 *         16188,
                 *         16189,
                 *         16190,
                 *         16191,
                 *         16192,
                 *         16193,
                 *         16194,
                 *         16195,
                 *         16196,
                 *         16197,
                 *         16198,
                 *         16199,
                 *         16200,
                 *         16201,
                 *         16202
                 *     ],
                 *     "TreasureRoomInfo": {
                 *         "305": 16181,
                 *         "404": 16182,
                 *         "411": 16191,
                 *         "412": 16192,
                 *         "513": 16193,
                 *         "718": 16198,
                 *         "801": 16201,
                 *         "901": 16194,
                 *         "903": 16192,
                 *         "1016": 16198,
                 *         "1211": 16179,
                 *         "1302": 16193,
                 *         "1406": 16191,
                 *         "1418": 16173
                 *     }
                 * }
                 */
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
                            x: i,
                            y: j,
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
                        node:  parseInt(bossRoomKeys[i])

                    });
                }
                // console.log(`bossRoomObj: ${JSON.stringify(bossRoomObj)}`);

                let treasureRoomObj: TreasureRoom[] = [];
                const treasureRoomKeys = Object.keys(treasureRooms);
                for (let i = 0; i < treasureRoomKeys.length; i++) {
                    const roomValue = treasureRooms[treasureRoomKeys[i]];
                    treasureRoomObj.push({
                        category: roomValue,
                        node:  parseInt(treasureRoomKeys[i])

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
                console.log(`underWorldModel: ${JSON.stringify(underWorldModel, null, 2)}`);
            } else {
                console.log("input is null");
            }



        } catch (e) {

        }

    }

    return (
        <div>
            <div>请将抓包获取的数据全选，粘贴到下面的输入框</div>
            <TextArea
                rows={4}
                onChange={e => {
                    inputRef.current = e.target.value;
                }}
            />


            <Button type={"primary"} size={"large"}
                onClick={handleInputData}
            >
                开始透视
            </Button>
        </div>
    );
};

export default MapPage;
