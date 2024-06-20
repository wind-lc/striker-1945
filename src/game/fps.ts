
/*
 * @Description: FPS监测
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 11:19:44
 * @LastEditTime: 2024-06-17 16:11:53
 * @FilePath: \striker-1945\src\game\fps.ts
 */
import { fpsCof } from './config'
import GameObject from './gameObject'
import { TOffscreenCas } from './index'
export default class Fps extends GameObject{
  // 图片画布
  private imgCas: TOffscreenCas
  // 每秒帧率
  private fps: number
  /**
   * @description: FPS监测
   * @param {TOffscreenCas} imgCas 图片画布
   * @param {number} fps 每秒帧率
   * @return {void}
   */  
  constructor(imgCas: TOffscreenCas, fps: number){
    super(10, 10, fpsCof.w * 2 + 5, fpsCof.h)
    this.imgCas = imgCas
    this.fps = fps
  }
  /**
   * @description: 更新
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @param {number} fps 每秒帧数
   * @return {void}
   */
  update(ctx: CanvasRenderingContext2D, fps: number): void{
    this.fps = fps
    this.draw(ctx)
  }
  /**
   * @description: 绘制
   * @param {CanvasRenderingContext2D} ctx 游戏画布对象
   * @return {void}
   */
  draw(ctx: CanvasRenderingContext2D): void{
    const f = this.fps.toString().split('')
    f.forEach((el, i) => {
      ctx.drawImage(this.imgCas[el], i * (fpsCof.w + 2.5) + 5.5, 5, fpsCof.w, fpsCof.h)
    })
  }
}