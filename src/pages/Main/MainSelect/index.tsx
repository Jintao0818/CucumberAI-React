import { Radio, Checkbox } from 'antd'
import type { RadioChangeEvent } from "antd/es/radio"
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
// import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useEffect } from 'react'
import './style.scss'
import { useRootSelector, useRootDispatch } from '@/store'
import { setCharacterValue, setCheckAll, setIndeterminate, setModeValue } from '@/store/modules/settings'

const CheckboxGroup = Checkbox.Group

const plainOptions1 = ['fruit shape', 'color & texture', 'stripe', 'tumor']
const plainOptions2 = ['pulp shape', 'flesh & heart']

type Props = {
  noAction: boolean
}

type CheckboxValueType = string | number

const MainSelect = (props: Props) => {

  const { noAction } = props

  const dispatch = useRootDispatch()
  const { modeValue, checkAll, indeterminate, characterValue } = useRootSelector(state => state.settings)

  // 模式变化
  const onRadioChange = (e: RadioChangeEvent) => {
    dispatch(setModeValue(e.target.value))
    dispatch(setCheckAll(false))
    dispatch(setCharacterValue([]))
  }

  // 全选框
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (modeValue === 'fruit') {
      dispatch(setCharacterValue(e.target.checked ? plainOptions1 : []))
    } else {
      dispatch(setCharacterValue(e.target.checked ? plainOptions2 : []))
    }
    dispatch(setIndeterminate(false))
  }

  // 选择框
  const onCheckChange = (list: CheckboxValueType[]) => {
    dispatch(setCharacterValue(list))
  }

  useEffect(() => {
    if (modeValue === 'fruit') {
      dispatch(setIndeterminate(characterValue.length > 0 && characterValue.length < plainOptions1.length))
      dispatch(setCheckAll(plainOptions1.length === characterValue.length))
    } else {
      dispatch(setIndeterminate(characterValue.length > 0 && characterValue.length < plainOptions2.length))
      dispatch(setCheckAll(plainOptions2.length === characterValue.length))
    }
  }, [dispatch, characterValue])

  return (
    <>
      <div>
        <Radio.Group defaultValue={modeValue} buttonStyle="solid" className='mode' onChange={onRadioChange} disabled={noAction}>
          <Radio.Button value="fruit">Fruit mode</Radio.Button>
          <Radio.Button value="pulp">Pulp mode</Radio.Button>
        </Radio.Group>
      </div>

      <div style={{ borderBottom: '0.065vw solid #E9E9E9' }}>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} disabled={noAction}>
          Check all
        </Checkbox>
      </div>
      {modeValue === 'fruit' && <CheckboxGroup options={plainOptions1} value={characterValue} onChange={onCheckChange} className='features' disabled={noAction} />}
      {modeValue === 'pulp' && <CheckboxGroup options={plainOptions2} value={characterValue} onChange={onCheckChange} className='features' disabled={noAction} />}

    </>

  )
}

export default MainSelect