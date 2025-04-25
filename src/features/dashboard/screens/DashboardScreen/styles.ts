import { StyleSheet } from 'react-native'

import { colors } from '~/features/ui/theme/colors'
import { ms } from '~/utils/scale'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: ms(20),
  },
  image: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.black,
  },
})
