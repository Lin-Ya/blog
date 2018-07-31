const map = {
  202: '用户名已被占用',
  210: '用户名和密码不匹配',
  211: '找不到该用户',
  217: '无效的用户名',
  218: '无效的密码',
  unknown: '请求失败，请检查用户名再试'
}

export default function ({
  code
}) {
  return map[code] || map.unknown
}