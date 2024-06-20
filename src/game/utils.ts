/*
 * @Description: 工具
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-18 15:10:22
 * @LastEditTime: 2024-06-20 14:52:59
 * @FilePath: \striker-1945\src\game\utils.ts
 */
import { isOffscreenCanvas } from './config'
/**
 * @description: 创建离屏画布
 * @param {number} w 宽
 * @param {number} h 高
 * @return {HTMLCanvasElement | OffscreenCanvas}
 */
const createOffscreenCanvas = (w: number, h: number): HTMLCanvasElement | OffscreenCanvas =>{
  if(isOffscreenCanvas){
    return new OffscreenCanvas(w, h)
  }else{
    const cas = document.createElement('canvas')
    cas.width = w
    cas.height = h
    return cas
  }
}
export{
  createOffscreenCanvas
}