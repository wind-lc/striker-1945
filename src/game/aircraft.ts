/*
 * @Description: 飞机
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 14:11:08
 * @LastEditTime: 2024-06-20 12:16:47
 * @FilePath: \striker-1945\src\game\aircraft.ts
 */
import GameObject from './gameObject'
import Bullets from './bullet'
export default class Aircraft extends GameObject{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 离屏阴影画布
  protected sCas: HTMLCanvasElement | OffscreenCanvas
  // 阴影画布上下文
  protected sCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 生命值
  protected hp: number
  // 子弹
  protected bullets: Bullets[] | []
  /**
   * @description: 飞机
   * @param {number} cas 离屏画布
   * @param {number} ctx 画布上下文
   * @param {number} sCas 离屏阴影画布
   * @param {number} sCtx 阴影画布上下文
   * @param {number} x 横轴坐标位置
   * @param {number} y 纵轴坐标位置
   * @param {number} w 宽度
   * @param {number} h 高度
   * @param {number} hp 生命值
   * @param {Bullets} bullets 子弹
   * @return {void}
   */ 
  constructor(
    cas: HTMLCanvasElement | OffscreenCanvas,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    sCas: HTMLCanvasElement | OffscreenCanvas,
    sCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    hp: number,
    bullets: Bullets[] | []
  ){
    super(x, y, w, h)
    this.cas = cas
    this.ctx = ctx
    this.sCas = sCas
    this.sCtx = sCtx
    this.hp = hp
    this.bullets = bullets
  }
  /**
   * @description: 清空自身离屏画布
   * @return {void}
   */  
  protected clear(): void{
    // 清除画布
    this.ctx.clearRect(0, 0, this.cas.width, this.cas.height)
    this.sCtx.clearRect(0, 0, this.sCas.width, this.sCas.height)
  }
  /**
   * @description: 更新
   * @return {void}
   */  
  update(...args: any[]): void{
    
  }
  /**
   * @description: 绘制
   * @return {void}
   */ 
  draw(...args: any[]): void{

  }
}