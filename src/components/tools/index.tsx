"use client"

import type { ComponentType } from "react"

import { Base64Converter } from "@/components/tools/base64-converter"
import { BarCodeGenerator } from "@/components/tools/bar-code"
import { BaseConverter } from "@/components/tools/base-converter"
import { BloodType } from "@/components/tools/blood-type"
import { BmiCalculator } from "@/components/tools/bmi-calculator"
import {
  AgeCalculator,
  BestFigure,
  BfrCalculator,
  BmrCalculator,
  BurnFatHeartRate,
  ChildHeight,
  LoanCalculator,
  ProteinIntake,
  ProportionCalculator,
  RetirementTime,
  RunningCalorie,
  SafePeriod,
  StandardWeight,
} from "@/components/tools/calculators"
import { CompareText } from "@/components/tools/compare-text"
import { CipherTool } from "@/components/tools/engines/cipher-tool"
import { CodeFormatter } from "@/components/tools/engines/code-formatter"
import { DataTable } from "@/components/tools/engines/data-table"
import { GeometryCalculator } from "@/components/tools/engines/geometry-calculator"
import { HashTool, HmacTool } from "@/components/tools/engines/hash-tool"
import { SymbolPicker } from "@/components/tools/engines/symbol-picker"
import { TextTransform } from "@/components/tools/engines/text-transform"
import { UnitConverter } from "@/components/tools/engines/unit-converter"
import {
  AsciiConverter,
  UnicodeCodec,
  UrlCodec,
} from "@/components/tools/encoders"
import {
  DeathTime,
  LuckyColor,
  LuckyNumber,
  WorthCalculator,
} from "@/components/tools/entertainment"
import { FlagGallery } from "@/components/tools/flag-gallery"
import {
  RandomNumberGenerator,
  SerialNumberGenerator,
} from "@/components/tools/generators"
import { HashAvatar } from "@/components/tools/hash-avatar"
import { ImageToBase64 } from "@/components/tools/image-to-base64"
import { Lottery } from "@/components/tools/lottery"
import { MorseCodeTranslator } from "@/components/tools/morse-code"
import { PiQuery } from "@/components/tools/pi-query"
import { QrCodeGenerator } from "@/components/tools/qr-code"
import { RandomPasswordGenerator } from "@/components/tools/random-password"
import { ReplaceText } from "@/components/tools/replace-text"
import { TimestampConverter } from "@/components/tools/timestamp-converter"
import {
  areaShapes,
  perimeterShapes,
  surfaceAreaShapes,
  volumeShapes,
} from "@/lib/configs/geometry"
import {
  emojiGroups,
  emoticonGroups,
  symbolGroups,
} from "@/lib/configs/symbols"
import {
  braSizeData,
  capitalData,
  childClotheSizeData,
  dressSizeData,
  manClothingSizeData,
  manPantSizeData,
  paperSizeData,
  underwearSizeData,
  vegetableOilData,
  womanClothingSizeData,
  womanShirtSizeData,
} from "@/lib/configs/tables"
import {
  boldModes,
  caseModes,
  italicModes,
  mirrorModes,
  reverseModes,
  sentenceCaseModes,
  strikethroughModes,
  titleCaseModes,
  underlineModes,
  upsideDownModes,
} from "@/lib/configs/text-transforms"
import {
  areaConfig,
  energyConfig,
  lengthConfig,
  temperatureConfig,
  volumeConfig,
  weightConfig,
} from "@/lib/configs/units"

