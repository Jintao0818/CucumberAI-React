let baseUrl = ''

switch (import.meta.env.MODE) {
  case 'development':
    baseUrl = 'http://192.168.1.101:3333' //开发环境(dev)
    // baseUrl = 'http://192.168.31.144:3333' //开发环境(dev)
    break
  case 'production':
    baseUrl = 'http://47.100.80.240:9568/' //生产环境(bulid)
    break
}

export default baseUrl