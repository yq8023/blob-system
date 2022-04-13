import originAxios, { AxiosRequestConfig } from "axios";
import { getToken } from "./util";

const Success_Code = 0;
const Unauthorized_Code = 10101;
const Invalid_Token = 10102;

export type CommonResp<D = any> =
  | {
      code: number;
      message: string;
      result?: D;
    }
  | undefined;

export type CommonPagination<T> = {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
};

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

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权的访问";
              break;
            default:
              err.message = "其他错误信息";
          }
        }
        return err;
      }
    );

    // 2.传入对象进行网络请求

    instance(option)
      .then((res) => {
        if (res.data.code === Success_Code) {
          resolve(res.data);
        } else if (
          res.data.code === Unauthorized_Code ||
          res.data.code === Invalid_Token
        ) {
          window.location.href = "/login";
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
