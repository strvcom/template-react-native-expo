import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { colors } from '~/styles/colors'

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

export const Button = ({ text, onPress }: IButton) => (
  <TouchableOpacity onPress={onPress} style={styles.wrapper}>
    <Text style={{ fontFamily: 'Domine-Bold', textTransform: 'uppercase', color: 'white' }}>
      {text}
    </Text>
  </TouchableOpacity>
)
