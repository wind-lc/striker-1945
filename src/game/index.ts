/*
 * @Description: 游戏主类
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-14 11:19:15
 * @LastEditTime: 2024-06-24 18:16:49
 * @FilePath: \striker-1945\src\game\index.ts
 */
import { imgs, isOffscreenCanvas, playerCof, processCof } from './config'
import EnemyAircraft from './enemyAircraft'
import Fps from './fps'
import Player from './player'
import { createOffscreenCanvas } from './utils'
// 离屏画布
export type TOffscreenCas = {
  [index:string]: HTMLCanvasElement | OffscreenCanvas
}
// 坐标
type Tcoordinate = {
  x: number
  y: number
}
export default class Game {
  // 游戏画布
  private cas: HTMLCanvasElement
  // 画布上下文
  private ctx: CanvasRenderingContext2D
  // 最后一帧时间
  private lastFrameTime: number
  // 帧数
  private frameCount: number
  // 每秒帧数
  private fps: number
  // 最后每秒帧数更新时间
  private lastFpsUpdateTime: number
  // 目标每秒帧数
  private targetFps: number
  // 目标帧持续时间
  private targetFrameDuration: number
  // 离屏画布上
  private offscreenCas: TOffscreenCas
  // 图片资源
  private images: { [index: string]: HTMLImageElement }
  // 所有元素
  private elements: { [index: string]: Fps | Player | EnemyAircraft}
  // 游戏主程序时间
  private time: number
  // 游戏关卡索引
  private index: number
  // 游戏进程索引
  private processIndex: number
  // 游戏最后一次进程时间
  private lastProcessTime: number
  // 玩家飞机位置(拖拽位置，敌人目标位置)
  private playerLocation: {[index: string]: number}
  /**
   * @description: 游戏主类
   * @param {HTMLCanvasElement} canvas 游戏画布dom对象
   * @param {number} targetFps 目标每秒帧数
   * @return {void}
   */
  constructor(el: string, targetFps: number = 60){
    this.cas = document.querySelector(el) as HTMLCanvasElement
    this.cas.width = window.innerWidth
    this.cas.height = window.innerHeight
    this.ctx = this.cas.getContext('2d')!
    this.lastFrameTime = performance.now()
    this.frameCount = 0
    this.fps = targetFps
    this.lastFpsUpdateTime = this.lastFrameTime
    this.targetFps = targetFps
    this.targetFrameDuration = Math.floor(1000 / this.targetFps)
    this.offscreenCas = {}
    this.images = {}
    this.elements = {}
    this.time = 0
    this.index = 0
    this.processIndex = 0
    this.lastProcessTime = 0
    // 默认底部居中
    this.playerLocation = {
      // x: Math.floor(this.cas.width / 2),
      x: 10,
      y: Math.floor(this.cas.height - 30)
    }
  }
  /**
   * @description: 加载资源
   * @return {void}
   */  
  private loadResources(): Promise<void>{
    return new Promise(async(resolve, reject) => {
      try {
        for(let key in imgs){
          this.images[key] = await this.loadImage(imgs[key])
          const ofc = createOffscreenCanvas(this.images[key].width, this.images[key].height)
          this.offscreenCas[key] = ofc;
          (ofc.getContext('2d')! as CanvasRenderingContext2D).drawImage(this.images[key], 0, 0)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }
  /**
   * @description: 图片资源加载
   * @param {string} src 地址
   * @return {void}
   */
  private loadImage(src: string): Promise<HTMLImageElement>{
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve(img)
      img.onerror = err => reject(err)
    })
  }
  /**
   * @description: 游戏进程
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  private process(currentTime: number): void{
    if(this.lastProcessTime > 0){
      const process = processCof[this.index][this.processIndex]
      // 大于等于进程间隔时间
      if(currentTime - this.lastProcessTime >= process.interval){
        // const list = []
        // for(let i = 0; i < process.quantity; i++){
        //   const air = new EnemyAircraft(process.name, )
        //   list.push(air)
        //   this.elements[process.name] = air
        // }
        
      }
    }
  }
  /**
   * @description: 游戏初始化
   * @return {void}
   */
  init(): void{
    console.log('初始化中...')
    this.loadResources().then(() => {
      console.log('初始化完成')
      // 开始监测FPS
      this.elements['fps'] = new Fps({
        '0': this.offscreenCas['0'],
        '1': this.offscreenCas['1'],
        '2': this.offscreenCas['2'],
        '3': this.offscreenCas['3'],
        '4': this.offscreenCas['4'],
        '5': this.offscreenCas['5'],
        '6': this.offscreenCas['6'],
        '7': this.offscreenCas['7'],
        '8': this.offscreenCas['8'],
        '9': this.offscreenCas['9'],
      }, this.fps)
      // 生成玩家
      this.elements['player'] = new Player(
        {
          player: this.offscreenCas['player'],
          propeller1: this.offscreenCas['propeller1'],
          destroy: this.offscreenCas['destroy'],
          bullet1: this.offscreenCas['bullet1'],
          bullet2: this.offscreenCas['bullet2'],
          missile: this.offscreenCas['missile1'],
          tailFlame: this.offscreenCas['tailFlame'],
        },
        this.playerLocation.x,
        this.playerLocation.y
      )
      // 开启事件监听
      this.listeningEvent()
      // 绑定this
      this.loop = this.loop.bind(this)
      requestAnimationFrame(this.loop)
    }).catch(err => {
      console.log(err)
    })
  }
  /**
   * @description: 边界处理
   * @param {number} sx x坐标
   * @param {number} sy y坐标
   * @return {Tcoordinate}
   */      
  private handleBoundary(sx: number, sy: number): Tcoordinate{
    let x = sx, y = sy
    if (sx <= 0) {
      x = 0
    }
    if (sx >= this.cas.width) {
      x = this.cas.width
    }
    if (sy <= -playerCof.h * 0.5) {
      y = -playerCof.h * 0.5
    }
    if (sy >= this.cas.height - playerCof.h * 0.5) {
      y = this.cas.height - playerCof.h * 0.5
    }
    return { x, y }
  }
  /**
   * @description: 鼠标拖拽/手指触摸监听
   * @return {void}
   */  
  private listeningEvent() :void{
    // 支持触摸事件
    const useTouch = this.cas.ontouchstart === null
    /**
     * @description: 鼠标按下/手指触摸
     * @param {MouseEvent | TouchEvent} e 事件对象
     * @return {void}
     */    
    const startDrag = (e: MouseEvent | TouchEvent): void => {
      e.preventDefault()
      const startX = useTouch ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      const startY = useTouch ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
      const offsetX = startX - this.playerLocation.x
      const offsetY = startY - this.playerLocation.y
      // 点击事件触发范围在玩家飞机之外不能拖拽
      // if(offsetX < -playerCof.w * 0.5 || offsetX > playerCof.w * 0.5 || offsetY < 0 || offsetY > playerCof.h) return
      /**
       * @description: 鼠标移动
       * @param {MouseEvent} e 鼠标事件对象
       * @return {void}
       */      
      const onMouseMove = (e: MouseEvent): void => {
        const o = this.handleBoundary(e.clientX - offsetX, e.clientY - offsetY)
        this.playerLocation = o
      }
      /**
       * @description: 触摸移动
       * @param {TouchEvent} e 触摸事件对象
       * @return {void}
       */ 
      const onTouchMove = (e: TouchEvent): void => {
        this.playerLocation = this.handleBoundary(e.touches[0].clientX - offsetX, e.touches[0].clientY - offsetY)
      }
      /**
       * @description: 鼠标弹起
       * @return {void}
       */ 
      const onMouseUp = (): void => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      /**
       * @description: 触摸移动结束
       * @return {void}
       */ 
      const onTouchEnd = (): void => {
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
      }
      if(useTouch){
        document.addEventListener('touchmove', onTouchMove)
        document.addEventListener('touchend', onTouchEnd)
      }else{
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }
    }
    if(useTouch){
      this.cas.addEventListener('touchstart', startDrag)
    }else{
      this.cas.addEventListener('mousedown', startDrag)
    }
  } 
  /**
   * @description: 更新
   * @param {number} currentTime 当前帧时间
   * @param {number} deltaTime 增量时间
   * @return {void}
   */  
  private update(currentTime: number, deltaTime: number) {
    this.lastFrameTime = currentTime
    this.frameCount++
    // 每秒更新一次fps计数
    if(currentTime - this.lastFpsUpdateTime >= 1000){
      this.fps = this.frameCount
      this.frameCount = 0
      this.lastFpsUpdateTime = currentTime
      this.elements['fps'].update(this.ctx, this.fps)
    }
    // 清除画布
    this.ctx.clearRect(0, 0, this.cas.width, this.cas.height)
    // 更新重绘
    for(let key in this.elements){
      // 
      if(key === 'player'){
        this.elements[key].update(this.ctx, currentTime, this.playerLocation.x, this.playerLocation.y)
      }
    }
  }
  /**
   * @description: 绘制
   * @param {number} deltaTime 增量时间
   * @return {void}
   */  
  private draw(deltaTime: number): void{

  }
  /**
   * @description: 游戏主要循环，处理渲染逻辑
   * @param {number} currentTime 当前帧时间
   * @return {void}
   */  
  private loop(currentTime: number): void{
    console.log(currentTime)
    // 增量时间
    const deltaTime = currentTime - this.lastFrameTime;
    // 如果当前帧与上一帧的时间差大于等于目标帧的时间间隔，则更新和绘制下一帧
    if(currentTime - this.lastFrameTime >= this.targetFrameDuration){
      this.update(currentTime, deltaTime)
    }
    if(this.time === 0){
      this.time = currentTime
      this.lastProcessTime = currentTime
    }else {
      this.process(currentTime)
    }
    requestAnimationFrame(this.loop)
  }
}