import { Text, View } from 'react-native'

import { useAuth } from '~/features/auth/hooks/useAuth'
import { Button } from '~/features/ui/components/Button'
import { ms } from '~/utils/scale'

export const Profile = () => {
  const { signOut } = useAuth()
  return (
    <View>
      <Text style={{ fontSize: ms(20) }}>Profile</Text>
      <Button text="Sign out" onPress={signOut} />
    </View>
  )
}
