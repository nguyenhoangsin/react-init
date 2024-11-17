import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const token = 'your_token_here';

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);

      return response;
    } catch (error) {
      this.handleRequestError(error);

      throw error;
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);

      return response;
    } catch (error) {
      this.handleRequestError(error);

      throw error;
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);

      return response;
    } catch (error) {
      this.handleRequestError(error);

      throw error;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);

      return response;
    } catch (error) {
      this.handleRequestError(error);

      throw error;
    }
  }

  private handleRequestError(error: any): void {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Request failed:', error);
    }
  }
}

export default ApiClient.getInstance();
