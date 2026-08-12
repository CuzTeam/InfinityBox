<div align="center">

# 📦 InfinityBox

**开源的在线工具集合 —— 纯前端、无后端、开箱即用**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue)](LICENSE)

[在线预览](https://cuzteam.github.io/InfinityBox) · [提交工具需求](https://github.com/CuzTeam/InfinityBox/issues) · [参与贡献](#-参与贡献)

</div>

---

## ✨ 特性

- **80+ 实用工具**：健康、图片、文本、颜色、开发、数学、随机、娱乐 8 大分类
- **纯静态导出**：`output: "export"`，无服务器，可部署到任何静态托管（GitHub Pages / Cloudflare Pages / Vercel）
- **隐私安全**：所有计算均在浏览器本地完成，数据不出设备
- **明暗主题**：基于 `next-themes` 的主题切换
- **参考 ToolOnline 交互**：输入 → 点击按钮 → 出结果，无自动计算的干扰

## 🧰 工具一览

| 分类 | 部分工具 |
| --- | --- |
| 💪 健康 | BMI、BMR、体脂率、标准体重、燃脂心率、贷款计算、退休查询 |
| 🖼️ 图片 | 二维码、条形码、图片转 Base64、哈希头像 |
| 📝 文本 | 大小写转换、文本替换、文本对比、颜文字/符号大全 |
| 🎨 颜色 | 颜色转换、配色工具 |
| 👨‍💻 开发 | Base64、URL/Unicode 编解码、MD5/SHA/HMAC、AES/DES/RC4 加密、时间戳、进制转换、代码格式化 |
| 🔢 数学 | 单位换算、几何计算、比例计算、圆周率查询 |
| 🎲 随机 | 随机数、随机密码、序列号生成 |
| 🎉 娱乐 | 摩斯密码、抽奖、幸运数字/幸运色、身价计算 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态站点（输出到 out/）
npm run build
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

## 🛠️ 技术栈

- **框架**：[Next.js 16](https://nextjs.org)（App Router + 静态导出）
- **UI**：[shadcn/ui](https://ui.shadcn.com)（Base UI）+ [Tailwind CSS 4](https://tailwindcss.com)
- **图标**：[Lucide](https://lucide.dev)
- **加密/哈希**：[crypto-js](https://github.com/brix/crypto-js)

## 📂 项目结构

```
src/
├── app/                    # 路由（/ + /[category]/[tool]）
├── components/
│   ├── tools/              # 工具实现 + 共享引擎 engines/
│   └── ui/                 # shadcn/ui 组件
└── lib/
    ├── tools.ts            # 工具分类与注册表
    └── configs/            # 单位等静态配置
```

添加新工具只需两步：

1. 在 `src/lib/tools/` 对应分类中注册（slug、名称、描述）
2. 在 `src/components/tools/` 实现组件（复用 `engines/` 中的通用引擎）

## 👀 参考网站

- [JustHTML](https://github.com/sxxyrry/JustHTML)
- [ToolOnline(闭源)](https://toolonline.net/)

## 🤝 参与贡献

欢迎提交 Issue 和 PR！无论是新工具、交互优化还是 Bug 修复都非常感谢。

## 📄 License

[AGPL-3.0](LICENSE) © CuzTeam
