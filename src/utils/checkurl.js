let name = function (params) {
  let searchStr = window.location.href.split('?')[1] || 'id=0'
  let searchArr = searchStr.split('&')
  let searchObj = {}
  for (let i = 0; i < searchArr.length; i++) {
    let curParam = searchArr[i].split('=')
    searchObj[curParam[0]] = curParam[1]
  }
  return searchObj[params] || null
}
export default name
