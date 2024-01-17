import React, {useEffect, useState} from 'react';
import {ShowMapTile} from '../../../model/showMapTile';
import './styles.css';
import {COLOR_TILE_SELECTED, COLOR_TILE_SELECTED_SECONDARY} from "../../../const/colorDefine";
import {ArrowRightOutlined, ArrowUpOutlined,} from '@ant-design/icons';
import {CACHE_MAP_COLOR_KEY, CACHE_MAP_SECONDARY_COLOR_KEY, DIR} from "../../../const/mapInfoDefine";

type TileProps = {
    showMapTile: ShowMapTile;
    updateCallback: (tile: ShowMapTile) => void;
};

const Tile: React.FC<TileProps> = (props) => {

    const [tileModel, setTileModel] = useState<ShowMapTile>(props.showMapTile);

    useEffect(() => {
        setTileModel(props.showMapTile);
    }, [props.showMapTile]);

    const getColor = (isMain = true) => {
        let colorHex = localStorage.getItem(CACHE_MAP_COLOR_KEY);
        if (!isMain) {
            colorHex = localStorage.getItem(CACHE_MAP_SECONDARY_COLOR_KEY);
        }
        if (colorHex) {
            return colorHex;
        } else {
            if (isMain) {
                return COLOR_TILE_SELECTED;
            } else {
                return COLOR_TILE_SELECTED_SECONDARY;
            }

        }
    }

    const tileClicked = () => {
        if (tileModel.type === "empty") {
            return;
        }

        if (tileModel.selected === true) {
            tileModel.selected = false;

        } else {
            tileModel.selected = true;
            tileModel.selectedBackground = getColor();
        }

        // copy tileModel
        const tile = Object.assign({}, tileModel);
        props.updateCallback(tile);
    }

    const getTileStyle = () => {
        if (tileModel.selected === true) {
            return {
                backgroundColor: tileModel.selectedBackground,
                fontSize: tileModel.type === 'treasure' ? "10px" : "12px"
            }
        } else {
            return {
                backgroundColor: tileModel.background,
                fontSize: tileModel.type === 'treasure' ? "10px" : "12px"
            }
        }
    }

    const getDirIcon = (dir: DIR) => {
        if (dir === 'up') {
            return (<ArrowUpOutlined className="content-icon__dir"/>)
        } else if (dir === 'right') {
            return (<ArrowRightOutlined className="content-icon__dir"/>)
        } else if (dir === 'down') {
            return (<ArrowUpOutlined rotate={180} className="content-icon__dir"/>)
        } else if (dir === 'left') {
            return (<ArrowRightOutlined rotate={180} className="content-icon__dir"/>)
        }
    }

    return (
        tileModel.icon != null ?
            <div className="content-icon" style={getTileStyle()}
                 onClick={tileClicked}
            >
                <div className="tile-icon-container">
                    <img className="tile-icon-container__img" src={tileModel.icon} alt="tile_icon"/>
                </div>

                <div className="content-icon__text">
                    {tileModel.title}
                </div>
                {
                    tileModel.dir != null && getDirIcon(tileModel.dir)
                }
            </div>
            :
            <div className="content" style={getTileStyle()}
                 onClick={tileClicked}
            >
                <div className="content__text">
                    {tileModel.title}
                </div>
            </div>
    );
}

export default Tile;

