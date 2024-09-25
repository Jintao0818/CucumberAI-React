import { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Space, Card, Image } from 'antd'

const { Meta } = Card

const MainSamples = forwardRef((_props, ref) => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useImperativeHandle(ref, () => ({
    showModal
  }))


  return (
    <Modal title="Click to download sample images" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={710}>
      <Space style={{ marginTop: '20px' }}>
        <a download="fruit_sample.jpg" href="/src/assets/Main/fruit_sample.JPG">
          <Card
            hoverable
            style={{ width: 330 }}
            cover={<Image preview={false} src="/src/assets/Main/fruit_sample.JPG" />}
          >
            <Meta title="Fruit Image" description="upload it under fruit mode" />
          </Card>
        </a>
        <a download="pulp_sample.jpg" href="/src/assets/Main/pulp_sample.JPG">
          <Card
            hoverable
            style={{ width: 330 }}
            cover={<Image preview={false} src="/src/assets/Main/pulp_sample.JPG" />}
          >
            <Meta title="Pulp Image" description="upload it under pulp mode" />
          </Card>
        </a>
      </Space>
    </Modal>
  )
})

export default MainSamples