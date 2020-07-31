/** 对象深度克隆
 * @param {Object} obj: 想要克隆的Object
 */
export const cloneObject = function (obj) {
  if (Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object') {
    const clone = (any) => {
      const newObject = {}
      for (const i in any) {
        const data = any[i]
        const type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
        switch (type) {
          case 'object':
            newObject[i] = clone(data)
            break
          case 'array':
            newObject[i] = data.slice()
            break
          case 'date':
            newObject[i] = new Date(data)
            break
          default: newObject[i] = data
        }
      }
      return newObject
    }
    return clone(obj)
  } else {
    return obj
  }
}

// 数组深度克隆
export const cloneArray = arr => {
  return arr.slice()
}

/* 判断是否为空对象 */
export const isEmptyObject = obj => {
  for (const i in obj) {
    return false
  }
  return true
}

/**
 * 获取数据类型
 * typeof null 会返回 'object'
 * 而这里传入null 则返回 'null'
 */
export const getDataType = data => {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

/* 判断对象类型是否为 object */
export const isObject = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === 'object'
}

/* 获取一串数字的整数部分的长度 */
export const getNumberLength = (number) => {
  return number.toString().split('.')[0].length * 1
}

/**
 * 对象转路由参数
 * {key: '1', key2: '2'} => key=1&key2=2
 */
export const setRoutePathParams = (object) => {
  if (isObject(object)) {
    let path = ''
    for (const i in object) {
      if (object[i] != null) {
        path += `${i}=${object[i]}&`
      }
    }
    return path
  } else {
    return ''
  }
}

/* 函数防抖 */
export const debounce = (callback, time = 300) => {
  let _function = false

  /* 利用闭包使每一个定时器都在独立的作用域 */
  return (function () {
    clearTimeout(_function)
    _function = setTimeout(callback, time)

    /* 返回终止的方法 */
    return {
      stop: () => {
        clearTimeout(_function)
      }
    }
  })()
}

/* 对象'.'表示法字符串查询数据 */
export const getValueOfKey = (data, key) => {
  /* 用于深度获取对象内容 */
  const newKey = key.split('.')
  let newData = data
  for (const i in newKey) {
    newData = newData[newKey[i]]
  }
  return newData
}

/* 获取指定长度的随机数 */
export const randomNum = function (length) {
  let num = 0
  for (let i = 0; i < length; i += 1) {
    num += Math.floor(Math.random() * 11).toString()
  }
  return parseInt(num)
}
