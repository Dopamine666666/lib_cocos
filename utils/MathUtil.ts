export default class MathUtil {

  /**
   * 获取[min, max)区间的随机整数
   * @param min 最小值
   * @param max 最大值
   */
  public static getRandomInt(min: number = 0, max: number = 1) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * 获取两点的欧拉距离
   * @param p1 点1
   * @param p2 点2
   */
  public static getDistance(p1: Vec2 | {x: number, y: number}, p2: Vec2 | {x: number, y: number}) {
    return ((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) ** 0.5;
  }

  /**
   * 获取两点的曼哈顿距离
   * @param p1 点1
   * @param p2 点2
   */
  public static getManhattanDistance(p1: Vec2 | {x: number, y: number}, p2: Vec2 | {x: number, y: number}) {
    return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
  }

  /**
   * 获取一个伪随机整数
   * @param seed 随机种子
   * @param key key
   */
  public static getPseudoRandomInt(seed: number, key: number): number {
    return Math.ceil((((seed * 9301 + 49297) % 233280) / 233280) * key);
  }
}