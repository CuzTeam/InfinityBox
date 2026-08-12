import type { Shape } from "@/components/tools/engines/geometry-calculator"

export const perimeterShapes: Shape[] = [
  {
    key: "rectangle",
    name: "长方形",
    inputs: [
      { key: "a", label: "长" },
      { key: "b", label: "宽" },
    ],
    formula: "周长 = 2 × (长 + 宽)",
    compute: (v) => 2 * (v.a + v.b),
  },
  {
    key: "square",
    name: "正方形",
    inputs: [{ key: "a", label: "边长" }],
    formula: "周长 = 4 × 边长",
    compute: (v) => 4 * v.a,
  },
  {
    key: "circle",
    name: "圆形",
    inputs: [{ key: "r", label: "半径" }],
    formula: "周长 = 2πr",
    compute: (v) => 2 * Math.PI * v.r,
  },
  {
    key: "triangle",
    name: "三角形",
    inputs: [
      { key: "a", label: "边 a" },
      { key: "b", label: "边 b" },
      { key: "c", label: "边 c" },
    ],
    formula: "周长 = a + b + c",
    compute: (v) => v.a + v.b + v.c,
  },
  {
    key: "trapezoid",
    name: "梯形",
    inputs: [
      { key: "a", label: "上底" },
      { key: "b", label: "下底" },
      { key: "c", label: "腰 1" },
      { key: "d", label: "腰 2" },
    ],
    formula: "周长 = 上底 + 下底 + 两腰",
    compute: (v) => v.a + v.b + v.c + v.d,
  },
]

export const areaShapes: Shape[] = [
  {
    key: "rectangle",
    name: "长方形",
    inputs: [
      { key: "a", label: "长" },
      { key: "b", label: "宽" },
    ],
    formula: "面积 = 长 × 宽",
    compute: (v) => v.a * v.b,
  },
  {
    key: "square",
    name: "正方形",
    inputs: [{ key: "a", label: "边长" }],
    formula: "面积 = 边长²",
    compute: (v) => v.a ** 2,
  },
  {
    key: "circle",
    name: "圆形",
    inputs: [{ key: "r", label: "半径" }],
    formula: "面积 = πr²",
    compute: (v) => Math.PI * v.r ** 2,
  },
  {
    key: "triangle",
    name: "三角形",
    inputs: [
      { key: "a", label: "底" },
      { key: "h", label: "高" },
    ],
    formula: "面积 = 底 × 高 ÷ 2",
    compute: (v) => (v.a * v.h) / 2,
  },
  {
    key: "trapezoid",
    name: "梯形",
    inputs: [
      { key: "a", label: "上底" },
      { key: "b", label: "下底" },
      { key: "h", label: "高" },
    ],
    formula: "面积 = (上底 + 下底) × 高 ÷ 2",
    compute: (v) => ((v.a + v.b) * v.h) / 2,
  },
  {
    key: "parallelogram",
    name: "平行四边形",
    inputs: [
      { key: "a", label: "底" },
      { key: "h", label: "高" },
    ],
    formula: "面积 = 底 × 高",
    compute: (v) => v.a * v.h,
  },
]

export const surfaceAreaShapes: Shape[] = [
  {
    key: "cube",
    name: "正方体",
    inputs: [{ key: "a", label: "棱长" }],
    formula: "表面积 = 6a²",
    compute: (v) => 6 * v.a ** 2,
  },
  {
    key: "cuboid",
    name: "长方体",
    inputs: [
      { key: "a", label: "长" },
      { key: "b", label: "宽" },
      { key: "c", label: "高" },
    ],
    formula: "表面积 = 2(ab + ac + bc)",
    compute: (v) => 2 * (v.a * v.b + v.a * v.c + v.b * v.c),
  },
  {
    key: "cylinder",
    name: "圆柱体",
    inputs: [
      { key: "r", label: "底面半径" },
      { key: "h", label: "高" },
    ],
    formula: "表面积 = 2πr² + 2πrh",
    compute: (v) => 2 * Math.PI * v.r ** 2 + 2 * Math.PI * v.r * v.h,
  },
  {
    key: "sphere",
    name: "球体",
    inputs: [{ key: "r", label: "半径" }],
    formula: "表面积 = 4πr²",
    compute: (v) => 4 * Math.PI * v.r ** 2,
  },
  {
    key: "cone",
    name: "圆锥体",
    inputs: [
      { key: "r", label: "底面半径" },
      { key: "l", label: "母线长" },
    ],
    formula: "表面积 = πr² + πrl",
    compute: (v) => Math.PI * v.r ** 2 + Math.PI * v.r * v.l,
  },
]

export const volumeShapes: Shape[] = [
  {
    key: "cube",
    name: "正方体",
    inputs: [{ key: "a", label: "棱长" }],
    formula: "体积 = a³",
    compute: (v) => v.a ** 3,
  },
  {
    key: "cuboid",
    name: "长方体",
    inputs: [
      { key: "a", label: "长" },
      { key: "b", label: "宽" },
      { key: "c", label: "高" },
    ],
    formula: "体积 = 长 × 宽 × 高",
    compute: (v) => v.a * v.b * v.c,
  },
  {
    key: "cylinder",
    name: "圆柱体",
    inputs: [
      { key: "r", label: "底面半径" },
      { key: "h", label: "高" },
    ],
    formula: "体积 = πr²h",
    compute: (v) => Math.PI * v.r ** 2 * v.h,
  },
  {
    key: "sphere",
    name: "球体",
    inputs: [{ key: "r", label: "半径" }],
    formula: "体积 = 4/3 × πr³",
    compute: (v) => (4 / 3) * Math.PI * v.r ** 3,
  },
  {
    key: "cone",
    name: "圆锥体",
    inputs: [
      { key: "r", label: "底面半径" },
      { key: "h", label: "高" },
    ],
    formula: "体积 = 1/3 × πr²h",
    compute: (v) => (Math.PI * v.r ** 2 * v.h) / 3,
  },
]
