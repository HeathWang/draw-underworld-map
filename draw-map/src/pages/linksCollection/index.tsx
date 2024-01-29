import React, {useEffect} from "react";
import "./styles.css";

const LinksCollection: React.FC = () => {
    useEffect(() => {
        document.title = "传送门";
    }, []);

    return (
        <div className="links-collection">
            <div className="links-collection-item">
                <a href="https://www.taransworld.com" target="_blank" rel="noreferrer">
                    <div className="links-collection-item-title">taransworld 预告等信息</div>
                </a>
            </div>
            <div className="links-collection-item">
                <a href="https://www.taransworld.com/HeroInfo/MyProfile.pl" target="_blank" rel="noreferrer">
                    <div className="links-collection-item-title">taransworld 个人数据</div>
                </a>
            </div>
            <div className="links-collection-item">
                <a href="https://gemologica.herokuapp.com" target="_blank" rel="noreferrer">
                    <div className="links-collection-item-title">herokuapp 个人数据详细统计</div>
                </a>
            </div>
            <div className="links-collection-item">
                <a href="https://el-hackerino.github.io/hoard-master/" target="_blank" rel="noreferrer">
                    <div className="links-collection-item-title">属城升级计算</div>
                </a>
            </div>
            {/*<div className="links-collection-item">*/}
            {/*    <a href="https://www.bnd666.cn:444/" target="_blank" rel="noreferrer">*/}
            {/*        <div className="links-collection-item-title">宝石战争-BND同盟会</div>*/}
            {/*    </a>*/}
            {/*</div>*/}
            {/*<div className="links-collection-item">*/}
            {/*    <a href="https://www.bnd666.cn:444/" target="_blank" rel="noreferrer">*/}
            {/*        <div className="links-collection-item-title">宝石战争-BND同盟会</div>*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    );
}

export default LinksCollection;
