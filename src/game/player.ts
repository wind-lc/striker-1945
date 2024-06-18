/*
 * @Description: 玩家
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 14:45:52
 * @LastEditTime: 2024-06-18 19:08:34
 * @FilePath: \striker-1945\src\game\player.ts
 */
import Aircraft from './aircraft'
import { playerCof, playerAttitudeCof, isOffscreenCanvas } from './config'
const cas = isOffscreenCanvas ? new OffscreenCanvas(playerCof.w, playerCof.h) : document.createElement('canvas')
const sCas = isOffscreenCanvas ? new OffscreenCanvas(playerCof.sw, playerCof.sh) : document.createElement('canvas')
export default class Player extends Aircraft{
  // 图片画布
  imgCas: HTMLCanvasElement | OffscreenCanvas
  // 最后更新时间
  lastUpdateTime: number
  // 姿态索引
  attitudeIndex: number
  // 目标姿态索引
  targetAttitudeIndex: number
  // 鼠标/触摸位置
  playerLocationX: number | null
  // 最后移动时间
  lastStopAttitudeTime: number
  /**
   * @description: 玩家
   * @param {number} mx 鼠标拖拽/手指触摸x坐标
   * @param {number} my 鼠标拖拽/手指触摸y坐标
   * @return {void}
   */  
  constructor(imgCas: HTMLCanvasElement | OffscreenCanvas, mx: number, my: number){
    super(
      cas,
      cas.getContext('2d')! as CanvasRenderingContext2D,
      sCas,
      sCas.getContext('2d')! as CanvasRenderingContext2D,
      Math.floor(mx - playerCof.w / 2),
      my - playerCof.h / 2,
      playerCof.w,
      playerCof.h,
      playerCof.hp
    )
    this.imgCas = imgCas
    this.lastUpdateTime = 0
    this.attitudeIndex = 0
    this.targetAttitudeIndex = 4
    this.playerLocationX = null
    this.lastStopAttitudeTime = 0
    this.updateAttitude(4)
  }
  /**
   * @description: 更新姿态
   * @param {number} x x坐标
   * @return {void}
   */  
  private updateAttitude(x: number): void{
    if(x === this.attitudeIndex) return
    this.attitudeIndex = x
    this.clear()
    this.ctx.drawImage(
      this.imgCas,
      playerAttitudeCof[x].sx,
      playerAttitudeCof[x].sy,
      playerCof.iw,
      playerCof.ih,
      0,
      0,
      this.w,
      this.h
    )
    this.sCtx.drawImage(
      this.imgCas,
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
   * @param {number} x x坐标
   * @return {number}
   */  
  private getAttitudeIndex(range: number, x: number): number{
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
   * @description: 更新
   * @param {number} currentTime 当前帧时间
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @return {void}
   */  
  update(currentTime: number, x: number = 0, y: number = 0): void{
    const range = x - this.x
    this.x = x
    this.y = y
    if(this.playerLocationX !== x){
      // 移动中
      if(this.playerLocationX === null){
        // 初次默认居中
        this.updateAttitude(4)
      }else{
        this.targetAttitudeIndex = this.getAttitudeIndex(range, x)
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
      if(currentTime - this.lastStopAttitudeTime > 32){
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
    ctx.drawImage(this.cas, Math.floor(this.x - playerCof.w / 2), this.y, this.w, this.h)
    ctx.drawImage(this.sCas, Math.floor(this.x - playerCof.w / 2) + playerCof.sx, this.y + playerCof.sy)
  }
}