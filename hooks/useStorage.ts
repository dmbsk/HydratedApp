import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEYS = {
  CUPS_GOAL: 'CUPS_GOAL',
  CUPS_TODAY: 'CUPS_TODAY',
  TODAY_CUPS_PERCENTAGE: 'TODAY_CUPS_PERCENTAGE'
}

type StorageKeys = keyof typeof STORAGE_KEYS

export const useStoreData = (key: StorageKeys) => {
  const storeData = async (data: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
  }

  return [storeData]
}

export const useGetData = (key: StorageKeys) => {
  const getValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS[key])
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e)
    }
  }

  return [getValue]
}
