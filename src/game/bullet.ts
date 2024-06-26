/*
 * @Description: 子弹
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-20 12:00:41
 * @LastEditTime: 2024-06-21 16:37:47
 * @FilePath: \striker-1945\src\game\bullet.ts
 */
import GameObject from "./gameObject"
import { createOffscreenCanvas } from "./utils"
export default class Bullet extends GameObject{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 子弹图片
  protected imgCas: HTMLCanvasElement | OffscreenCanvas
  // 速度
  protected speed: number
  // 是否销毁
  isDestroyed: boolean
  // 子弹伤害
  protected damage: number
  /**
   * @description: 子弹
   * @param {HTMLCanvasElement | OffscreenCanvas} imgCas 子弹图片
   * @param {number} w 画布/子弹宽
   * @param {number} h 画布/子弹高
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} speed 速度
   * @param {number} damage 子弹伤害
   * @return {void}
   */  
  constructor(
    imgCas: HTMLCanvasElement | OffscreenCanvas,
    w: number,
    h: number,
    x: number,
    y: number,
    speed: number,
    damage: number
  ){
    super(x, y, w, h)
    this.imgCas = imgCas
    this.cas = createOffscreenCanvas(w,h)
    this.ctx = this.cas.getContext('2d')! as CanvasRenderingContext2D
    this.speed = speed
    this.isDestroyed = false
    this.damage = damage
    this.ctx.drawImage(this.imgCas, 0, 0, this.w, this.h,)
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */ 
  update(ctx: CanvasRenderingContext2D, currentTime: number,): void{
    const y = this.y - this.speed
    if(y - this.h >= - this.h * 2){
      this.y = y
      this.draw(ctx)
    }else{
      this.isDestroyed = true
    }
  }
  /**
   * @description: 绘制
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @return {void}
   */ 
  draw(ctx: CanvasRenderingContext2D): void{
    ctx.drawImage(this.cas, this.x - this.w / 2, this.y, this.w, this.h)
  }
}
