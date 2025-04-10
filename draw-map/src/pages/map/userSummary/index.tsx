import './styles.css'
import {UserInfoSummary} from "../../../model/showMapTile";
import React from "react";
import {
    COLOR_TREASURE_EPIC,
    COLOR_TREASURE_LEGEND,
    COLOR_TREASURE_MYTHIC,
    COLOR_TREASURE_NORMAL_2,
    COLOR_TREASURE_RARE,
    COLOR_TREASURE_UNNORMAL
} from "../../../const/colorDefine";

type UserSummaryProps = {
    userSummary: UserInfoSummary;
    updateCallback?: (userSummary: UserInfoSummary) => void;
};

const UserSummary: React.FC<UserSummaryProps> = (props) => {

    const userSummaryClicked = () => {
        if (props.updateCallback) {
            props.updateCallback(props.userSummary);
        }
    }

    const totalTreasure = (): number => {
        return (props.userSummary.chestNormal ?? 0) + (props.userSummary.chestUnNormal ?? 0) + (props.userSummary.chestRare ?? 0) + (props.userSummary.chestEpic ?? 0) + (props.userSummary.chestLegend ?? 0) + (props.userSummary.chestMythic ?? 0);
    }

    const totalSteps = (): number => {
        return 84 + totalTreasure() * 3;
    }

    const getLevel = (): string => {
        if (props.userSummary.lvl) {
            return `${props.userSummary.lvl}级`;
        }
        return "";
    }


    return (
        <div className="user-summary" onClick={userSummaryClicked}>
            <div>
                <span className="user-summary__title">欢迎
                    <span>{getLevel()}</span>
                    <span className="user-summary-nick">{props.userSummary.nickName}</span>
                    <span>大佬，本周你共有<span style={{color: "red"}}>{totalTreasure()}</span>个宝箱</span>
                </span>
            </div>
            <div>
                <span className="user-summary-chest">
                    其中<span
                    style={{background: COLOR_TREASURE_NORMAL_2}}>普通宝箱{props.userSummary.chestNormal}个</span>
                    <span
                        style={{background: COLOR_TREASURE_UNNORMAL}}>稀有宝箱{props.userSummary.chestUnNormal}个</span>
                    <span style={{background: COLOR_TREASURE_RARE}}>罕见宝箱{props.userSummary.chestRare}个</span>
                    <span style={{background: COLOR_TREASURE_EPIC}}>史诗宝箱{props.userSummary.chestEpic}个</span>
                    <span style={{background: COLOR_TREASURE_LEGEND}}>传奇宝箱{props.userSummary.chestLegend}个</span>
                    <span style={{background: COLOR_TREASURE_MYTHIC}}>神话宝箱{props.userSummary.chestMythic}个</span>
                </span>
            </div>
            <div>
                <span className="user-summary-chest">
                    大约需要火炬 {totalSteps()}个。预估值，仅供参考
                </span>
            </div>
        </div>
    )
}

export default UserSummary;
