"use client"

import { ResultLine, SimpleCalc } from "@/components/tools/engines/simple-calc"

const num = (v: string) => Number(v)
const fmt = (v: number, digits = 1) =>
  Number(v.toFixed(digits)).toLocaleString("zh-CN")

export function BmrCalculator() {
  return (
    <SimpleCalc
      fields={[
        {
          key: "gender",
          label: "性别",
          kind: "select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
          defaultValue: "male",
        },
        { key: "age", label: "年龄（岁）", kind: "number", placeholder: "25" },
        { key: "height", label: "身高 (cm)", kind: "number", placeholder: "170" },
        { key: "weight", label: "体重 (kg)", kind: "number", placeholder: "65" },
      ]}
      compute={(v) => {
        const base = 10 * num(v.weight) + 6.25 * num(v.height) - 5 * num(v.age)
        const bmr = v.gender === "male" ? base + 5 : base - 161
        return (
          <div>
            <ResultLine label="基础代谢率 (Mifflin-St Jeor)" value={`${fmt(bmr, 0)} kcal/天`} />
            <ResultLine label="轻度活动 (×1.375)" value={`${fmt(bmr * 1.375, 0)} kcal/天`} />
            <ResultLine label="中度活动 (×1.55)" value={`${fmt(bmr * 1.55, 0)} kcal/天`} />
            <ResultLine label="高强度活动 (×1.725)" value={`${fmt(bmr * 1.725, 0)} kcal/天`} />
          </div>
        )
      }}
    />
  )
}

export function BfrCalculator() {
  return (
    <SimpleCalc
      fields={[
        {
          key: "gender",
          label: "性别",
          kind: "select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
          defaultValue: "male",
        },
        { key: "age", label: "年龄（岁）", kind: "number", placeholder: "25" },
        { key: "height", label: "身高 (cm)", kind: "number", placeholder: "170" },
        { key: "weight", label: "体重 (kg)", kind: "number", placeholder: "65" },
      ]}
      compute={(v) => {
        const bmi = num(v.weight) / (num(v.height) / 100) ** 2
        const bfr =
          1.2 * bmi + 0.23 * num(v.age) - 10.8 * (v.gender === "male" ? 1 : 0) - 5.4
        const range = v.gender === "male" ? "10% ~ 20%" : "18% ~ 28%"
        return (
          <div>
            <ResultLine label="BMI" value={fmt(bmi)} />
            <ResultLine label="体脂率（BMI 估算法）" value={`${fmt(bfr)}%`} />
            <ResultLine label={`${v.gender === "male" ? "男性" : "女性"}正常参考`} value={range} mono={false} />
          </div>
        )
      }}
    />
  )
}

export function StandardWeight() {
  return (
    <SimpleCalc
      fields={[
        {
          key: "gender",
          label: "性别",
          kind: "select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
          defaultValue: "male",
        },
        { key: "height", label: "身高 (cm)", kind: "number", placeholder: "170" },
      ]}
      compute={(v) => {
        const h = num(v.height)
        const weight = v.gender === "male" ? (h - 80) * 0.7 : (h - 70) * 0.6
        return (
          <div>
            <ResultLine label="标准体重 (Broca)" value={`${fmt(weight)} kg`} />
            <ResultLine label="正常范围 (±10%)" value={`${fmt(weight * 0.9)} ~ ${fmt(weight * 1.1)} kg`} />
          </div>
        )
      }}
    />
  )
}

export function BurnFatHeartRate() {
  return (
    <SimpleCalc
      fields={[{ key: "age", label: "年龄（岁）", kind: "number", placeholder: "30" }]}
      compute={(v) => {
        const max = 220 - num(v.age)
        return (
          <div>
            <ResultLine label="最大心率 (220 − 年龄)" value={`${max} 次/分`} />
            <ResultLine label="燃脂心率区间 (60% ~ 80%)" value={`${fmt(max * 0.6, 0)} ~ ${fmt(max * 0.8, 0)} 次/分`} />
            <ResultLine label="热身区间 (50% ~ 60%)" value={`${fmt(max * 0.5, 0)} ~ ${fmt(max * 0.6, 0)} 次/分`} />
          </div>
        )
      }}
    />
  )
}

export function ProteinIntake() {
  return (
    <SimpleCalc
      fields={[
        { key: "weight", label: "体重 (kg)", kind: "number", placeholder: "65" },
        {
          key: "activity",
          label: "活动强度",
          kind: "select",
          options: [
            { value: "0.8", label: "久坐（0.8 g/kg）" },
            { value: "1.0", label: "轻度活动（1.0 g/kg）" },
            { value: "1.2", label: "中度运动（1.2 g/kg）" },
            { value: "1.6", label: "力量训练（1.6 g/kg）" },
            { value: "2.0", label: "专业运动员（2.0 g/kg）" },
          ],
          defaultValue: "1.0",
        },
      ]}
      compute={(v) => {
        const intake = num(v.weight) * num(v.activity)
        return (
          <div>
            <ResultLine label="每日蛋白质摄入量" value={`${fmt(intake, 0)} g`} />
            <ResultLine label="约相当于鸡蛋（6g/个）" value={`${fmt(intake / 6, 0)} 个`} />
            <ResultLine label="约相当于鸡胸肉（20g/100g）" value={`${fmt(intake * 5, 0)} g`} />
          </div>
        )
      }}
    />
  )
}

