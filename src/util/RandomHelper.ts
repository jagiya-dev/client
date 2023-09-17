export const randomBool = () => Math.round(Math.random() * 2) == 0;

export const pickOneOfMany = <T>(...arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const pickOneOfFlags = (flag: number, lenFlag: number) => {
  const rnd = Math.floor(Math.random() * lenFlag);
  return flag & (1 << rnd);
};

export const randomTime = () => {
  const hour = Math.floor(Math.random() * 12)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");

  return `${hour}:${minute}`;
};
