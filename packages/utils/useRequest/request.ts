import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import apiConfig from './apiConfig';

interface CommonResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  page: T;
}

export default <T = unknown>(
  options: AxiosRequestConfig & { service?: any },
  isReturnResponseHeader = false
): Promise<CommonResponse<T>> =>
  new Promise((resolve, reject) => {
    console.log('%c [ apiConfig ]', 'font-size:13px; background:pink; color:#bf2c9f;', apiConfig);
    // 创建一个axios实例
    const obj = {
      baseURL: options.baseURL ? options.baseURL : apiConfig.baseUrl,
      withCredentials: true,
      headers: options.headers
        ? options.headers
        : { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformResponse: [],
      ...options,
      url: options.service
        ? (window as any).config.service[options.service] + options.url
        : options.url,
      // timeout:3000
    };
    const instance: AxiosInstance = axios.create(obj);
    // console.log(obj);
    //   拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const c: any = config;
        c.headers.satoken = document.cookie.match(/satoken=([^;]*)/)?.[1];
        return c;
      }, // console.log(config);
      //   config.headers['token'] = this.$store.state.token
      (error: AxiosError) => reject(error) // console.log(error)
    );
    //  响应头拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        try {
          const responseBody = JSON.parse(response.request.response);
          console.log(
            '%c [ responseBody ]',
            'font-size:13px; background:pink; color:#bf2c9f;',
            responseBody
          );
          // 未登录或登录失效，跳转登录页面
          if ('code' in responseBody && responseBody.code === 401)
            window.location.href = '/#/login';
        } catch (e) {
          return response;
        }
        return response;
      },

      (error: AxiosError) => {
        console.log('%c [ AxiosError ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
        // 未登录或登录失效，跳转登录页面
        if (String(error).includes('401')) {
          window.document.body.innerHTML = `<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.15);padding:10px;border-radius:5px;">登录失效，正在重定向至<a href="/#/login">登录页</a>...</div>`;
          window.location.href = '/#/login';
        }
        error;
      }
    );
    // 发送请求
    // instance<T>(obj)
    //   .then((res: T) => {
    //     if (res.request) {
    //       if (res.request.readyState !== 4 || !res.request.readyState) {
    //         return reject(new Error('请求失败'));
    //       }
    //     }
    //     return resolve(JSON.parse(res.request.response));
    //   })
    //   .catch(err => reject(new Error(err)));
    if (isReturnResponseHeader) {
      instance
        .request<any, T>(obj)
        .then((res: any) => {
          try {
            console.log('%c [ res ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
            resolve(res);
          } catch (e) {
            resolve(res);
          }
          //  resolve(JSON.parse(res.request.response));
        })
        .catch((err: any) => {
          reject(err);
        });
    } else {
      instance
        .request<any, T>(obj)
        .then((res: any) => {
          try {
            console.log('%c [ res ]', 'font-size:13px; background:pink; color:#bf2c9f;', res);
            resolve(JSON.parse(res.request.response));
          } catch (e) {
            resolve(res.request.response);
          }
          //  resolve(JSON.parse(res.request.response));
        })
        .catch((err: any) => {
          reject(err);
        });
    }
  });
