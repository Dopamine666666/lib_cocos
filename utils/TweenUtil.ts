export default class TweenUtil {
  
  /**
   * 对节点显示进行缩放动画
   * @param params.node 节点
   * @param params.duration1 缩放至maxScale的时间
   * @param params.type1 缩放至maxScale的缓动类型
   * @param params.duration2 缩放至maxScale的时间
   * @param params.type2 缩放至maxScale的缓动类型
   * @param params.delay 缩放前的延时
   * @param params.minScale 节点缩放的最小比例
   * @param params.maxScale 节点缩放的最大比例
   */
  public static tweenNodeShow(params: {node: Node, duration1?: number, type1?: ITweenOption, duration2?: number, type2?: ITweenOption, delay?: number, minScale?: number, maxScale?: number}) {
    const { node, duration1 = 0.2, type1 = {easing: 'linear'}, duration2 = 0.08, type2 = {easing: 'linear'}, delay = 0, minScale = 0.8, maxScale = 1.15} = params;
    const initScale = node.getScale();
    tween(node)
    .call(() => node.active = false)
    .to(0, {scale: new Vec3(initScale.x *minScale, initScale.y * minScale, 1)})
    .delay(delay)
    .call(() => node.active = true)
    .to(duration1, {scale: new Vec3(initScale.x * maxScale, initScale.y * maxScale, 1)}, type1)
    .to(duration2, {scale: new Vec3(initScale.x, initScale.y, 1)}, type2)
    .start();
  }
}