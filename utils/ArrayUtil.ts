export default class ArrayUtil {
  /**
   * 拷贝二维数组
   * @param arr 目标数组
   */
  public static copy2DArray(arr: any[][]): any[][] {
    let newArr: any[][] = [];
    for(let i = 0; i < arr.length; i++) {
      newArr.push([...arr[i]]);
    }
    return newArr;
  }

  /**
   * 置乱数组
   * @param arr 目标数组
   */
  public static shuffle(arr: any[]): any[] {
    let count = arr.length;
    while(count) {
      let idx = Math.floor(Math.random() * count--);
      let temp = arr[count];
      arr[count] = arr[idx];
      arr[idx] = temp;
    }
    return arr;
  }

  /**
   * 混淆数组
   * @param arr 目标数组
   */
  public static confound(arr: any[]): any[] {
    let res = arr.slice().sort(() => Math.random() - 0.5);
    return res;
  }

  /**
   * 数组扁平化
   * @param arr 目标数组 
   */
  public static flattening(arr: any[]): any[] {
    for(; arr.some(v => Array.isArray(v));) {
      arr = [].concat.apply([], arr);
    }
    return arr;
  }
}