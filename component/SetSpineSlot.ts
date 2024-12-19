import {Component, RenderTexture, view, UITransform, Camera, Node} from 'cc';

class SetSpineSlot extends Component {
  private rt: RenderTexture;
  private copyCamera: Camera;
  private _buffer: Uint8Array;
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
}