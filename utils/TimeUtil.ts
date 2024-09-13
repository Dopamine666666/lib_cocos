export default class TimeUtil {

  /** 
   * 当前时间戳
   * @example TimeUtil.now(); //  1726211720938
   */
  public static now(): number {
    return new Date().getTime()
  };

  /**
   * 获取当前日期（年/月/日）
   * @example
   * TimeUtil.getDate(); // "2021/3/2"
   */
  public static getDate(): string {
    return new Date().toLocaleDateString();
  }

  /**
   * 获取当天指定时间的时间戳
   * @param hour 时
   * @param minute 分
   * @param second 秒
   * @example
   * const time = TimeUtil.getTargetTimestamp(10, 20, 30); // 1601259630000
   */
  public static getTargetTimestamp(hour: number = 0, minute: number = 0, second: number = 0): number {
    const start = new Date(new Date().toLocaleDateString()).getTime();
    const target = (hour * 3600 + minute * 60 + second) * 1000;
    return new Date(start + target).getTime();
  }

  /**
   * 
   * @param time 毫秒数
   * @param separator 分隔符
   * @param showHours 小时数为0时是否显示小时数
   * @example TimeUtil.msToHMS(123123); // "00:02:03"
   */
  public static msToHMS(time: number, separator: string = ':', showHours: boolean = true): string {
    const hour = Math.floor(time / 3600000);
    const minute = Math.floor((time / 60000) % 60);
    const second = Math.floor((time / 1000) % 60);
    const hourString = (hour == 0 && !showHours) ? '' : `${hour.toString().padStart(2, '0')}${separator}`;
    return `${hourString}${minute.toString().padStart(2, '0')}${separator}${second.toString().padStart(2, '0')}`;
  }
}