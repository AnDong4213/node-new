import createAxios from '@/utils/axios'

const Url = '/api/v1/'

export function queryVideoList(data) {
  return createAxios({
    url: Url + 'video/videolist',
    method: 'POST',
    data
  })
}
