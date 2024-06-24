/*
 * @Description: 导弹
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-21 14:17:23
 * @LastEditTime: 2024-06-24 14:46:57
 * @FilePath: \striker-1945\src\game\missile.ts
 */
import { playerCof, tailFlameAnimationCof } from './config'
import GameObject from './gameObject'
import { createOffscreenCanvas } from "./utils"

/**
 * @description: 根据导弹宽高获取旋转时直径
   * @param {number} mw 导弹宽
   * @param {number} mh 导弹高
 * @return {number} 
 */
const getDiameter = ( mw: number, mh: number): number => {
  return Math.sqrt(mw * mw + mh * mh)
}
export default class Missile extends GameObject{
  // 离屏画布
  protected cas: HTMLCanvasElement | OffscreenCanvas
  // 画布上下文
  protected ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
  // 导弹宽
  protected mw: number
  // 导弹高
  protected mh: number
  // 导弹图片
  protected imgCas1: HTMLCanvasElement | OffscreenCanvas
  // 导弹尾焰图片
  protected imgCas2: HTMLCanvasElement | OffscreenCanvas
  // 导弹尾焰宽
  protected mtw: number
  // 导弹尾焰高
  protected mth: number
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
  // 尾焰索引
  protected tailFlameIndex: number
  // 尾焰最后更新时间
  protected lastTailFlameTime: number
  // 飞机螺旋桨更新时间差
  protected upadateTailFlameTime: number = 32
  // 导弹锁定时间
  protected lockingTime: number = 512
  // 导弹发射时间
  protected launchTime: number
  /**
   * @description: 导弹
   * @param {HTMLCanvasElement | OffscreenCanvas} imgCas1 导弹图片
   * @param {HTMLCanvasElement | OffscreenCanvas} imgCas2 导弹尾焰图片
   * @param {number} mw 导弹宽
   * @param {number} mh 导弹高
   * @param {number} mtw 导弹尾焰宽
   * @param {number} mth 导弹尾焰高
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {number} speed 速度
   * @param {number} damage 导弹伤害
   * @param {number} speed 速度
   * @param {boolean} isPlaye 是否玩家导弹
   * @param {number} launchTime 导弹发射时间
   * @return {void}
   */  
  constructor(
    imgCas1: HTMLCanvasElement | OffscreenCanvas,
    imgCas2: HTMLCanvasElement | OffscreenCanvas,
    mw: number,
    mh: number,
    mtw: number,
    mth: number,
    x: number,
    y: number,
    speed: number,
    damage: number,
    isPlaye: boolean,
    launchTime: number
  ){
    // 取得旋转最大值直径作为画布宽高
    super(x, y, getDiameter(mw, mh + mth), getDiameter(mw, mh + mth))
    this.imgCas1 = imgCas1
    this.imgCas2 = imgCas2
    this.mw = mw
    this.mh = mh
    this.mtw = mtw
    this.mth = mth
    this.cas = createOffscreenCanvas(this.w, this.h)
    this.ctx = this.cas.getContext('2d')! as CanvasRenderingContext2D
    this.speed = speed
    this.isDestroyed = false
    this.damage = damage
    this.rotate = Math.PI
    this.isPlaye = isPlaye
    this.tailFlameIndex = 0
    this.lastTailFlameTime = 0
    this.launchTime = launchTime
    if(this.isPlaye){
      this.spin(this.rotate, 0)
    }else{
      this.ctx.drawImage(this.imgCas1, 0, 0, this.w, this.h)
    }
  }
  /**
   * @description: 旋转当前画布并重新绘图
   * @param {number} radian 旋转弧度值
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  protected spin(radian: number, currentTime: number): void{
    let i = this.tailFlameIndex
    if(currentTime - this.lastTailFlameTime > this.upadateTailFlameTime || currentTime === 0){
      if(i === 1){
        i = 0
      }else {
        i = 1
      }
      this.tailFlameIndex = i
      this.lastTailFlameTime = currentTime
    }
    this.ctx.clearRect(0, 0, this.w, this.h)
    const x = this.w / 2
    const y = this.h / 2
    const x2 = -this.mw / 2
    this.ctx.save()
    this.ctx.translate(x,y)
    this.ctx.rotate(radian)
    this.ctx.drawImage(this.imgCas1, x2, -y + this.mth, this.mw, this.mh)
    this.ctx.drawImage(this.imgCas2,tailFlameAnimationCof[i].sx, tailFlameAnimationCof[i].sy, playerCof.mtiw, playerCof.mtih, x2 + this.mw / 2 - this.mtw / 2, -y, this.mtw, this.mth)
    this.ctx.restore()
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
    // 是否锁定目标
    if(currentTime - this.launchTime > this.lockingTime){
      // 计算方向向量
      const dx = tx - this.x
      const dy = ty - this.y
      // 计算距离
      const distance = Math.sqrt(dx * dx + dy * dy)
      // 标准化方向向量
      const directionX = dx / distance
      const directionY  = dy / distance
      // 更新位置
      this.x += directionX * this.speed
      this.y += directionY * this.speed
      // 计算旋转角度
      this.rotate = -Math.atan2(dx, dy)
      // 判断是否到达目标点
      if(distance < this.speed){
        this.isDestroyed = true
      }
    }else{
      const y = this.y - this.speed
      if(y - this.h >= - this.h * 2){
        this.y = y
      }else{
        this.isDestroyed = true
      }
    }
    this.draw(ctx, currentTime)
  }
  /**
   * @description: 绘制
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */ 
  draw(ctx: CanvasRenderingContext2D, currentTime: number): void{
    this.spin(this.rotate, currentTime)
    ctx.drawImage(this.cas, this.x - this.h / 2, this.y, this.h, this.h)
  }
}