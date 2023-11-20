// import * as Font from 'expo-font'
import { useEffect, useState } from 'react'

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    const loadResourcesAndDataAsync = () => {
      try {
        // -- Load fonts
        // await Font.loadAsync({
        //   'Lato-Black': require('./../../assets/fonts/Lato-Black.ttf'),
        //   'Lato-Bold': require('./../../assets/fonts/Lato-Bold.ttf'),
        //   'Lato-Light': require('./../../assets/fonts/Lato-Light.ttf'),
        //   'Lato-Medium': require('./../../assets/fonts/Lato-Medium.ttf'),
        //   'Lato-Semibold': require('./../../assets/fonts/Lato-Semibold.ttf'),
        //   'Lato-Regular': require('./../../assets/fonts/Lato-Regular.ttf'),
        // })
        // -- Preload images
        // await Asset.loadAsync([
        //   require('src/../assets/images/getStarted.png'),
        // ])
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return { isLoadingComplete }
}
