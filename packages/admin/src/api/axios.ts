import originAxios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type CommonResp<D = any> =
  | {
      code: number;
      message: string;
      result?: D;
    }
  | undefined;

export function getToken() {
  const cookieArr = document.cookie?.split(";") ?? [];
  const token = cookieArr.find((item) => /^\s?token=/.test(item)) ?? "";
  return token.split("=")[1] ?? "";
}

export default function request<T>(
  option: AxiosRequestConfig
): Promise<CommonResp<T>> {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      baseURL: "http://localhost:8888",
      timeout: 5000,
    });

    instance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          config.headers.authorization = getToken();
        } else {
          config.headers = {
            authorization: getToken(),
          };
        }

        config.withCredentials = true;
        return config;
      },
      (err) => {
        return err;
      }
    );

    // instance.interceptors.response.use<T>(
    //   (response) => {
    //     return response.data;
    //   },
    //   (err) => {
    //     if (err && err.response) {
    //       switch (err.response.status) {
    //         case 400:
    //           err.message = "请求错误";
    //           break;
    //         case 401:
    //           err.message = "未授权的访问";
    //           break;
    //         default:
    //           err.message = "其他错误信息";
    //       }
    //     }
    //     return err;
    //   }
    // );

    // 2.传入对象进行网络请求

    instance(option)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
