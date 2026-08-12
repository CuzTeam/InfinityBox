"use client"

import { ResultLine, SimpleCalc } from "@/components/tools/engines/simple-calc"

function hashText(text: string) {
  let hash = 5381
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i)
  }
  return Math.abs(hash)
}

export function LuckyNumber() {
  return (
    <SimpleCalc
      fields={[
        { key: "name", label: "姓名", kind: "text", placeholder: "张三" },
        { key: "birthday", label: "生日", kind: "date" },
      ]}
      compute={(v) => {
        const hash = hashText(v.name + v.birthday)
        const lucky = (hash % 99) + 1
        const alt = ((hash >> 8) % 99) + 1
        return (
          <div>
            <ResultLine label="今日幸运数字" value={String(lucky)} />
            <ResultLine label="备选数字" value={String(alt)} />
            <p className="mt-2 text-xs text-muted-foreground">
              基于姓名和生日的确定性计算，仅供娱乐
            </p>
          </div>
        )
      }}
    />
  )
}

const zodiacColors: Record<string, { color: string; hex: string; meaning: string }> = {
  aries: { color: "红色", hex: "#ef4444", meaning: "热情、行动力" },
  taurus: { color: "绿色", hex: "#22c55e", meaning: "稳定、财富" },
  gemini: { color: "黄色", hex: "#eab308", meaning: "智慧、沟通" },
  cancer: { color: "银色", hex: "#cbd5e1", meaning: "温柔、守护" },
  leo: { color: "金色", hex: "#f59e0b", meaning: "自信、荣耀" },
  virgo: { color: "米白", hex: "#f5f5dc", meaning: "纯净、细致" },
  libra: { color: "粉色", hex: "#ec4899", meaning: "和谐、美感" },
  scorpio: { color: "深红", hex: "#991b1b", meaning: "深邃、意志" },
  sagittarius: { color: "紫色", hex: "#a855f7", meaning: "自由、探索" },
  capricorn: { color: "棕色", hex: "#92400e", meaning: "务实、坚韧" },
  aquarius: { color: "天蓝", hex: "#0ea5e9", meaning: "创新、独立" },
  pisces: { color: "海绿", hex: "#14b8a6", meaning: "浪漫、直觉" },
}

export function LuckyColor() {
  return (
    <SimpleCalc
      fields={[
        {
          key: "zodiac",
          label: "星座",
          kind: "select",
          options: [
            { value: "aries", label: "白羊座 (3.21-4.19)" },
            { value: "taurus", label: "金牛座 (4.20-5.20)" },
            { value: "gemini", label: "双子座 (5.21-6.21)" },
            { value: "cancer", label: "巨蟹座 (6.22-7.22)" },
            { value: "leo", label: "狮子座 (7.23-8.22)" },
            { value: "virgo", label: "处女座 (8.23-9.22)" },
            { value: "libra", label: "天秤座 (9.23-10.23)" },
            { value: "scorpio", label: "天蝎座 (10.24-11.22)" },
            { value: "sagittarius", label: "射手座 (11.23-12.21)" },
            { value: "capricorn", label: "摩羯座 (12.22-1.19)" },
            { value: "aquarius", label: "水瓶座 (1.20-2.18)" },
            { value: "pisces", label: "双鱼座 (2.19-3.20)" },
          ],
          defaultValue: "aries",
        },
      ]}
      compute={(v) => {
        const item = zodiacColors[v.zodiac]
        return (
          <div className="flex items-center gap-4">
            <div
              className="size-16 rounded-xl border"
              style={{ backgroundColor: item.hex }}
            />
            <div className="flex-1">
              <ResultLine label="幸运色" value={item.color} mono={false} />
              <ResultLine label="色值" value={item.hex} />
              <ResultLine label="寓意" value={item.meaning} mono={false} />
            </div>
          </div>
        )
      }}
    />
  )
}

export function WorthCalculator() {
  return (
    <SimpleCalc
      fields={[
        { key: "height", label: "身高 (cm)", kind: "number", placeholder: "175" },
        { key: "age", label: "年龄（岁）", kind: "number", placeholder: "25" },
        { key: "income", label: "月收入（元）", kind: "number", placeholder: "10000" },
      ]}
      compute={(v) => {
        const h = Number(v.height)
        const age = Number(v.age)
        const income = Number(v.income)
        const heightScore = Math.max(0, h - 150) * 2000
        const ageScore = Math.max(0, 40 - Math.abs(age - 25)) * 1500
        const incomeScore = income * 36
        const worth = Math.round((heightScore + ageScore + incomeScore) / 100) * 100
        return (
          <div>
            <ResultLine label="你的身价" value={`¥ ${worth.toLocaleString("zh-CN")}`} />
            <p className="mt-2 text-xs text-muted-foreground">
              纯娱乐算法，切勿当真
            </p>
          </div>
        )
      }}
    />
  )
}

export function DeathTime() {
  return (
    <SimpleCalc
      fields={[
        { key: "birthday", label: "出生日期", kind: "date" },
        {
          key: "gender",
          label: "性别",
          kind: "select",
          options: [
            { value: "male", label: "男（预期 76 岁）" },
            { value: "female", label: "女（预期 81 岁）" },
          ],
          defaultValue: "male",
        },
        {
          key: "habit",
          label: "生活习惯",
          kind: "select",
          options: [
            { value: "5", label: "健康规律（+5 年）" },
            { value: "0", label: "一般（±0 年）" },
            { value: "-5", label: "经常熬夜/吸烟（-5 年）" },
            { value: "-10", label: "长期吸烟酗酒（-10 年）" },
          ],
          defaultValue: "0",
        },
      ]}
      compute={(v) => {
        const birth = new Date(v.birthday)
        if (Number.isNaN(birth.getTime()))
          return <p className="text-sm text-destructive">请输入合理日期</p>
        const expectancy = (v.gender === "male" ? 76 : 81) + Number(v.habit)
        const end = new Date(birth)
        end.setFullYear(end.getFullYear() + expectancy)
        const now = new Date()
        const total = end.getTime() - birth.getTime()
        const passed = now.getTime() - birth.getTime()
        const percent = Math.min(100, Math.max(0, (passed / total) * 100))
        const daysLeft = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 86400000))
        return (
          <div>
            <ResultLine label="预计寿命" value={`${expectancy} 岁`} />
            <ResultLine label="预计终点日期" value={`${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`} />
            <ResultLine label="剩余天数" value={`${daysLeft.toLocaleString("zh-CN")} 天`} />
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>人生进度</span>
                <span>{percent.toFixed(1)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-foreground transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              仅供娱乐，珍惜当下
            </p>
          </div>
        )
      }}
    />
  )
}
