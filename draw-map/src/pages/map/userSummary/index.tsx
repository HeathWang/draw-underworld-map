import './styles.css'
import './styles.css'
import {UserInfoSummary} from "../../../model/showMapTile";
import React, {useState} from "react";
import {
    COLOR_TREASURE_EPIC,
    COLOR_TREASURE_LEGEND,
    COLOR_TREASURE_MYTHIC,
    COLOR_TREASURE_NORMAL_2, COLOR_TREASURE_RARE, COLOR_TREASURE_UNNORMAL
} from "../../../const/colorDefine";

type UserSummaryProps = {
    userSummary: UserInfoSummary;
    updateCallback?: (userSummary: UserInfoSummary) => void;
};

const UserSummary: React.FC<UserSummaryProps> = (props) => {

    const [userSummary, setUserSummary] = useState<UserInfoSummary>(props.userSummary);

    const userSummaryClicked = () => {
        if (props.updateCallback) {
            props.updateCallback(userSummary);
        }
    }

    const totalTreasure = (): number => {
        return (userSummary.chestNormal ?? 0) + (userSummary.chestUnNormal ?? 0) + (userSummary.chestRare ?? 0) + (userSummary.chestEpic ?? 0) + (userSummary.chestLegend ?? 0) + (userSummary.chestMythic ?? 0);
    }

    const totalSteps = (): number => {
        return 84 + totalTreasure() * 3;
    }


    return (
        <div className="user-summary" onClick={userSummaryClicked}>
            <div>
                <span className="user-summary__title">欢迎
                    <span className="user-summary-nick">{userSummary.nickName}</span>
                    <span>大佬，本周你共有<span style={{color: "red"}}>{totalTreasure()}</span>个宝箱</span>
                </span>
            </div>
            <div>
                <span className="user-summary-chest">
                    其中<span style={{background: COLOR_TREASURE_NORMAL_2}}>普通宝箱{userSummary.chestNormal}个</span>，
                    <span style={{background: COLOR_TREASURE_UNNORMAL}}>稀有宝箱{userSummary.chestUnNormal}个</span>，
                    <span style={{background: COLOR_TREASURE_RARE}}>罕见宝箱{userSummary.chestRare}个</span>，
                    <span style={{background: COLOR_TREASURE_EPIC}}>史诗宝箱{userSummary.chestEpic}个</span>，
                    <span style={{background: COLOR_TREASURE_LEGEND}}>传奇宝箱{userSummary.chestLegend}个</span>，
                    <span style={{background: COLOR_TREASURE_MYTHIC}}>神话宝箱{userSummary.chestMythic}个</span>。
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
