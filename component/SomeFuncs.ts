import {Component, RenderTexture, view, UITransform, Camera, Node, Color, Sprite, tween, color, ImageAsset, Texture2D} from 'cc';

class SomeFuncs extends Component {
  private rt: RenderTexture;
  private copyCamera: Camera;
  private _buffer: Uint8Array;
  /**
   * 
   * @param captureNode 截图节点
   * @param cb 完成回调
   * @param setSlotTexture 
   */
  changeTexture(captureNode: Node, cb?: () => void, setSlotTexture: boolean = true) {
    this.rt = new RenderTexture();
    this.rt.reset({width: Math.floor(view.getVisibleSize().width), height: Math.floor(view.getVisibleSize().height)});
    this.copyCamera.targetTexture = this.rt;

    const capture = () => {
      // copy texture
      const width = captureNode.getComponent(UITransform).width;
      const height = captureNode.getComponent(UITransform).height;
      const pos_world = captureNode.getWorldPosition();
      const buffer = this.rt.readPixels(Math.floor(pos_world.x - width / 2), Math.floor(pos_world.y - height / 2), width, height);

      // flip UVY of buffer
      this._buffer = new Uint8Array(width * height * 4);
      let rowBytes = width * 4;
      for(let row = 0; row < height; row++) {
        let srow = height - 1 - row;
        let start = Math.floor(srow * width * 4);
        let reStart = row * width * 4;
        for(let i = 0; i < rowBytes; i++) {
          this._buffer[reStart + i] = buffer[start + i];
        }
      }

      let img = new ImageAsset();
      img.reset({
        _data: this._buffer,
        width: width,
        height: height,
        format: Texture2D.PixelFormat.RGBA8888,
        _compressed: false
      });
      let texture = new Texture2D();
      texture.image = img;

      return texture;
    }

    this.scheduleOnce(() => {
      this.copyCamera.targetTexture = null;
      cb && cb.call(this);
    }, 0);
  }
  
  
  private tempColor: Color = color(255, 255, 255, 255);
  private beChangedSp: Sprite;
  /**
   * tween颜色
   */
  tweenColor() {
    const duraTime = 0.5;
    tween(this.tempColor)
    .to(duraTime, {g: 50, b: 50}, {onUpdate: () => this.beChangedSp.color = this.tempColor})
    .to(duraTime, {g: 50, b: 50}, {onUpdate: () => this.beChangedSp.color = this.tempColor})
    .to(duraTime, {g: 50, b: 50}, {onUpdate: () => this.beChangedSp.color = this.tempColor}) 
    .union()
    .repeatForever()
    .start();
  }

  /**
   * 获取节点世界坐标系下的包围盒，不包含子节点
   * */ 
  GetSelfBoundingBox(node: Node) {
    const localBoundingBox = node.getComponent(UITransform).getBoundingBox();
    let worldMatrix: Mat4 = new Mat4();
    node.parent.getWorldMatrix(worldMatrix);
    let worldBoundingBox: Rect = new Rect();
    worldBoundingBox = localBoundingBox.transformMat4(worldMatrix);
    return worldBoundingBox;
  }
}