import originAxios, { AxiosRequestConfig } from "axios";
import { getToken } from "./util";

export type CommonResp<D = any> =
  | {
      code: number;
      message: string;
      result?: D;
    }
  | undefined;

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
