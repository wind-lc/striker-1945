/*
 * @Description: 玩家
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 14:45:52
 * @LastEditTime: 2024-06-20 15:00:17
 * @FilePath: \striker-1945\src\game\player.ts
 */
import Aircraft from './aircraft'
import Bullet from './bullet'
import { playerCof, playerAttitudeCof, isOffscreenCanvas, playerPropellerAttitudeCof, destroyCof, destroyAnimationCof } from './config'
import { createOffscreenCanvas } from './utils'
const cas = createOffscreenCanvas(playerCof.w, playerCof.h + playerCof.ph)
const sCas = createOffscreenCanvas(playerCof.sw, playerCof.sh)

type TimgCas = {
  // 玩家飞机图片
  player: HTMLCanvasElement | OffscreenCanvas
  // 玩家螺旋桨图片
  propeller1: HTMLCanvasElement | OffscreenCanvas
  // 玩家被摧毁图片
  destroy: HTMLCanvasElement | OffscreenCanvas
  // 玩家子弹1
  bullet1: HTMLCanvasElement | OffscreenCanvas
  // 玩家子弹2
  bullet2: HTMLCanvasElement | OffscreenCanvas
}
export default class Player extends Aircraft{
  // 图片画布
  imgCas: TimgCas
  // 最后更新时间
  lastUpdateTime: number
  // 姿态索引
  attitudeIndex: number
  // 目标姿态索引
  targetAttitudeIndex: number
  // 飞机姿态更新时间差
  upadateAttitudeTime: number = 32
  // 鼠标/触摸位置
  playerLocationX: number | null
  // 最后移动时间
  lastStopAttitudeTime: number
  // 飞机螺旋桨索引
  playerPropellerIndex: number
  // 飞机螺旋桨最后更新时间
  lastPlayerPropellerTime: number
  // 飞机螺旋桨更新时间差
  upadatePropellerAttitudeTime: number = 32
  // 摧毁更新时间差
  updateDestroyTime: number = 32
  // 摧毁最后更新时间
  lastDestroyTime: number
  // 摧毁索引
  destroyIndex: number
  /**
   * @description: 玩家
   * @param {TimgCas} imgCas 鼠标拖拽/手指触摸x坐标
   * @param {number} mx 鼠标拖拽/手指触摸x坐标
   * @param {number} my 鼠标拖拽/手指触摸y坐标
   * @return {void}
   */  
  constructor(imgCas: TimgCas, mx: number, my: number){
    super(
      cas,
      cas.getContext('2d')! as CanvasRenderingContext2D,
      sCas,
      sCas.getContext('2d')! as CanvasRenderingContext2D,
      Math.floor(mx - playerCof.w / 2),
      my - playerCof.h / 2,
      playerCof.w,
      playerCof.h + playerCof.ph,
      playerCof.hp,
      []
    )
    this.imgCas = imgCas
    this.lastUpdateTime = 0
    this.attitudeIndex = 0
    this.targetAttitudeIndex = 4
    this.playerLocationX = null
    this.lastStopAttitudeTime = 0
    this.playerPropellerIndex = 0
    this.lastPlayerPropellerTime = 0
    this.lastDestroyTime = 0
    this.destroyIndex = 0
    this.updateAttitude(4)
  }
  /**
   * @description: 更新飞机姿态
   * @param {number} x x坐标
   * @return {void}
   */  
  private updateAttitude(x: number): void{
    if(x === this.attitudeIndex) return
    this.attitudeIndex = x
    this.ctx.clearRect(0, playerCof.ph, this.cas.width, this.cas.height - playerCof.ph)
    this.ctx.drawImage(
      this.imgCas.player,
      playerAttitudeCof[x].sx,
      playerAttitudeCof[x].sy,
      playerCof.iw,
      playerCof.ih,
      0,
      playerCof.ph - 2,
      playerCof.w,
      playerCof.h
    )
    this.sCtx.clearRect(0, 0, this.sCas.width, this.sCas.height)
    this.sCtx.drawImage(
      this.imgCas.player,
      playerAttitudeCof[x].shadow.sx,
      playerAttitudeCof[x].shadow.sy,
      playerCof.siw,
      playerCof.sih,
      0,
      0,
      playerCof.sw,
      playerCof.sh,
    )
  }
  /**
   * @description: 获取姿态索引
   * @param {number} range 偏移量
   * @return {number}
   */  
  private getAttitudeIndex(range: number): number{
    let i = 0
    // 判断索引
    if(range <= -10){
      i = 0
    }else if(range > -10 && range <=-8){
      i = 1
    }else if(range > -8 && range <= -6){
      i = 2
    }else if(range > -6 && range < -4){
      i = 3
    }else if(range >= -4 && range <= 4){
      i = 4
    }else if(range > 4 && range < 6){
      i = 5
    }else if(range >= 6 && range < 8){
      i = 6
    }else if(range >= 8 && range < 10){
      i = 7
    }else if(range >= 10){
      i = 8
    }
    return i
  }
  /**
   * @description: 更新螺旋桨
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */
  private updatePropeller(currentTime: number): void{
    if(currentTime - this.lastPlayerPropellerTime > this.upadatePropellerAttitudeTime){
      let i = this.playerPropellerIndex
      if(i >= 2){
        i = 0
      }else {
        i ++
      }
      this.ctx.clearRect(0, 0, this.cas.width, playerCof.ph)
      this.ctx.drawImage(
        this.imgCas.propeller1,
        playerPropellerAttitudeCof[i].sx,
        playerPropellerAttitudeCof[i].sy,
        playerCof.piw,
        playerCof.pih,
        playerCof.w / 2 - playerCof.pw / 2,
        0,
        playerCof.pw,
        playerCof.ph
      )
      this.playerPropellerIndex = i
      this.lastPlayerPropellerTime = currentTime
    }
  }
  /**
   * @description: 摧毁
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */ 
  private destroy(currentTime: number): void{
    this.ctx.clearRect(0, 0, this.cas.width, this.cas.height)
    this.ctx.drawImage(
      this.imgCas.destroy,
      destroyAnimationCof[this.destroyIndex].sx,
      destroyAnimationCof[this.destroyIndex].sy,
      destroyCof.w,
      destroyCof.h,
      this.cas.width / 2 - destroyCof.w / 2,
      this.cas.height / 2 - destroyCof.h / 2,
      destroyCof.w,
      destroyCof.h
    )
    this.lastDestroyTime = currentTime
    this.destroyIndex ++
    if(this.destroyIndex > 14){
      this.destroyIndex = 0
      this.hp = -1
    }
  }
  /**
   * @description: 开火
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  fire(){
    // this.bullets.push(new Bullet())
  }
  /**
   * @description: 更新
   * @param {number} currentTime 当前帧时间
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @return {void}
   */  
  update(currentTime: number, x: number = 0, y: number = 0): void{
    if(this.hp <= 0){
      if(currentTime - this.lastDestroyTime > this.updateDestroyTime){
        this.destroy(currentTime)
      }
      return
    }
    // 飞机螺旋桨更新
    this.updatePropeller(currentTime)
    // 飞机姿态更新逻辑
    const range = x - this.x
    this.x = x
    this.y = y
    if(this.playerLocationX !== x){
      // 移动中
      if(this.playerLocationX === null){
        // 初次默认居中
        this.updateAttitude(4)
      }else{
        this.targetAttitudeIndex = this.getAttitudeIndex(range)
        if(4 > this.targetAttitudeIndex){
          this.updateAttitude(this.targetAttitudeIndex)
        }
        if(4 < this.targetAttitudeIndex){
          this.updateAttitude(this.targetAttitudeIndex)
        }
        this.lastStopAttitudeTime = currentTime
      }
      this.playerLocationX = x
    }else{
      // 停止
      if(currentTime - this.lastStopAttitudeTime > this.upadateAttitudeTime){
        let i = 4
        // 左自动恢复
        if(4 > this.attitudeIndex){
          i = this.attitudeIndex > 4 ? this.attitudeIndex - 1 : 4
        }
        // 右自动恢复
        if(4 < this.attitudeIndex){
          i = this.attitudeIndex < 4 ? this.attitudeIndex + 1 : 4
        }
        this.updateAttitude(i)
        this.lastStopAttitudeTime = currentTime
      }
      
    }
  }
  /**
   * @description: 绘制
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @return {void}
   */
  draw(ctx: CanvasRenderingContext2D): void{
    if(this.hp > -1){
      ctx.drawImage(this.cas, Math.floor(this.x - playerCof.w / 2), this.y - playerCof.h / 2, this.w, this.h)
    }
    if(this.hp > 0){
      ctx.drawImage(this.sCas, Math.floor(this.x - playerCof.w / 2) + playerCof.sx, this.y - playerCof.h / 2 + playerCof.sy)
    }
  }
}