/*
 * @Description: 资源配置
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 15:13:38
 * @LastEditTime: 2024-06-20 16:47:07
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
// 玩家飞机螺旋桨
type TplayerPropellerAttitudeCof = {
  // 开始剪切的x坐标位置
  sx: number
  // 开始剪切的y坐标位置
  sy: number
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
  sx: -10,
  // 影子y坐标偏移
  sy: 65,
  // 影子宽度
  sw: 33,
  // 影子高度
  sh: 25.5,
  // 影子图片宽度
  siw: 66,
  // 影子图片高度
  sih: 51,
  // 螺旋桨宽度
  pw: 23,
  // 螺旋桨高度
  ph: 4,
  // 螺旋桨图片宽度
  piw: 46,
  // 螺旋桨图片高度
  pih: 8,
  // 生命值
  hp: 5,
  // 子弹宽度
  bw: 11,
  // 子弹高度
  bh: 33.3,
  // 子弹图片宽度
  biw: 33,
  // 子弹图片高度
  bih: 100,
  // 子弹速度(像素/帧)
  speed: 10
}
// 玩家螺旋桨姿态
const playerPropellerAttitudeCof: TplayerPropellerAttitudeCof[] = [
  {
    sx: 0,
    sy: 0
  },
  {
    sx: 46,
    sy: 0
  },
  {
    sx: 92,
    sy: 0
  },
]
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
// 摧毁配置
const destroyCof = {
  w: 70,
  h: 68
}
// 摧毁动画配置
const destroyAnimationCof = [
  {
    sx: 0,
    sy: 0
  },
  {
    sx: 82,
    sy: 0
  },
  {
    sx: 164,
    sy: 0
  },
  {
    sx: 246,
    sy: 0
  },
  {
    sx: 328,
    sy: 0
  },
  {
    sx: 410,
    sy: 0
  },
  {
    sx: 492,
    sy: 0
  },
  {
    sx: 574,
    sy: 0
  },
  {
    sx: 656,
    sy: 0
  },
  {
    sx: 738,
    sy: 0
  },
  {
    sx: 820,
    sy: 0
  },
  {
    sx: 902,
    sy: 0
  },
  {
    sx: 984,
    sy: 0
  },
  {
    sx: 1066,
    sy: 0
  },
  {
    sx: 1148,
    sy: 0
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
  'propeller1': '/src/assets/img/propeller1.webp',
  'player': '/src/assets/img/player.webp',
  'destroy': '/src/assets/img/destroy.webp',
  'bullet1': '/src/assets/img/bullet1.webp',
  'bullet2': '/src/assets/img/bullet2.webp'
}
export {
  isOffscreenCanvas,
  fpsCof,
  playerCof,
  playerPropellerAttitudeCof,
  playerAttitudeCof,
  destroyCof,
  destroyAnimationCof,
  imgs
}

