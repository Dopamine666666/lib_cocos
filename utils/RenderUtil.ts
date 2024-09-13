export default class RenderUtil {
  private static spriteBufferMap: WeakMap<Sprite, Uint8Array> = new WeakMap();

  public static getPixelData(sprite: Sprite) {
    let buffer: Uint8Array = null;
    if(this.spriteBufferMap.has(sprite)) {
      buffer = this.spriteBufferMap.get(sprite);
    }
    if(!buffer) {
      let spf = sprite.spriteFrame;
      let texture = spf.texture;
  
      let tx = spf.rect.x;
      let ty = spf.rect.y;
      if(spf.packable && spf.original) {
        texture = spf.original._texture;
        tx = spf.original._x;
        ty = spf.original._y;
      }
      let width = spf.rect.width;
      let height = spf.rect.height;
  
      
      let gfxTexture = texture.getGFXTexture();
      let gfxDevice = texture['_getGFXDevice']();
      let bufferViews = [];
      let region = new gfx.BufferTextureCopy();

      region.texOffset.x = tx;
      region.texOffset.y = ty;
      region.texExtent.width = width;
      region.texExtent.height = height;
      buffer = new Uint8Array(width * height * 4);
      bufferViews.push(buffer);
      
      gfxDevice.copyTextureToBuffers(gfxTexture, bufferViews, [region]);
      this.spriteBufferMap.set(sprite, buffer);
    }
    return buffer;
  }

  private static enableSpriteFrameListener(sprite: Sprite) {
    if (!sprite) {
        return;
    }
    let _property = "spriteFrame";
    let desc = js.getPropertyDescriptor(sprite, _property);
    if (!!desc.set) {
        Object.defineProperty(sprite, _property, {
            get: desc.get,
            set: (value) => {
                if (sprite.spriteFrame != value) {
                    this.spriteBufferMap.delete(sprite);
                }
                desc.set.call(sprite, value);
            }
        });
        return;
    }
  }
}