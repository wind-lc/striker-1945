/*
 * @Description: 游戏对象类
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-14 15:01:11
 * @LastEditTime: 2024-06-14 15:34:31
 * @FilePath: \striker-1945\src\game\element.ts
 */
export default abstract class GameObject  {
  // 横轴坐标位置
  x: number
  // 纵轴坐标位置
  y: number
  // 宽度
  w: number
  // 高度
  h: number
  /**
   * @description: 游戏对象
   * @param {number} x 横轴坐标位置
   * @param {number} y 纵轴坐标位置
   * @param {number} w 宽度
   * @param {number} h 高度
   * @return {void}
   */  
  constructor(x: number, y: number, w: number, h: number){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  /**
   * @description: 更新
   * @return {void}
   */  
  abstract update(...args: any[]): void
  /**
   * @description: 绘制
   * @return {void}
   */ 
  abstract draw(...args: any[]): void
}