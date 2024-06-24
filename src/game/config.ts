/*
 * @Description: 资源配置
 * @Author: wind-lc
 * @version: 1.0
 * @Date: 2024-06-17 15:13:38
 * @LastEditTime: 2024-06-24 16:26:26
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
  bSpeed: 16,
  // 导弹宽度
  mw: 9,
  // 导弹高度
  mh: 25.5,
  // 导弹图片宽度
  miw: 12,
  // 导弹图片高度
  mih: 34,
  // 导弹尾焰宽度
  mtw: 7.5,
  // 导弹尾焰高度
  mth: 15,
  // 导弹尾焰图片宽度
  mtiw: 10,
  // 导弹尾焰图片高度
  mtih: 20,
  // 导弹速度(像素/帧)
  mSpeed: 2
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
// 导弹尾焰动画
const tailFlameAnimationCof = [
  {
    sx: 0,
    sy: 0
  },
  {
    sx: 10,
    sy: 0
  }
]
// 敌机配置
const enemyAircraftCof = [
  {
    // 宽度
    w: 55,
    // 高度
    h: 48,
    // 图片宽度
    iw: 55,
    // 图片高度
    ih: 48,
    // 正常截取位置x
    sx: 0,
    // 正常截取位置y
    sy: 0,
    // 中弹截取位置x
    hsx: 55,
    // 中弹截取位置y
    hsy: 0,
    // 阴影截取位置x
    ssx: 110,
    // 阴影截取位置y
    ssy: 0
  },
  {
    // 宽度
    w: 50,
    // 高度
    h: 44,
    // 图片宽度
    iw: 50,
    // 图片高度
    ih: 44,
    // 正常截取位置x
    sx: 0,
    // 正常截取位置y
    sy: 0,
    // 中弹截取位置x
    hsx: 50,
    // 中弹截取位置y
    hsy: 0,
    // 阴影截取位置x
    ssx: 100,
    // 阴影截取位置y
    ssy: 0
  }
]
// 游戏进程配置
const processCof = [
  [
    // 敌机1，10架
    {
      // 名称
      name: 'aircraft1',
      // 间隔时间
      interval: 3000,
      // 图片
      imgName: 'aircraft1',
      // 数量
      quantity: 10,
      // 起始位置x
      x: 100,
      // 起始位置y
      y: -100,
      // 移动方式
      mobileMode: 'down',
      // 生命值
      hp: 10,
      // 子弹
      // bulletName: 'bullet3'
    }
  ]
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
  'bullet2': '/src/assets/img/bullet2.webp',
  'missile1': '/src/assets/img/missile1.webp',
  'missile2': '/src/assets/img/missile2.webp',
  'tailFlame': '/src/assets/img/tailFlame.webp',
  'aircraft1': '/src/assets/img/aircraft1.webp',
}
export {
  isOffscreenCanvas,
  fpsCof,
  playerCof,
  playerPropellerAttitudeCof,
  playerAttitudeCof,
  destroyCof,
  destroyAnimationCof,
  tailFlameAnimationCof,
  enemyAircraftCof,
  processCof,
  imgs
}

