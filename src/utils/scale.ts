import { windowHeight, windowWidth } from '~/constants/dimensions'

const designBaseWidth = 375
const designBaseHeight = 812

const scale = (size: number) => Number(((windowWidth / designBaseWidth) * size).toFixed(2))

/**
 * This utility scales any provided deign value according to real screen width.
 *
 * Example:
 * - fontSize in designs: 10px
 * - window width in designs: 250px
 * - real window width: 500px
 * => scaled values for real screen: 15px (factor 0.5)
 *
 * @param size - The value to be scaled.
 * @param factor - The factor to be applies during the scaling.
 */
export const moderateScale = (size: number, factor = 0.5) =>
  Number((size + (scale(size) - size) * factor).toFixed(2))

// can be applied to height of a box, possibly vertical spacing
export const verticalScale = (size: number) =>
  Number(((windowHeight / designBaseHeight) * size).toFixed(2))
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor

// eslint-disable-next-line id-length
export const s = scale
export const vs = verticalScale
export const ms = moderateScale
export const mvs = moderateVerticalScale
