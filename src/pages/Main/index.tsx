import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Layout, Card, Badge, Divider, Typography, message, Upload, theme, Button, Space, Spin, Modal } from 'antd'
import { ExclamationCircleOutlined, InboxOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import './style.scss'
import Paragraph from "antd/es/typography/Paragraph"
import { baseUrl } from "@/utils"
import * as imageConversion from 'image-conversion'
import { useSelector } from "react-redux"
import { useRootSelector } from "@/store"
import { ClearAPI } from "@/apis/func"

const { Header, Content, Footer } = Layout
const { Title } = Typography
const { Dragger } = Upload

const MainSelect = lazy(() => import('./MainSelect'))
const MainSamples = lazy(() => import('./MainSamples'))
const MainInstruction = lazy(() => import('./MainInstruction'))
const MainResult = lazy(() => import('./MainResult'))


const Main = () => {

  const navigate = useNavigate()

  // 判断是否移动设备
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

  }, [navigate])

  const [status, setStatus] = useState<boolean>(false)
  const [dotCount, setDotCount] = useState<number>(1)
  const refInstruction: any = useRef(null)
  const refSamples: any = useRef(null)

  const openInstruction = () => {
    setDotCount(0)
    refInstruction.current.showModal()
  }

  const openSamples = () => {
    refSamples.current.showModal()
  }

  const [noAciton, setNoAction] = useState<boolean>(false)
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [fileNameList, setFileNameList] = useState<string[]>([])
  const [spinning, setSpinning] = useState<boolean>(false)


  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: baseUrl + '/upload',
    maxCount: 5,
    disabled: noAciton,
    fileList,
    beforeUpload(file, fileList) {

      setSpinning(true)

      if (fileList.length >= 5) {
        message.warning('Maximum of 5 images can be uploaded.')
        return false
      }

      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.warning('Please upload JPG or PNG files.')
        return false
      }

      return new Promise((resolve) => {
        // 压缩到640KB
        imageConversion.compressAccurately(file, 640).then((res) => {
          resolve(res)
        })
      })
    },
    onChange(info) {

      setSpinning(false)

      setFileList(info.fileList)
      const { status, name } = info.file
      if (status === 'uploading') {
        setNoAction(true)
      }
      if (status === 'done') {
        setNoAction(false)
        setUploadSuccess(true)
        setFileNameList([
          ...fileNameList,
          name
        ])
        message.success(`${name} file uploaded successfully.`)
      } else if (status === 'error') {
        setNoAction(false)
        message.error(`${name} file upload failed.`)
      }
    }
  }

  const { characterValue } = useRootSelector(state => state.settings)

  useEffect(() => {
    // 有文件上传成功 且 文件列表不为0时 可以重置
    if (uploadSuccess === true && fileList.length !== 0) {
      setResetBtn(true)
    }
    // 有文件上传成功 且 有特征被选择时 可以运行
    if (uploadSuccess === true && characterValue.length !== 0) {
      setPreBtn(true)
    } else {
      setPreBtn(false)
    }
  }, [uploadSuccess, fileList, characterValue])



  const [preBtn, setPreBtn] = useState<boolean>(false)
  const [resetBtn, setResetBtn] = useState<boolean>(false)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const predictPicture = () => {
    console.log("predict")
  }

  const [showResult, setShowResult] = useState<boolean>(true)

  const { confirm } = Modal

  const resetPicture = () => {

    confirm({
      title: 'Are you sure to reset?',
      icon: <ExclamationCircleOutlined />,
      content: 'Uploaded images and results will be cleared.',
      async onOk() {

        setFileList([])
        setUploadSuccess(false)
        setBtnLoading(false)
        setNoAction(false)
        setResetBtn(false)
        setShowResult(false)

        try {
          const res = await ClearAPI({ names: fileNameList })
          message.success(res.data.message)
        } catch (err) {
          message.warning("Clear files failed, " + err)
        }

        setFileNameList([])
      }
    })

  }


  return (
    <Layout className="layout">
      <Header style={{ textAlign: 'center', color: 'white' }}>
        CucumberAI
      </Header>
      <Content className="content">
        <Card title="Cucumebr Characterization System" className="card" extra={
          <div>
            {status && <Badge status="success" text="GPU Server(online)" />}
            {!status && <Badge status="error" text="GPU Server(offline)" />}
            <Divider type="vertical" />
            <Badge count={dotCount} dot>
              <a onClick={openInstruction}>Instructions for use</a>
            </Badge>
            <MainInstruction ref={refInstruction}></MainInstruction>
            <Divider type="vertical" />
            <Badge count={1} dot>
              <a onClick={openSamples}>Sample Images</a>
            </Badge>
            <MainSamples ref={refSamples}></MainSamples>
          </div>
        }>
          <Typography className="tg">
            <Title style={{ marginTop: '0' }} level={4}>Choose mode, one feature at least and upload your images...</Title>
            <Paragraph>
              <Suspense fallback={'Loading...'}><MainSelect noAction={noAciton}></MainSelect></Suspense>
              <Spin tip="Image Compressing" spinning={spinning}>
                <Dragger {...props} style={{ height: '180px', borderRadius: '10px' }}>
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Upload them one by one, maximum of 5 images</p>
                </Dragger>
              </Spin>
            </Paragraph>

            <Paragraph className="tgp">
              <Space>
                {resetBtn && <Button className="btn" type="primary" onClick={resetPicture}>Reset</Button>}
                {preBtn && <Button className="btn" type="primary" onClick={predictPicture} loading={btnLoading}>Run</Button>}
              </Space>
            </Paragraph>

            <Paragraph>
              {showResult && <MainResult></MainResult>}
            </Paragraph>

          </Typography>
        </Card>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        CucumberAI-React ©2024 Created by Jin Tao
      </Footer>
    </Layout>
  )
}

export default Main