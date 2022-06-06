import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from 'src/styles/colors'

interface IButton {
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
})

const Button = ({ text, onPress }: IButton) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Text>{text}</Text>
  </TouchableOpacity>
)

export default Button
