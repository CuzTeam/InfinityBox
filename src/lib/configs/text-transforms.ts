import type { TransformMode } from "@/components/tools/engines/text-transform"

const words = (text: string) => text.split(/(\s+)/)

export const caseModes: TransformMode[] = [
  { key: "upper", label: "全部大写", fn: (t) => t.toUpperCase() },
  { key: "lower", label: "全部小写", fn: (t) => t.toLowerCase() },
  {
    key: "capitalize",
    label: "单词首字母大写",
    fn: (t) => t.replace(/\b\w/g, (c) => c.toUpperCase()),
  },
  {
    key: "camel",
    label: "camelCase 驼峰",
    fn: (t) =>
      t
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase()),
  },
  {
    key: "pascal",
    label: "PascalCase",
    fn: (t) =>
      t
        .toLowerCase()
        .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, c: string) => c.toUpperCase()),
  },
  {
    key: "snake",
    label: "snake_case",
    fn: (t) => t.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_"),
  },
  {
    key: "kebab",
    label: "kebab-case",
    fn: (t) => t.trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-"),
  },
  {
    key: "constant",
    label: "CONSTANT_CASE",
    fn: (t) => t.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
  },
]

const smallWords = new Set([
  "a", "an", "the", "and", "or", "but", "of", "in", "on", "at", "to",
  "for", "with", "by", "from", "as", "is", "are", "was", "were",
])

export const titleCaseModes: TransformMode[] = [
  {
    key: "title",
    label: "标题格式（虚词不大写）",
    fn: (t) =>
      words(t.toLowerCase())
        .map((word, i) => {
          if (/^\s+$/.test(word)) return word
          if (i !== 0 && smallWords.has(word)) return word
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(""),
  },
  {
    key: "all",
    label: "每个单词首字母大写",
    fn: (t) => t.replace(/\b\w/g, (c) => c.toUpperCase()),
  },
]

export const sentenceCaseModes: TransformMode[] = [
  {
    key: "sentence",
    label: "句首字母大写",
    fn: (t) =>
      t
        .toLowerCase()
        .replace(/(^\s*\w|[.!?。！？]\s*\w)/g, (c) => c.toUpperCase()),
  },
]

function offsetChars(upperStart: number, lowerStart: number, digitStart?: number) {
  return (t: string) =>
    Array.from(t)
      .map((c) => {
        const code = c.codePointAt(0)!
        if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + code - 65)
        if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + code - 97)
        if (digitStart !== undefined && code >= 48 && code <= 57)
          return String.fromCodePoint(digitStart + code - 48)
        return c
      })
      .join("")
}

export const boldModes: TransformMode[] = [
  { key: "bold", label: "粗体 𝐀𝐁𝐂", fn: offsetChars(0x1d400, 0x1d41a, 0x1d7ce) },
  { key: "bold-sans", label: "无衬线粗体 𝗔𝗕𝗖", fn: offsetChars(0x1d5a0, 0x1d5ba, 0x1d7ec) },
]

export const italicModes: TransformMode[] = [
  {
    key: "italic",
    label: "斜体 𝐴𝐵𝐶",
    fn: (t) =>
      offsetChars(0x1d434, 0x1d44e)(t).replace(/\ud835\udc22/g, "ℎ"),
  },
]

export const strikethroughModes: TransformMode[] = [
  { key: "strike", label: "删除线", fn: (t) => t.replace(/./g, "$&̶") },
]

export const underlineModes: TransformMode[] = [
  { key: "underline", label: "下划线", fn: (t) => t.replace(/./g, "$&̲") },
]

const upsideDownMap: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
  i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
  q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
  y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H",
  I: "I", J: "ſ", K: "⋊", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
  Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X",
  Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ",
  "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  ".": "˙", ",": "'", "'": ",", "?": "¿", "!": "¡",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{",
  "<": ">", ">": "<", "&": "⅋", "_": "‾",
}

export const upsideDownModes: TransformMode[] = [
  {
    key: "flip",
    label: "颠倒文本",
    fn: (t) => Array.from(t).reverse().map((c) => upsideDownMap[c] ?? c).join(""),
  },
]

const mirrorMap: Record<string, string> = {
  b: "d", d: "b", p: "q", q: "p",
  B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", G: "Ә", K: "ʞ", L: "⅃", N: "И",
  P: "ꟼ", Q: "Ọ", R: "Я", S: "Ƨ", T: "T", Z: "Ƹ",
  "1": "1", "3": "Ɛ", "8": "8", "0": "0",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<",
}

export const mirrorModes: TransformMode[] = [
  {
    key: "mirror",
    label: "镜像文本",
    fn: (t) => Array.from(t).reverse().map((c) => mirrorMap[c] ?? c).join(""),
  },
]

export const reverseModes: TransformMode[] = [
  { key: "reverse", label: "反向（倒序）", fn: (t) => Array.from(t).reverse().join("") },
]

export const symbolTextModes: TransformMode[] = [
  { key: "circled", label: "圆圈字 Ⓐ", fn: offsetChars(0x24b6, 0x24d0) },
  { key: "fullwidth", label: "全角 ＡＢＣ", fn: (t) => t.replace(/[!-~]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0)) },
  { key: "monospace", label: "等宽 𝙰", fn: offsetChars(0x1d670, 0x1d68a, 0x1d7f6) },
]
