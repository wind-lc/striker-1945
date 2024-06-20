/*
 * @Description: 子弹
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-20 12:00:41
 * @LastEditTime: 2024-06-20 14:16:03
 * @FilePath: \striker-1945\src\game\bullet.ts
 */
export default class Bullet{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // x坐标
  protected x: number
  // y坐标
  protected y: number
  // 速度
  protected speed: number
  /**
   * @description: 子弹
   * @param {number} cas 离屏画布
   * @param {number} ctx 画布上下文
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} speed 速度
   * @return {void}
   */  
  constructor(
    cas: HTMLCanvasElement | OffscreenCanvas,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    x: number,
    y: number,
    speed: number
  ){
    this.cas = cas
    this.ctx = ctx
    this.x = x
    this.y = y
    this.speed = speed
  }
  /**
   * @description: 更新
   * @return {void}
   */ 
  update(): void{

  }
  /**
   * @description: 绘制
   * @return {void}
   */ 
  draw(): void{

  }
}
