/*
 * @Description: 子弹
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-20 12:00:41
 * @LastEditTime: 2024-06-20 17:12:06
 * @FilePath: \striker-1945\src\game\bullet.ts
 */
import { createOffscreenCanvas } from "./utils"
export default class Bullet{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 子弹图片
  protected imgCas: HTMLCanvasElement | OffscreenCanvas
  // 子弹宽
  private w: number
  // 子弹高
  private h: number
  // 子弹图片宽
  private iw: number
  // 子弹图片高
  private ih: number
  // x坐标
  protected x: number
  // y坐标
  protected y: number
  // 速度
  protected speed: number
  // 是否销毁
  isDestroyed: boolean
  // 子弹伤害
  protected damage: number
  /**
   * @description: 子弹
   * @param {HTMLCanvasElement | OffscreenCanvas} imgCas 子弹图片
   * @param {number} cas 离屏画布
   * @param {number} w 子弹宽
   * @param {number} h 子弹高
   * @param {number} iw 子弹图片宽
   * @param {number} ih 子弹图片高
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
    iw: number,
    ih: number,
    x: number,
    y: number,
    speed: number,
    damage: number
  ){
    this.imgCas = imgCas
    this.cas = createOffscreenCanvas(w,h)
    this.ctx = this.cas.getContext('2d')! as CanvasRenderingContext2D
    this.w = w
    this.h = h
    this.iw = iw
    this.ih = ih
    this.x = x
    this.y = y
    this.speed = speed
    this.isDestroyed = false
    this.damage = damage
    this.ctx.drawImage(this.imgCas, 0, 0, this.w, this.h)
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */ 
  update(ctx: CanvasRenderingContext2D, currentTime: number,): void{
    const y = this.y - this.speed
    if(y - this.h >= - this.h){
      this.y = y
      ctx.clearRect(this.x, this.y, this.cas.width, this.cas.width)
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
