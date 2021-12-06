## Features

- XMLHttpRequest
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSS

## Usage

```javascript
const ajax = require('ts-ajax')

ajax({
  method: 'post',
  url: '/user/id',
  data: {
    userName: 'samuel',
    password: '******'
  }
})
```
