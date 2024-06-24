/*
 * @Description: 敌机
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-24 15:58:55
 * @LastEditTime: 2024-06-24 17:44:48
 * @FilePath: \striker-1945\src\game\enemyAircraft.ts
 */
import Aircraft from './aircraft'
import { enemyAircraftCof } from './config'
import { createOffscreenCanvas } from './utils'
export default class EnemyAircraft extends Aircraft{
  // 敌机类型索引
  protected typeIndex: number
  /**
   * @description: 飞机
   * @param {number} typeIndex 敌机索引
   * @param {number} x 横轴坐标位置
   * @param {number} y 纵轴坐标位置
   * @param {number} hp 生命值
   * @return {void}
   */ 
  constructor(typeIndex: number, x: number, y: number, hp: number){
    super(
      createOffscreenCanvas(enemyAircraftCof[typeIndex].w, enemyAircraftCof[typeIndex].h),
      createOffscreenCanvas(enemyAircraftCof[typeIndex].w, enemyAircraftCof[typeIndex].h),
      x,
      y,
      enemyAircraftCof[typeIndex].w,
      enemyAircraftCof[typeIndex].h,
      hp,
      []
    )
    this.typeIndex = typeIndex
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} currentTime 当前帧时间
   * @param {number} x 玩家x坐标
   * @param {number} y 玩家y坐标
   * @return {void}
   */  
  update(ctx: CanvasRenderingContext2D, currentTime: number, x: number = 0, y: number = 0): void{
    this.draw(ctx)
  }
  /**
   * @description: 绘制
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @return {void}
   */
  draw(ctx: CanvasRenderingContext2D): void{
    ctx.drawImage(this.cas, this.x - this.w / 2, this.y, this.w, this.h)
    // if(this.hp > -1){
    //   ctx.drawImage(this.cas, Math.floor(this.x - playerCof.w / 2), this.y - playerCof.h / 2, this.w, this.h)
    // }
    // if(this.hp > 0){
    //   ctx.drawImage(this.sCas, Math.floor(this.x - playerCof.w / 2) + playerCof.sx, this.y - playerCof.h / 2 + playerCof.sy)
    // }
  }
}