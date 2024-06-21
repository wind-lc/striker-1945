/*
 * @Description: 玩家
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 14:45:52
 * @LastEditTime: 2024-06-21 17:35:22
 * @FilePath: \striker-1945\src\game\player.ts
 */
import Aircraft from './aircraft'
import Bullet from './bullet'
import Missile from './missile'
import { playerCof, playerAttitudeCof, playerPropellerAttitudeCof, destroyCof, destroyAnimationCof } from './config'
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
  // 玩家导弹
  missile: HTMLCanvasElement | OffscreenCanvas
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
  // 最后一次开火时间
  lastFireTime: number
  // 开火时间时间差
  updateFireTime: number = 80
  // 火力等级
  power: number = 1
  // 子弹伤害
  bDamage: number[] = [2,6]
  // 子弹图片列表
  private bulletImg: (HTMLCanvasElement | OffscreenCanvas)[]
  // 导弹
  protected missiles: Missile[]
  // 最后一次发射导弹时间
  lastLaunchTime: number
  // 发射导弹时间差
  updateLaunchTime: number = 3200
  // 导弹伤害
  mDamage: number = 10
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
      sCas,
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
    this.lastFireTime = 0
    this.bulletImg = [this.imgCas.bullet1, this.imgCas.bullet2]
    this.missiles = []
    this.lastLaunchTime = 0
    this.updateAttitude(4)
    // setTimeout(()=>{this.hp = 0},1000)
    setInterval(()=>{
      this.power = this.power + 1 > 8 ? 8 : this.power +1
    },2000)
  }
  /**
   * @description: 更新飞机姿态
   * @param {number} x x坐标
   * @return {void}
   */  
  private updateAttitude(x: number): void{
    if(x === this.attitudeIndex) return
    this.attitudeIndex = x
    this.ctx.clearRect(0, playerCof.ph, this.w, this.h - playerCof.ph)
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
      this.ctx.clearRect(0, 0, this.w, playerCof.ph)
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
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.drawImage(
      this.imgCas.destroy,
      destroyAnimationCof[this.destroyIndex].sx,
      destroyAnimationCof[this.destroyIndex].sy,
      destroyCof.w,
      destroyCof.h,
      this.w / 2 - destroyCof.w / 2,
      this.h / 2 - destroyCof.h / 2,
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
  private fire(currentTime: number): void{
    const x = [this.x - (playerCof.bw + 3) * 2, this.x - (playerCof.bw + 3), this.x, this.x + playerCof.bw + 3, this.x + (playerCof.bw + 3) * 2]
    const y = [this.y - 10, this.y - 15, this.y - 20, this.y - 15, this.y - 10]
    const bCof = [
      [
        [x[1],y[1]],
        [x[3],y[3]]
      ],
      [
        [x[1],y[1]],
        [x[2],y[2]],
        [x[3],y[3]]
      ],
      [
        [x[0],y[0]],
        [x[1],y[1]],
        [x[3],y[3]],
        [x[4],y[4]]
      ],
      [
        [x[0],y[0]],
        [x[1],y[1]],
        [x[2],y[2]],
        [x[3],y[3]],
        [x[4],y[4]]
      ],
      [
        [x[1],y[1]],
        [x[3],y[3]]
      ],
      [
        [x[1],y[1]],
        [x[2],y[2]],
        [x[3],y[3]]
      ],
      [
        [x[0],y[0]],
        [x[1],y[1]],
        [x[3],y[3]],
        [x[4],y[4]]
      ],
      [
        [x[0],y[0]],
        [x[1],y[1]],
        [x[2],y[2]],
        [x[3],y[3]],
        [x[4],y[4]]
      ],
    ]
    for(let i = 0; i < bCof[this.power - 1].length; i++){
      this.bullets.push(new Bullet(this.bulletImg[this.power > 4 ? 1 : 0], playerCof.bw, playerCof.bh, bCof[this.power - 1][i][0], bCof[this.power - 1][i][1], playerCof.bSpeed, this.bDamage[this.power > 4 ? 1 : 0]))
    }
    this.lastFireTime = currentTime
  }
  /**
   * @description: 更新子弹位置
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  private updateBullets(ctx: CanvasRenderingContext2D, currentTime: number): void{
    let i = 0
    while (i < this.bullets.length) {
      if (this.bullets[i].isDestroyed) {
        this.bullets.splice(i, 1)
      } else {
        this.bullets[i].update(ctx, currentTime)
        i++
      }
    }
  }
  /**
   * @description: 发射导弹
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  private launch(currentTime: number): void{
    this.missiles.push(new Missile(this.imgCas.missile, playerCof.mw, playerCof.mh, this.x, this.y, playerCof.mSpeed, this.mDamage, true))
    this.lastLaunchTime = currentTime
  }
  /**
   * @description: 更新导弹位置
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */
  private updateMissiles(ctx: CanvasRenderingContext2D, currentTime: number): void{
    let i = 0
    while (i < this.missiles.length) {
      if (this.missiles[i].isDestroyed) {
        this.missiles.splice(i, 1)
      } else {
        this.missiles[i].update(ctx, currentTime)
        i++
      }
    }
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @return {void}
   */  
  update(ctx: CanvasRenderingContext2D, currentTime: number, x: number = 0, y: number = 0): void{
    // 更新子弹位置
    if(this.bullets.length > 0){
      this.updateBullets(ctx, currentTime)
    }
    // 更导弹弹位置
    if(this.missiles.length > 0){
      this.updateMissiles(ctx, currentTime)
    }
    // 被摧毁时不再更新飞机位置
    if(this.hp <= 0){
      if(currentTime - this.lastDestroyTime > this.updateDestroyTime){
        this.destroy(currentTime)
      }
    }else{
      // 飞机螺旋桨更新
      this.updatePropeller(currentTime)
      // 飞机姿态更新逻辑
      const range = x - this.x
      this.x = x
      this.y = y
      // 开火
      if(currentTime - this.lastFireTime > this.updateFireTime || this.lastFireTime === 0){
        // this.fire(currentTime)
      }
      // 发射导弹
      if(currentTime - this.lastLaunchTime > this.updateLaunchTime || this.lastLaunchTime === 0){
        this.launch(currentTime)
      }
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
    this.draw(ctx)
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