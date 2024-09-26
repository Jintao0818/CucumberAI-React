import { VerticalAlignBottomOutlined } from '@ant-design/icons'
import { Table, Divider, Button, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRootSelector } from "@/store"
import { useEffect, useState } from 'react'



const MainResult = () => {

  const { modeValue } = useRootSelector(state => state.settings)
  const { downloadUrl, resultData } = useRootSelector(state => state.data)


  // 展示表格列
  const [showColumns, setShowColumns] = useState<ColumnsType<object>>([])

  // 初始表格列
  const columns: ColumnsType<object> = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Fruit',
      dataIndex: 'fruit_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Segment',
      dataIndex: 'color_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Skeleton',
      dataIndex: 'sk_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Dr',
      dataIndex: 'V1_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Hr',
      dataIndex: 'V2_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Cf',
      dataIndex: 'V5_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Stripe',
      dataIndex: 'stripe_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Tumors',
      dataIndex: 'tumor_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Hr',
      dataIndex: 'smooth_V1_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Cr',
      dataIndex: 'smooth_V2_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Cf',
      dataIndex: 'smooth_V4_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Heart',
      dataIndex: 'heart_img',
      render: (record) => <Image width={'10vh'} height={'10vh'} src={'data:image/jpg;base64,' + record } />,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (record) => <a onClick={() => downloadImages(record)}>Download</a>
    }
  ]

  useEffect(() => {

    if (resultData.length !== 0) {
      setShowColumns(columns.map((item) => ({
        ...item,
        hidden: !(Object.keys(resultData[0]).includes(item.dataIndex) || item.key === 'action'),
      })))
    }

  }, [resultData])


  // 表格下载
  const downloadExcel = () => {
    console.log("excel:", downloadUrl)
    const element = document.createElement('a')
    element.href = downloadUrl
    element.download = modeValue + '.xlsx'
    element.target = '_blank'
    element.click()
  }


  // 下载图片
  const downloadImages = (record: any) => {
    const imgKey = record.key
    for (const item in record) {
      if(item !== 'key' && item !== 'name'){
        const link = document.createElement('a')
        link.href = 'data:image/jpg;base64,' + record[item]
        const imgName = columns.find((i) => i.dataIndex === item)?.title
        link.download = imgKey + '_' + imgName + '.jpg'
        link.click()
      }
    }
  }


  return (
    <>
      <Divider orientation="left" style={{ marginTop: "30px" }}>Result Data</Divider>
      <Button type='primary' onClick={downloadExcel}><VerticalAlignBottomOutlined />Click to Download</Button>

      <Divider orientation="left" style={{ marginTop: "30px" }}>Result Images</Divider>
      <Table columns={showColumns} dataSource={resultData} scroll={{ x: 'max-content' }} />
    </>
  )
}

export default MainResult