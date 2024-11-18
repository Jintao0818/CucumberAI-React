import { useEffect, useState } from "react"
import { StatusAPI } from "@/apis/func"
import { useNavigate } from "react-router-dom"

// 主页初始化：获取设备类型跳转相应页面、查询GPU服务器状态
function useInit() {
  
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()
  function _isMobile() {
    const device = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    return device != null
  }
  
  useEffect(() => {
    const isMobile = _isMobile()
    console.log('isMobile:', isMobile)
    if (isMobile) {
      navigate('/mobile')
    }
    
    StatusAPI().then((res) => {
      setStatus(res.data.status)
    })
    // 定时器
    let intervalId: NodeJS.Timeout
    intervalId = setInterval(() => {
      StatusAPI().then((res) => {
        setStatus(res.data.status)
      })
    }, 50000)
    // 清理定时器
    return () => {
      clearInterval(intervalId)
    }
    
  }, [])

  return {status}
  
}

export default useInit
