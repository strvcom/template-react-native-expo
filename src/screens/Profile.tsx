import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

import { Button } from '~/components/Button'
import { Routes } from '~/navigation/routes'
import { useRootStore } from '~/store/useRootStore'
import { ms } from '~/utils/scale'

export const Profile = () => {
  const logoutUser = useRootStore((state) => state.logoutUser)
  const navigation = useNavigation()
  const handleNavigate = () => navigation.navigate(Routes.NESTED_SCREEN, { isProfile: true })

  return (
    <View>
      <Text style={{ fontSize: ms(20) }}>Profile</Text>
      <Button text="Navigate to nested screen" onPress={handleNavigate} />
      <Button text="Sign out" onPress={logoutUser} />
    </View>
  )
}
