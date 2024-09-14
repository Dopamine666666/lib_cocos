import { _decorator, Camera, Component, Node, TiledMap, UITransform, v2, v3, Vec2, view } from 'cc';
const { ccclass, property } = _decorator;

const  _mapSize = {width: 72, height: 72};
const _tiledSize = {width: 64, height: 32};

class TileConfig {
  static getMapSize() {return _mapSize};
  static getTileSize() {return _tiledSize};
}

@ccclass('TileManager')
export class TileManager extends Component {
    @property({type: Node})
    tileMap: Node = null;

    @property({type: Camera})
    mapCamera: Camera = null;

    public static ins: TileManager = null;

    protected onLoad(): void {
        // 当多网格系统时，单例模式需更改
        TileManager.ins = this;
        this.initTileMap();
    }

    
    private tileToScreen(tilePos: Vec2, out?: Vec2) {
        let mapSize = TileConfig.getMapSize();
        let tileSize = TileConfig.getTileSize();

        let tileWidth = tileSize.width;
        let tileHeight = tileSize.height;
        let tileWidthHalf = tileWidth / 2;
        let tileHeightHalf = tileHeight / 2;

        let mapWidth = mapSize.width * tileWidth;
        let mapHeight = mapSize.height * tileHeight;

        let offsetX = (this.node.getComponent(UITransform).width - mapWidth)/2;
        let offsetY = (this.node.getComponent(UITransform).height - mapHeight)/2;

        offsetX += mapWidth/2;
        offsetY += mapHeight;

        let screenX = offsetX + (tilePos.x - tilePos.y) * tileWidthHalf;
        let screenY = offsetY  - (tilePos.x + tilePos.y) * tileHeightHalf;
       
        if(!out) out = new Vec2();
        out.set(screenX, screenY);
        return out; 
    }

    private screenToTile(screenPos: Vec2, out?: Vec2) {
        let mapSize = TileConfig.getMapSize();
        let tileSize = TileConfig.getTileSize();

        let tileWidth = tileSize.width;
        let tileHeight = tileSize.height;

        let mapWidth = mapSize.width * tileWidth;
        let mapHeight = mapSize.height * tileHeight;

        let offsetX = (this.node.getComponent(UITransform).width - mapWidth) / 2;
        let offsetY = (this.node.getComponent(UITransform).height - mapHeight) / 2;

        offsetX += mapWidth/2;
        offsetY += mapHeight;

        let tileX = (screenPos.x - offsetX) / tileWidth - (screenPos.y - offsetY) / tileHeight;
        let tileY = -(screenPos.x - offsetX) / tileWidth - (screenPos.y - offsetY) / tileHeight;

        if(!out) out = new Vec2();
        out.set(Math.trunc(tileX), Math.trunc(tileY));
        return out;
    }

    /**
     * 将tile坐标转为世界坐标
     * @param tilePos tile坐标
     * @param setOffsetY 坐标点默认为tile网格左上角，setOffsetY为true时设为右下角
     */
    public tileToWorld(tilePos: Vec2, setOffsetY = false) {
        const localPos = this.tileToScreen(tilePos);
        let worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(localPos.x, localPos.y, 0));
        worldPos.y = setOffsetY ? worldPos.y - TileConfig.getTileSize().height : worldPos.y;
        return v2(worldPos.x, worldPos.y);
    } 

    /**
     * 将世界坐标转为tile坐标
     * @param world 世界坐标
     */
    public worldToTile(world: Vec2) {
        const localPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(v3(world.x, world.y, 0));
        return this.screenToTile(v2(localPos.x, localPos.y));
    }

    private initTileMap() {
        // this.tileMap.enableCulling = false;
        this.setAnchorPointZero(this.node);
        const UITrans = this.node.getComponent(UITransform);
        this.tileMap.setPosition(UITrans.width/2, UITrans.height/2);
    }

    // 未计算锚点导致的偏移，故需将锚点统一设为左下角
    private setAnchorPointZero(node: Node) {
        const UITrans = node.getComponent(UITransform);
        if(!UITrans) {
            console.log('No UITransform Component')
        }
        UITrans.setAnchorPoint(v2(0, 0));
        const x = -UITrans.width / 2;
        const y = -UITrans.height / 2;
        node.setPosition(x, y);
    }
}
