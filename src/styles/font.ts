// 100 Thin
// 200 Extra Light
// 300 Light
// 400 Normal
// 500 Medium
// 600 Semi Bold
// 700 Bold
// 800 Extra Bold
// 900 Ultra Bold
export const font = {
  font: {
    path: "#/fonts/Pretendard.ttf",
    name: "Pretendard",
  },
  display: {
    "1": {
      size: 40,
      height: 40,
      weight: "500", // medium
    },
    "2": {
      size: 36,
      height: 48,
      weight: "700", // bold
    },
  },
  headline: {
    "1": {
      size: 28,
      height: 38,
      weight: "700", //bold
    },
    "2": {
      size: 22,
      height: 30,
      weight: "700", // bold
    },
  },
  title: {
    "1": {
      size: 20,
      height: 26,
      weight: "700", // bold
    },
    "2": {
      size: 20,
      height: 26,
      weight: "600", // semibold
    },
  },
  body: {
    "1": {
      size: 18,
      height: 24,
      weight: "600", //semibold
    },
    "2": {
      size: 16,
      height: 22,
      weight: "500", // medium
    },
    "3": {
      size: 16,
      height: 22,
      weight: "400", // regular
    },
    "4": {
      size: 14,
      height: 20,
      weight: "500", // medium
    },
    "5": {
      size: 14,
      height: 20,
      weight: "400", // regular
    },
  },
  button: {
    "1": {
      size: 20,
      height: 26,
      weight: "600", // semibold
    },
    "2": {
      size: 14,
      height: 20,
      weight: "500", // medium
    },
  },
  caption: {
    "1": {
      size: 12,
      height: 16,
      weight: "600", // semibold
    },
    "2": {
      size: 12,
      height: 16,
      weight: "400", // regular
    },
  },
} as const;
