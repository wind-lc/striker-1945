/*
 * @Description: 
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-14 10:42:08
 * @LastEditTime: 2024-06-17 09:14:47
 * @FilePath: \striker-1945\src\main.ts
 */
import Game from "./game"

window.onload = () => {
  const game = new Game('#game', 60)
  game.init()
}