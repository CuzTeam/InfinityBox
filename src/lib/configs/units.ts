export type UnitDef = {
  key: string
  name: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

export function unit(key: string, name: string, factor: number): UnitDef {
  return {
    key,
    name,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
  }
}

export type UnitConfig = {
  units: UnitDef[]
  defaultFrom: string
  defaultTo: string
  baseName: string
}

export const lengthConfig: UnitConfig = {
  baseName: "米 (m)",
  defaultFrom: "m",
  defaultTo: "ft",
  units: [
    unit("mm", "毫米 (mm)", 0.001),
    unit("cm", "厘米 (cm)", 0.01),
    unit("dm", "分米 (dm)", 0.1),
    unit("m", "米 (m)", 1),
    unit("km", "千米 (km)", 1000),
    unit("cun", "寸", 1 / 30),
    unit("chi", "尺", 1 / 3),
    unit("zhang", "丈", 10 / 3),
    unit("li", "里", 500),
    unit("in", "英寸 (in)", 0.0254),
    unit("ft", "英尺 (ft)", 0.3048),
    unit("yd", "码 (yd)", 0.9144),
    unit("mi", "英里 (mi)", 1609.344),
    unit("nmi", "海里 (nmi)", 1852),
  ],
}

export const areaConfig: UnitConfig = {
  baseName: "平方米 (m²)",
  defaultFrom: "m2",
  defaultTo: "mu",
  units: [
    unit("cm2", "平方厘米 (cm²)", 1e-4),
    unit("m2", "平方米 (m²)", 1),
    unit("ha", "公顷 (ha)", 10000),
    unit("km2", "平方千米 (km²)", 1e6),
    unit("mu", "亩", 2000 / 3),
    unit("ft2", "平方英尺 (ft²)", 0.09290304),
    unit("acre", "英亩 (acre)", 4046.8564224),
  ],
}

export const volumeConfig: UnitConfig = {
  baseName: "升 (L)",
  defaultFrom: "l",
  defaultTo: "gal",
  units: [
    unit("ml", "毫升 (mL)", 0.001),
    unit("l", "升 (L)", 1),
    unit("cm3", "立方厘米 (cm³)", 0.001),
    unit("m3", "立方米 (m³)", 1000),
    unit("gal", "加仑·美 (gal)", 3.785411784),
    unit("qt", "夸脱·美 (qt)", 0.946352946),
    unit("pt", "品脱·美 (pt)", 0.473176473),
    unit("ft3", "立方英尺 (ft³)", 28.31684659),
  ],
}

export const weightConfig: UnitConfig = {
  baseName: "千克 (kg)",
  defaultFrom: "kg",
  defaultTo: "jin",
  units: [
    unit("mg", "毫克 (mg)", 1e-6),
    unit("g", "克 (g)", 0.001),
    unit("kg", "千克 (kg)", 1),
    unit("t", "吨 (t)", 1000),
    unit("liang", "两", 0.05),
    unit("jin", "斤", 0.5),
    unit("oz", "盎司 (oz)", 0.0283495231),
    unit("lb", "磅 (lb)", 0.45359237),
  ],
}

export const temperatureConfig: UnitConfig = {
  baseName: "摄氏度 (°C)",
  defaultFrom: "c",
  defaultTo: "f",
  units: [
    { key: "c", name: "摄氏度 (°C)", toBase: (v) => v, fromBase: (v) => v },
    {
      key: "f",
      name: "华氏度 (°F)",
      toBase: (v) => (v - 32) / 1.8,
      fromBase: (v) => v * 1.8 + 32,
    },
    {
      key: "k",
      name: "开尔文 (K)",
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15,
    },
  ],
}

export const energyConfig: UnitConfig = {
  baseName: "焦耳 (J)",
  defaultFrom: "kcal",
  defaultTo: "kj",
  units: [
    unit("j", "焦耳 (J)", 1),
    unit("kj", "千焦 (kJ)", 1000),
    unit("cal", "卡路里 (cal)", 4.184),
    unit("kcal", "大卡/千卡 (kcal)", 4184),
    unit("kwh", "千瓦时 (kWh)", 3.6e6),
  ],
}
