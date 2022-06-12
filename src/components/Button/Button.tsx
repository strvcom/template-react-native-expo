import { useMemo } from 'react'
import type { ViewStyle } from 'react-native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from 'src/styles/colors'

interface IButton {
  text: string
  onPress: () => void
  style?: ViewStyle
  variant?: 'small' | 'medium' | 'full'
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
    padding: 8,
    margin: 8,
    alignItems: 'center',
  },
})

const Button = ({ text, onPress, style, variant = 'full' }: IButton) => {
  const width: ViewStyle['width'] = useMemo(() => {
    if (variant === 'small') return 80
    if (variant === 'medium') return 120
    if (variant === 'full') return '100%'
  }, [variant])

  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, { width }, style]}>
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button
