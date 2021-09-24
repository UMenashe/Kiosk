import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function checkIfFirstLaunch() {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched','true');
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }