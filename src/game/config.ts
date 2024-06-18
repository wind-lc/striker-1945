/*
 * @Description: 资源配置
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 15:13:38
 * @LastEditTime: 2024-06-17 18:01:38
 * @FilePath: \striker-1945\src\game\config.ts
 */
// 图片类型
type TImg = {
  [index: string]: string
}
// 玩家飞机阴影
type TplayerShadowAttitudeCof = {
  // 开始剪切的x坐标位置
  sx: number
  // 开始剪切的y坐标位置
  sy: number
}
// 玩家飞机
type TplayerAttitudeCof = {
  // 开始剪切的x坐标位置
  sx: number
  // 开始剪切的y坐标位置
  sy: number
  // 影子配置
  shadow: TplayerShadowAttitudeCof
}
// 是否支持离屏渲染画布
const isOffscreenCanvas: boolean = typeof OffscreenCanvas !== 'undefined'
// fps属性配置，单个图片
const fpsCof = {
  // 实际宽度
  w: 8.5,
  // 实际高度
  h: 18.5,
  // 图片宽度
  iw: 34,
  // 图片高度
  ih: 74
}
// 玩家飞机属性设置
const playerCof = {
  // 实际宽度
  w: 66,
  // 实际高度
  h: 51,
  // 图片宽度
  iw: 66,
  // 图片高度
  ih: 51,
  // 影子x坐标偏移
  sx: 16.5,
  // 影子y坐标偏移
  sy: 55,
  // 影子宽度
  sw: 33,
  // 影子高度
  sh: 25.5,
  // 影子图片宽度
  siw: 66,
  // 影子图片高度
  sih: 51,
  // 生命值
  hp: 100
}
// 玩家飞机多个姿态合成雪碧图
const playerAttitudeCof: TplayerAttitudeCof[] = [
  {
    sx: 0,
    sy: 0,
    shadow: {
      sx: 0,
      sy: 51
    }
  },
  {
    sx: 66,
    sy: 0,
    shadow: {
      sx: 66,
      sy: 51
    }
  },
  {
    sx: 132,
    sy: 0,
    shadow: {
      sx: 132,
      sy: 51
    }
  },
  {
    sx: 198,
    sy: 0,
    shadow: {
      sx: 198,
      sy: 51
    }
  },
  {
    sx: 264,
    sy: 0,
    shadow: {
      sx: 264,
      sy: 51
    }
  },
  {
    sx: 330,
    sy: 0,
    shadow: {
      sx: 330,
      sy: 51
    }
  },
  {
    sx: 396,
    sy: 0,
    shadow: {
      sx: 396,
      sy: 51
    }
  },
  {
    sx: 462,
    sy: 0,
    shadow: {
      sx: 462,
      sy: 51
    }
  },
  {
    sx: 528,
    sy: 0,
    shadow: {
      sx: 528,
      sy: 51
    }
  }
]
// 所有图片
const imgs:TImg = {
  '0': '/src/assets/img/0.webp',
  '1': '/src/assets/img/1.webp',
  '2': '/src/assets/img/2.webp',
  '3': '/src/assets/img/3.webp',
  '4': '/src/assets/img/4.webp',
  '5': '/src/assets/img/5.webp',
  '6': '/src/assets/img/6.webp',
  '7': '/src/assets/img/7.webp',
  '8': '/src/assets/img/8.webp',
  '9': '/src/assets/img/9.webp',
  'player': '/src/assets/img/player.webp'
}
export {
  isOffscreenCanvas,
  fpsCof,
  playerCof,
  playerAttitudeCof,
  imgs
}

