/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* The app should not allow uncontrolled font scaling as UI may break and become unusable. Yet we should not disable it all together so that people with bad eyesight can still increase the font size, therefore a reasonable maximum font scale should be set for Text and TextInput components */

import { Text, TextInput } from 'react-native'

const MAXIMUM_FONT_SCALE = 1.25

export const setFontScaling = () => {
  Text.defaultProps = Text.defaultProps || {}
  Text.defaultProps.maxFontSizeMultiplier = MAXIMUM_FONT_SCALE
  TextInput.defaultProps = TextInput.defaultProps || {}
  TextInput.defaultProps.maxFontSizeMultiplier = MAXIMUM_FONT_SCALE
}
