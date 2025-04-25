import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from '~/features/ui/theme/colors'

type ButtonProps = {
  text: string
  onPress: () => void
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.primary,
    padding: 8,
    margin: 8,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Domine-Bold',
    textTransform: 'uppercase',
    color: 'white',
  },
})

export const Button = ({ text, onPress }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)
