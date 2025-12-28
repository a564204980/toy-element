/**
 * 解析宽度值为数字
 * 将字符串类型的宽度（如 "120px" 或 "120"）转换为数字
 * @param width - 宽度值，可以是数字或字符串
 * @returns 返回数字类型的宽度值
 */
export const parseWidth = (width: string | number | undefined): number => {
  if (typeof width === "number") return width;
  if (!width) return 0;
  return parseInt(width);
};
