export default class ObjectUtil {

  /**
   * 判断指定的值是否为对象
   * @param val 值
   */
  public static isObject(val: any): boolean {
    return Object.prototype.toString.call(val) === '[object Object]';
  }
  
  /**
   * 深拷贝
   * @param val 拷贝对象
   */
  public static deepClone(val: any): any {
    if(val == null || typeof val !== 'object') return val;

    if(val instanceof Array) {
      const res: any[] = [];
      for(let i = 0; i < val.length; i++) {
        res.push(ObjectUtil.deepClone(val[i]));
      }
      return res;
    }

    if(val instanceof Object) {
      const res = {};
      for(const k of val) {
        if(val.hasOwnProperty(k)) {
          val[k] = ObjectUtil.deepClone(val[k]);
        }
      }
      return res;
    }

    if(val instanceof Date) {
      return new Date().setTime(val.getTime());
    }

    console.warn(`不支持的类型: ${val}`);
    return null;
  }

  /**
   * 浅拷贝
   * @param val 拷贝对象 
   */
  public static copy(val: object): object {
    return JSON.parse(JSON.stringify(val));
  }
}