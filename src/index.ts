import { buildURL } from './helpers/url'
import { AxiosRequsetConfig, AxiosPromise, AxiosResponse } from './types/index'
import { transformRequest, transformResponse } from './helpers/data'
import xhr from './xhr'
import { processHeaders } from './helpers/headers'
function axios(config: AxiosRequsetConfig): AxiosPromise {
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}

function processConfig(config: AxiosRequsetConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequsetConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequsetConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequsetConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transfromResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios
