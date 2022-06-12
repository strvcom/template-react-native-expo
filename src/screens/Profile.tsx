import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

import Button from 'src/components/Button'
import { Routes } from 'src/navigation/routes'
import { useRootStore } from 'src/store/useRootStore'

const Profile = () => {
  const { logoutUser } = useRootStore()
  const navigation = useNavigation()
  const handleNavigate = () => navigation.navigate(Routes.NESTED_SCREEN)

  return (
    <View>
      <Text>Profile</Text>
      <Button text="Navigate to nested screen" onPress={handleNavigate} />
      <Button text="Sign out" onPress={logoutUser} />
    </View>
  )
}

export default Profile
