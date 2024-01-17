import React from "react";
import './styles.css';
import {CACHE_MAP_COLOR_KEY, CACHE_MAP_SECONDARY_COLOR_KEY} from "../../const/mapInfoDefine";
import {COLOR_TILE_SELECTED, COLOR_TILE_SELECTED_SECONDARY} from "../../const/colorDefine";

type ColorPickerProps = {
    selectedIndexCallback?: (index: number) => void;
}

const ColorPickerComponent: React.FC<ColorPickerProps> = (props) => {

    const getColor = (isMain: boolean) => {
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

    const clickColor = (isMain: boolean) => {
        if (props.selectedIndexCallback) {
            props.selectedIndexCallback(isMain ? 0 : 1);
        }
    }

    return (
        <div className="container">
            <div className="container__row" onClick={() => clickColor(true)}>
                <div className="container__title">主标记颜色</div>
                <div className="color_box" style={{background: getColor(true)}}></div>
            </div>
            <div className="container__row" onClick={() => clickColor(false)}>
                <div className="container__title">副标记颜色</div>
                <div className="color_box" style={{background: getColor(false)}}></div>
            </div>
        </div>
    );
}

export default ColorPickerComponent;