export const toolComponents: Record<string, ComponentType> = {
  // 健康
  "health/bmi": BmiCalculator,
  "health/bmr": BmrCalculator,
  "health/bfr": BfrCalculator,
  "health/weight": StandardWeight,
  "health/burn-fat-heart-rate": BurnFatHeartRate,
  "health/protein-intake": ProteinIntake,
  "health/energy-convert": () => <UnitConverter {...energyConfig} />,
  "health/running-calorie": RunningCalorie,
  "health/best-figure": BestFigure,
  "health/female-safe-period": SafePeriod,
  "health/child-height": ChildHeight,
  "health/bood-type": BloodType,
  "health/vegetable-oil": () => <DataTable data={vegetableOilData} />,
  // 办公助手
  "office/convert-case": () => <TextTransform modes={caseModes} />,
  "office/title-case-converter": () => <TextTransform modes={titleCaseModes} />,
  "office/sentence-case-converter": () => (
    <TextTransform modes={sentenceCaseModes} />
  ),
  "office/bold-text-generator": () => <TextTransform modes={boldModes} />,
  "office/italic-text-generator": () => <TextTransform modes={italicModes} />,
  "office/strikethrough-text-generator": () => (
    <TextTransform modes={strikethroughModes} />
  ),
  "office/underline-text": () => <TextTransform modes={underlineModes} />,
  "office/upside-down-text-generator": () => (
    <TextTransform modes={upsideDownModes} />
  ),
  "office/mirror-text-generator": () => <TextTransform modes={mirrorModes} />,
  "office/reverse-text-generator": () => <TextTransform modes={reverseModes} />,
  "office/replace-text": ReplaceText,
  "office/emoji": () => <SymbolPicker groups={emojiGroups} />,
  "office/emoticon": () => <SymbolPicker groups={emoticonGroups} />,
  "office/symbols": () => <SymbolPicker groups={symbolGroups} />,
  "office/paper-size": () => <DataTable data={paperSizeData} />,
  // 程序员
  "code/timestamp": TimestampConverter,
  "code/base64": Base64Converter,
  "code/base-converter": BaseConverter,
  "code/md5-encrypt": () => (
    <HashTool algorithms={[{ key: "md5", label: "MD5" }]} />
  ),
  "code/sha-encrypt": () => (
    <HashTool
      algorithms={[
        { key: "sha1", label: "SHA-1" },
        { key: "sha224", label: "SHA-224" },
        { key: "sha256", label: "SHA-256" },
        { key: "sha384", label: "SHA-384" },
        { key: "sha512", label: "SHA-512" },
        { key: "sha3", label: "SHA-3" },
      ]}
    />
  ),
  "code/ripemd160-encrypt": () => (
    <HashTool algorithms={[{ key: "ripemd160", label: "RIPEMD-160" }]} />
  ),
  "code/hmac-encrypt": () => (
    <HmacTool
      algorithms={[
        { key: "md5", label: "MD5" },
        { key: "sha1", label: "SHA-1" },
        { key: "sha256", label: "SHA-256" },
        { key: "sha512", label: "SHA-512" },
        { key: "ripemd160", label: "RIPEMD-160" },
      ]}
    />
  ),
  "code/aes-encrypt": () => <CipherTool cipher="AES" />,
  "code/des-encrypt": () => <CipherTool cipher="DES" />,
  "code/rabbit-encrypt": () => <CipherTool cipher="Rabbit" />,
  "code/rc4-encrypt": () => <CipherTool cipher="RC4" />,
  "code/image-to-base64": ImageToBase64,
  "code/url-encoder-decoder": UrlCodec,
  "code/text-to-ascii-converter": AsciiConverter,
  "code/unicode-encoder-decoder": UnicodeCodec,
  "code/compare-text": CompareText,
  "code/format-html": () => <CodeFormatter lang="html" />,
  "code/format-css": () => <CodeFormatter lang="css" />,
  "code/format-js": () => <CodeFormatter lang="js" />,
  // 生成
  "generate/random-password": RandomPasswordGenerator,
  "generate/random-number": RandomNumberGenerator,
  "generate/serial-number": SerialNumberGenerator,
  "generate/qrcode": QrCodeGenerator,
  "generate/bar-code": BarCodeGenerator,
  // 学习
  "study/length-converter": () => <UnitConverter {...lengthConfig} />,
  "study/area-converter": () => <UnitConverter {...areaConfig} />,
  "study/volume-converter": () => <UnitConverter {...volumeConfig} />,
  "study/weight-converter": () => <UnitConverter {...weightConfig} />,
  "study/temperature-converter": () => <UnitConverter {...temperatureConfig} />,
  "study/proportion-calculator": ProportionCalculator,
  "study/perimeter-calculator": () => (
    <GeometryCalculator shapes={perimeterShapes} resultLabel="周长" />
  ),
  "study/area-calculator": () => (
    <GeometryCalculator shapes={areaShapes} resultLabel="面积" />
  ),
  "study/surface-area-calculator": () => (
    <GeometryCalculator shapes={surfaceAreaShapes} resultLabel="表面积" />
  ),
  "study/volume-calculator": () => (
    <GeometryCalculator shapes={volumeShapes} resultLabel="体积" />
  ),
  "study/pi-query": PiQuery,
  // 生活
  "life/age": AgeCalculator,
  "life/retirement-time-query": RetirementTime,
  "life/loan-calculator": LoanCalculator,
  "life/capital": () => <DataTable data={capitalData} />,
  "life/flag": () => <FlagGallery />,
  "life/bra-size": () => <DataTable data={braSizeData} />,
  "life/underwear-size": () => <DataTable data={underwearSizeData} />,
  "life/woman-clothing-size": () => <DataTable data={womanClothingSizeData} />,
  "life/woman-shirt-size": () => <DataTable data={womanShirtSizeData} />,
  "life/dress-size": () => <DataTable data={dressSizeData} />,
  "life/child-clothe-size": () => <DataTable data={childClotheSizeData} />,
  "life/man-clothing-size": () => <DataTable data={manClothingSizeData} />,
  "life/man-pant-size": () => <DataTable data={manPantSizeData} />,
  // 娱乐
  "ent/morse-code-translator": MorseCodeTranslator,
  "ent/lottery": Lottery,
  "ent/worth": WorthCalculator,
  "ent/death-time": DeathTime,
  "ent/lucky-number": LuckyNumber,
  "ent/lucky-color": LuckyColor,
  "ent/hash-avatar": HashAvatar,
}

export function ToolRenderer({ toolKey }: { toolKey: string }) {
  const ToolComponent = toolComponents[toolKey]
  if (!ToolComponent) return null
  return <ToolComponent />
}
