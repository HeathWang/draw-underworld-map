import React from 'react';
import {ShowMapTile} from '../../../model/showMapTile';
import './styles.css';

type TileProps = {
    showMapTile: ShowMapTile;
};

const Tile: React.FC<TileProps> = (props) => {

    const style = {
        backgroundColor: props.showMapTile.background,
    }

    return (
        <div className="content"  style={style}>
            <div className="content__text">
                {props.showMapTile.title}
            </div>
        </div>
    );
}

export default Tile;
