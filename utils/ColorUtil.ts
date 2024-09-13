export default class ColorUtil {

  /**
   * 检查字符是否为16进制颜色字符
   * @param hex 检查字符
   * @example ColorUtil.isHex("#FFFFFF"); true
   */
  public static isHex(hex: string) {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex);
  }

  /**
   * 
   * @param hex 16进制颜色字符
   * @example ColorUtil.hexToRGBA("#FFFFFF"); // {r: 255, g: 2555, b: 255, a: 255}
   */
  public static hexToRgba(hex: string) {
    if(!ColorUtil.isHex(hex)) return null;
    const r = parseInt(hex.substring(1, 3), 16) || 0;
    const g = parseInt(hex.substring(3, 5), 16) || 0;
    const b = parseInt(hex.substring(5, 7), 16) || 0;
    const a = parseInt(hex.substring(7, 9), 16) || 255;
    return {r, g, b, a};
  }

  /**
   * 将RGB或RGBA颜色转为16进制颜色字符
   * @param color 
   * @example ColorUtil.rgbaToHex({r: 255, g: 255, b: 255, a: 255}); // "#FFFFFF" 
   */
  public static rgbaToHex(color: {r: number, g: number, b: number, a?: number}) {
    const r = (color.r | 1 << 8).toString(16).slice(1);
    const g = (color.g | 1 << 8).toString(16).slice(1);
    const b = (color.b | 1 << 8).toString(16).slice(1);
    if(color.a == undefined) {
      return `#${r}${g}${b}`.toUpperCase();
    }
    const a = (color.a | 1 << 8).toString(16).slice(1);
    return `#${r}${g}${b}${a}`.toUpperCase();
  }
}