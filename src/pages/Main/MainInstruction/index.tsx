
import { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal, Typography, Steps, Image } from 'antd'

const { Paragraph } = Typography

const steps = [
  {
    title: 'Select a mode',
    description:
      'Make sure that the uploaded image corresponds to the selected one.',
    img: 'src/assets/Main/mode.png'
  },
  {
    title: 'Select characteristics',
    description: 'At least one must be selected.',
    img: 'src/assets/Main/characteristics.png'
  },
  {
    title: 'Upload pictures',
    description:
      'You can predict multiple pictures at a time (for the time being, you can only upload JPG or PNG files one by one, with a limit of 5 uploads)',
    img: 'src/assets/Main/upload.png'
  },
  {
    title: 'Run the program',
    description:
      "Click the 'Run' button to run the program. Click the 'Reset' button or refresh the page to clear everything.",
    img: 'src/assets/Main/button.png'
  },
  {
    title: 'Get Result',
    description:
      'The results include excel and image table. Click on the image to preview. The results can be downloaded.',
    img: 'src/assets/Main/result.png'
  }
]

const MainInstruction = forwardRef((_props, ref) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(0)

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

  const onStepChange = (value: number) => {
    setCurrentStep(value)
  }

  return (
    <Modal title="Instructions for use" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Typography style={{ marginTop: '20px' }}>
        <Paragraph>
          <Steps
            direction="vertical"
            size="small"
            current={currentStep}
            items={steps}
            onChange={onStepChange}
          />
        </Paragraph>
        <Paragraph>
          <Image preview={false} src={steps[currentStep].img} />
        </Paragraph>
      </Typography>
    </Modal>
  )
})

export default MainInstruction