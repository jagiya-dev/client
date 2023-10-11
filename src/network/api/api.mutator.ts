// custom-instance.ts
import AXIOS, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
export const URL_ROOT =
  process.env.NODE_ENV === "development"
    ? "https://www.readyumbrelladata.com"
    : "https://www.readyumbrelladata.com";

// export const URL_ROOT_CHALLENGE = "https://challenge.dev-surfer.com";

export type ErrorType<Error> = AxiosError<Error>;

// const URL_ROOT = process.env.NEXT_PUBLIC_URL_ROOT;
const axiosInstance: AxiosInstance = AXIOS.create({
  baseURL: URL_ROOT,
});

export const getInstance = <T>(
  cfg: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  const cancelTokenSource = AXIOS.CancelToken.source();
  const promise = axiosInstance({
    ...cfg,
    ...options,
    cancelToken: cancelTokenSource.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    cancelTokenSource.cancel("Query was cancelled");
  };

  return promise;
};

// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
export type BodyType<BodyData> = BodyData; //CamelCase<BodyType>;
