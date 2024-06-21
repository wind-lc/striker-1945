/*
 * @Description: 导弹
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-21 14:17:23
 * @LastEditTime: 2024-06-21 18:15:24
 * @FilePath: \striker-1945\src\game\missile.ts
 */
import GameObject from './gameObject'
import { createOffscreenCanvas } from "./utils"
export default class Missile extends GameObject{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 导弹图片
  protected imgCas: HTMLCanvasElement | OffscreenCanvas
  // 速度
  protected speed: number
  // 是否销毁
  isDestroyed: boolean
  // 导弹伤害
  protected damage: number
  // 导弹朝向
  protected rotate: number
  // 是否玩家导弹
  protected isPlaye: boolean = false
  /**
   * @description: 导弹
   * @param {HTMLCanvasElement | OffscreenCanvas} imgCas 导弹图片
   * @param {number} w 画布/导弹宽
   * @param {number} h 画布/导弹高
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} speed 速度
   * @param {number} damage 导弹伤害
   * @param {number} speed 速度
   * @param {boolean} isPlaye 是否玩家导弹
   * @return {void}
   */  
  constructor(
    imgCas: HTMLCanvasElement | OffscreenCanvas,
    w: number,
    h: number,
    x: number,
    y: number,
    speed: number,
    damage: number,
    isPlaye: boolean
  ){
    super(x, y, w, h)
    this.imgCas = imgCas
    this.cas = createOffscreenCanvas(w,h)
    this.ctx = this.cas.getContext('2d')! as CanvasRenderingContext2D
    this.speed = speed
    this.isDestroyed = false
    this.damage = damage
    this.rotate = 0
    this.isPlaye = isPlaye
    if(this.isPlaye){
      const x = this.w / 2
      const y = this.h / 2
      this.ctx.save()
      this.ctx.translate(x,y)
      this.ctx.rotate(Math.PI)
      this.ctx.drawImage(this.imgCas, -x, -y, this.w, this.h)
      this.ctx.restore()
    }else{
      this.ctx.drawImage(this.imgCas, 0, 0, this.w, this.h)
    }
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @param {number} tx 目标x坐标
   * @param {number} ty 目标y坐标
   * @return {void}
   */ 
  update(ctx: CanvasRenderingContext2D, currentTime: number, tx: number, ty:number): void{
    const y = this.y - this.speed
    if(y - this.h >= - this.h * 2){
      this.y = y
      this.draw(ctx)
    }else{
      this.isDestroyed = true
    }
    this.draw(ctx)
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