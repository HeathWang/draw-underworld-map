import React, {useEffect, useState} from 'react';
import {ShowMapTile} from '../../../model/showMapTile';
import './styles.css';

type TileProps = {
    showMapTile: ShowMapTile;
};

const Tile: React.FC<TileProps> = (props) => {

    const [tileModel, setTileModel] = useState<ShowMapTile>(props.showMapTile);

    useEffect(() => {
        setTileModel(props.showMapTile);
    }, [props.showMapTile]);

    // const style = {
    //     backgroundColor: tileModel.background,
    //     fontSize: tileModel.type === 'treasure' ? "10px" : "12px"
    // }

    const tileClicked = () => {
        if (tileModel.type === "empty") {
            return;
        }

        if (tileModel.selected === true) {
            tileModel.selected = false;

        } else {
            tileModel.selected = true;
            tileModel.selectedBackground = "#564941";
        }

        // copy tileModel
        const tile = Object.assign({}, tileModel);
        setTileModel(tile);
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

    return (
        tileModel.icon != null ?
            <div className="content-icon" style={getTileStyle()}
                 onClick={tileClicked}
            >
                <img className="icon" src={tileModel.icon} alt=""/>
                <div className="content-icon__text">
                    {tileModel.title}
                </div>
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