export function RunningCalorie() {
  return (
    <SimpleCalc
      fields={[
        { key: "weight", label: "体重 (kg)", kind: "number", placeholder: "65" },
        { key: "distance", label: "跑步距离 (km)", kind: "number", placeholder: "5" },
      ]}
      compute={(v) => {
        const kcal = num(v.weight) * num(v.distance) * 1.036
        return (
          <div>
            <ResultLine label="消耗热量" value={`${fmt(kcal, 0)} kcal`} />
            <ResultLine label="约相当于米饭（116 kcal/100g）" value={`${fmt(kcal / 1.16, 0)} g`} />
          </div>
        )
      }}
    />
  )
}

export function BestFigure() {
  return (
    <SimpleCalc
      fields={[{ key: "height", label: "身高 (cm)", kind: "number", placeholder: "165" }]}
      compute={(v) => {
        const h = num(v.height)
        return (
          <div>
            <ResultLine label="胸围" value={`${fmt(h * 0.51)} cm`} />
            <ResultLine label="腰围" value={`${fmt(h * 0.37)} cm`} />
            <ResultLine label="臀围" value={`${fmt(h * 0.542)} cm`} />
            <ResultLine label="大腿围" value={`${fmt(h * 0.3)} cm`} />
            <ResultLine label="小腿围" value={`${fmt(h * 0.21)} cm`} />
            <ResultLine label="标准体重" value={`${fmt((h - 100) * 0.9)} kg`} />
          </div>
        )
      }}
    />
  )
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

const fmtDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

export function SafePeriod() {
  return (
    <SimpleCalc
      fields={[
        { key: "lastPeriod", label: "末次月经开始日期", kind: "date" },
        { key: "cycle", label: "月经周期（天）", kind: "number", placeholder: "28" },
      ]}
      compute={(v) => {
        const last = new Date(v.lastPeriod)
        const cycle = num(v.cycle)
        if (Number.isNaN(last.getTime()) || cycle < 20 || cycle > 45)
          return <p className="text-sm text-destructive">请输入合理日期和周期 (20-45 天)</p>
        const next = addDays(last, cycle)
        const ovulation = addDays(next, -14)
        const fertileStart = addDays(ovulation, -5)
        const fertileEnd = addDays(ovulation, 4)
        return (
          <div>
            <ResultLine label="预计下次月经" value={fmtDate(next)} />
            <ResultLine label="排卵日" value={fmtDate(ovulation)} />
            <ResultLine label="易孕期（排卵日前5后4）" value={`${fmtDate(fertileStart)} ~ ${fmtDate(fertileEnd)}`} />
            <p className="mt-2 text-xs text-muted-foreground">
              其余时间为相对安全期。安全期避孕不可靠，仅供参考。
            </p>
          </div>
        )
      }}
    />
  )
}

export function ChildHeight() {
  return (
    <SimpleCalc
      fields={[
        {
          key: "gender",
          label: "孩子性别",
          kind: "select",
          options: [
            { value: "male", label: "男" },
            { value: "female", label: "女" },
          ],
          defaultValue: "male",
        },
        { key: "father", label: "父亲身高 (cm)", kind: "number", placeholder: "175" },
        { key: "mother", label: "母亲身高 (cm)", kind: "number", placeholder: "162" },
      ]}
      compute={(v) => {
        const f = num(v.father)
        const m = num(v.mother)
        const target = v.gender === "male" ? (f + m + 13) / 2 : (f + m - 13) / 2
        return (
          <div>
            <ResultLine label="遗传靶身高" value={`${fmt(target)} cm`} />
            <ResultLine label="波动范围 (±5cm)" value={`${fmt(target - 5)} ~ ${fmt(target + 5)} cm`} />
          </div>
        )
      }}
    />
  )
}

export function AgeCalculator() {
  return (
    <SimpleCalc
      fields={[{ key: "birthday", label: "出生日期", kind: "date" }]}
      compute={(v) => {
        const birth = new Date(v.birthday)
        if (Number.isNaN(birth.getTime()) || birth > new Date())
          return <p className="text-sm text-destructive">请输入合理的出生日期</p>
        const now = new Date()
        let years = now.getFullYear() - birth.getFullYear()
        let months = now.getMonth() - birth.getMonth()
        let days = now.getDate() - birth.getDate()
        if (days < 0) {
          months -= 1
          days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
        }
        if (months < 0) {
          years -= 1
          months += 12
        }
        const totalDays = Math.floor((now.getTime() - birth.getTime()) / 86400000)
        const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
        if (nextBirthday <= now) nextBirthday.setFullYear(now.getFullYear() + 1)
        const countdown = Math.ceil((nextBirthday.getTime() - now.getTime()) / 86400000)
        return (
          <div>
            <ResultLine label="周岁" value={`${years} 岁 ${months} 个月 ${days} 天`} />
            <ResultLine label="已出生天数" value={`${fmt(totalDays, 0)} 天`} />
            <ResultLine label="距离下次生日" value={`${countdown} 天`} />
          </div>
        )
      }}
    />
  )
}

export function LoanCalculator() {
  return (
    <SimpleCalc
      fields={[
        { key: "principal", label: "贷款金额（元）", kind: "number", placeholder: "1000000" },
        { key: "rate", label: "年利率 (%)", kind: "number", placeholder: "3.6" },
        { key: "months", label: "期限（月）", kind: "number", placeholder: "360" },
      ]}
      compute={(v) => {
        const p = num(v.principal)
        const r = num(v.rate) / 100 / 12
        const n = num(v.months)
        if (p <= 0 || n <= 0 || r < 0)
          return <p className="text-sm text-destructive">请输入合理参数</p>
        const monthly =
          r === 0 ? p / n : (p * r * (1 + r) ** n) / ((1 + r) ** n - 1)
        const totalInterest1 = monthly * n - p
        const totalInterest2 =
          n * (p / n) * 0 + ((n + 1) * p * r) / 2
        const firstMonth = p / n + p * r
        const decrease = (p / n) * r
        return (
          <div>
            <p className="mb-2 text-sm font-medium">等额本息</p>
            <ResultLine label="月供（固定）" value={`${fmt(monthly, 2)} 元`} />
            <ResultLine label="总利息" value={`${fmt(totalInterest1, 0)} 元`} />
            <p className="mt-3 mb-2 text-sm font-medium">等额本金</p>
            <ResultLine label="首月还款" value={`${fmt(firstMonth, 2)} 元`} />
            <ResultLine label="每月递减" value={`${fmt(decrease, 2)} 元`} />
            <ResultLine label="总利息" value={`${fmt(totalInterest2, 0)} 元`} />
          </div>
        )
      }}
    />
  )
}

export function RetirementTime() {
  return (
    <SimpleCalc
      fields={[
        { key: "birthday", label: "出生日期", kind: "date" },
        {
          key: "type",
          label: "职工类型",
          kind: "select",
          options: [
            { value: "male", label: "男职工（原 60 岁退休）" },
            { value: "female55", label: "女职工（原 55 岁退休）" },
            { value: "female50", label: "女职工（原 50 岁退休）" },
          ],
          defaultValue: "male",
        },
      ]}
      compute={(v) => {
        const birth = new Date(v.birthday)
        if (Number.isNaN(birth.getTime()))
          return <p className="text-sm text-destructive">请输入合理日期</p>
        const birthMonthIndex = birth.getFullYear() * 12 + birth.getMonth()
        let baseAge: number, startIndex: number, step: number, maxDelay: number
        if (v.type === "male") {
          baseAge = 60; startIndex = 1965 * 12; step = 4; maxDelay = 36
        } else if (v.type === "female55") {
          baseAge = 55; startIndex = 1970 * 12; step = 4; maxDelay = 36
        } else {
          baseAge = 50; startIndex = 1975 * 12; step = 2; maxDelay = 60
        }
        const since = birthMonthIndex - startIndex
        const delay =
          since < 0 ? 0 : Math.min(Math.floor(since / step) + 1, maxDelay)
        const retireAgeMonths = baseAge * 12 + delay
        const retire = new Date(birth)
        retire.setMonth(retire.getMonth() + retireAgeMonths)
        return (
          <div>
            <ResultLine label="法定退休年龄（渐进式延迟）" value={`${Math.floor(retireAgeMonths / 12)} 岁 ${retireAgeMonths % 12} 个月`} />
            <ResultLine label="预计退休时间" value={fmtDate(retire)} />
            <p className="mt-2 text-xs text-muted-foreground">
              按 2025 年起施行的渐进式延迟法定退休年龄办法估算，具体以政策执行为准。
            </p>
          </div>
        )
      }}
    />
  )
}

export function ProportionCalculator() {
  return (
    <SimpleCalc
      fields={[
        { key: "a", label: "a", kind: "number", placeholder: "1" },
        { key: "b", label: "b", kind: "number", placeholder: "2" },
        { key: "c", label: "c", kind: "number", placeholder: "3" },
      ]}
      compute={(v) => {
        const a = num(v.a)
        if (a === 0)
          return <p className="text-sm text-destructive">a 不能为 0</p>
        const d = (num(v.b) * num(v.c)) / a
        return (
          <div>
            <p className="mb-1 text-sm text-muted-foreground">a : b = c : d</p>
            <ResultLine label={`${v.a} : ${v.b} = ${v.c} : d`} value={`d = ${Number(d.toPrecision(10))}`} />
          </div>
        )
      }}
    />
  )
}
