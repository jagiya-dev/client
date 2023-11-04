import AsyncStorage from "@react-native-async-storage/async-storage";

type ErrorHandler = Parameters<typeof AsyncStorage.getItem>[1];
const useAsyncStorage = (key: string) => {
  const makeDefaultErrorHandler: ErrorHandler = (err, result) => {
    console.error(err, result);
  };

  const set = async <T>(value: T, errorHandler?: ErrorHandler) => {
    errorHandler ??= (err, handler) => {
      console.error(err, handler);
    };

    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify(value, null, 0),
        makeDefaultErrorHandler,
      );
    } catch (err) {
      console.error(err);
    }
  };

  const get = async (errorHandler?: ErrorHandler) => {
    errorHandler ??= (err, handler) => {
      console.error(err, handler);
    };

    try {
      const value = await AsyncStorage.getItem(key, errorHandler);
      return value;
    } catch (err) {
      console.error(err);
    }
  };

  const reset = async (errorHandler?: ErrorHandler) => {
    await set(null, errorHandler);
  };
};
