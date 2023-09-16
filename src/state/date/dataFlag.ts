export const DateFlag = {
  mon: 1 << 0,
  tue: 1 << 1,
  wed: 1 << 2,
  thu: 1 << 3,
  fri: 1 << 4,
  sat: 1 << 5,
  sun: 1 << 6,
};

export const AllDateFlag =
  DateFlag.mon |
  DateFlag.tue |
  DateFlag.wed |
  DateFlag.thu |
  DateFlag.fri |
  DateFlag.sat |
  DateFlag.sun;
export const LenDateFlags = 7;
