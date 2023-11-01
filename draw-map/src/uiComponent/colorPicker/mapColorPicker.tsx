import React from "react";
import {ColorPicker} from 'antd';
import './styles.css';
import {CACHE_MAP_COLOR_KEY} from "../../const/mapInfoDefine";
import {COLOR_TILE_SELECTED} from "../../const/colorDefine";

type MapColorPickerProps = {
    colorChangedCallback?: (color: string) => void;

}

const MapColorPicker: React.FC<MapColorPickerProps> = (props) => {

    const defaultColor = () => {
      const colorHex = localStorage.getItem(CACHE_MAP_COLOR_KEY);
        if (colorHex) {
            return colorHex;
        } else {
            return COLOR_TILE_SELECTED;
        }
    }

    return (
        <div className="colorPicker-content">
            <div className="colorPicker-content__tips">更改地图节点标记颜色</div>
            <ColorPicker
                presets={[
                    {
                        label: 'Recommended',
                        colors: [
                            '#000000',
                            '#000000E0',
                            '#000000A6',
                            '#00000073',
                            '#00000040',
                            '#00000026',
                            '#0000001A',
                            '#00000012',
                            '#0000000A',
                            '#00000005',
                            '#F5222D',
                            '#FA8C16',
                            '#FADB14',
                            '#8BBB11',
                            '#52C41A',
                            '#13A8A8',
                            '#1677FF',
                            '#2F54EB',
                            '#722ED1',
                            '#EB2F96',
                            '#F5222D4D',
                            '#FA8C164D',
                            '#FADB144D',
                            '#8BBB114D',
                            '#52C41A4D',
                            '#13A8A84D',
                            '#1677FF4D',
                            '#2F54EB4D',
                            '#722ED14D',
                            '#EB2F964D',
                        ],
                    },
                ]}
                defaultValue={defaultColor()}
                onChangeComplete={(color) => {
                    localStorage.setItem(CACHE_MAP_COLOR_KEY, color.toHexString());
                    if (props.colorChangedCallback) {
                        props.colorChangedCallback(color.toHexString());
                    }
                }}
            />
        </div>
    );
}

export default MapColorPicker;
