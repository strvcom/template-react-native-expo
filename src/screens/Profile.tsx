import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

import Button from 'src/components/Button'
import { useAuthStore } from 'src/hooks/useAuthStore'
import { Routes } from 'src/navigation/routes'

const Profile = () => {
  const { logoutUser } = useAuthStore()
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
