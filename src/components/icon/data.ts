import { paths } from "./paths";

export type IconData = {
  load: () => ReturnType<typeof require>;
  width: number;
  height: number;
};

const default$ = {
  width: 32,
  height: 32,
};

export const registry = {
  ...Object.entries(paths)
    .map(([name, path]) => ({
      [name]: {
        load: () => require(path),
        width: default$.width,
        height: default$.height,
      },
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}),
} as Record<keyof typeof paths, IconData>;
