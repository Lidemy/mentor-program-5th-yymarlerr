import styled from 'styled-components';
import React, { useState } from 'react';

const Root = styled.body`
  background:rgba(0, 0, 0, 0.3);
  margin: 0;
`
const Wrapper = styled.div`
  max-width: 645px;
  height: 1400px;
  background: white;
  border-top: solid 20px #fad312;
  margin: 0 auto;
  box-shadow: 0 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`

const Form = styled.form``
const Title = styled.h1`
  width: 313px;
  height: 32px;
  margin: 54px 298px 35px 42px;
  font-family: MicrosoftJhengHei;
  font-size: 36px;
  letter-spacing: -1.8px;
  text-align: left;
  color: #000000;
`
const FormInformation = styled.div`
  margin: 35px 50px 11px 41px;
  font-family: MicrosoftJhengHei;
  font-size: 14px;
  text-align: left;
  color: #000000;
  line-height: 20px;
`
const FormDate = styled.p``
const FormLocation = styled.p``
const FormNotice = styled.div`
  color: red;
  margin-top: 10px;
  margin-bottom: 55px;
`

const FormContent = styled.div`
  margin: 0px 0px 49px 41px;
`

const Question = styled.div`
  font-family: MicrosoftJhengHei;
  font-size: 20px;
  margin: 0 0 20px 0;
  color: #000000;

  ${props => props.name !== 'advice' &&
    `&:before {
      content: '* ';
      color: red;
    }`
  }
  
`
const Answer = styled.div``

const Reminder = styled.div`
  color: red;
  margin-top: 7px;
  font-size: 12px;
`
const AnswerInput = styled.input`
  color: #afafaf;
  border: #afafaf solid 0.1px;
  border-radius: 4px;
  width: 287px;
  height: 30px;
`
const AnswerCheckbox = styled.div``

const SubmitButton = styled.button`
  width: 92px;
  height: 40px;
  margin-top: 55px;
  border-radius: 3px;
  border: 0;
  background-color: #fad312;
  font-size: 15px;
  text-align: center;
  line-height: 2em;
  color: black;
  margin-left: 49px;
  cursor: pointer;
`
const FormRemark = styled.div`
  margin-top: 20px;
  font-size: 14px;
  margin-left: 49px;
`

const Footer = styled.footer`
  height: 60px;
  width: 100%;
  background: black;
  font-size: 13px;
  text-align: center;
  color: #999999;
  margin: 45px auto 0 auto;
  line-height: 5em;
`

const AnswerRadio = styled.input`
  width: 50px;
  margin-left: -20px;
`

function FormData({ name, handleChangeData, data, placeholder, title, reminders }) {

  
  return (
    <FormContent>
      <Question name={name}>{title}</Question>
      <Answer>
        <AnswerInput value={data} name={name} onChange={handleChangeData} type='text' placeholder={placeholder}/>
      </Answer>
      {(reminders) && !data &&
      <Reminder>???????????????</Reminder>
      }
    </FormContent>
  )
}

function App() {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    ref: '',
    advice: ''
  })

  const [reminders, setReminders] = useState()

  const handleChangeData = (e) => {
    const { name, value } = e.target
    setData({
      ...data, [name]: `${value}`
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setReminders('?????????')
    alert(`?????????????????????${JSON.stringify(data)}`)
  }

  return (
    <Root>
      <Wrapper>
        <Form onSubmit={handleSubmitForm} >
          <Title>???????????????????????????</Title>
          <FormInformation>
            <FormDate>???????????????2020/12/10 ~ 2020/12/11</FormDate>
            <FormLocation>???????????????????????????????????????????????????1???</FormLocation>
            <FormNotice>* ??????</FormNotice>
          </FormInformation>
          <FormData name='name' handleChangeData={handleChangeData} data={data.name} placeholder='???????????????' title='??????' reminders={reminders} />
          <FormData name='email' handleChangeData={handleChangeData} data={data.email} placeholder='?????????????????????' title='????????????' reminders={reminders} />
          <FormData name='phone' handleChangeData={handleChangeData} data={data.phone} placeholder='?????????????????????' title='??????' reminders={reminders} />
          <FormContent>
            <Question>????????????</Question>
              <AnswerCheckbox>
                <div>
                  <AnswerRadio
                    name='type'
                    type='radio'
                    onChange={handleChangeData}
                    value='??????????????????????????????'
                  />
                  ??????????????????????????????
                </div>
                <div>
                  <AnswerRadio
                    name='type'
                    type='radio'
                    onChange={handleChangeData}
                    value='?????????????????????????????????'
                  />
                  ?????????????????????????????????
                </div>
              </AnswerCheckbox>
            {(reminders) && !(data.type) &&
            <Reminder>???????????????</Reminder>
            }
          </FormContent>
          <FormData name='ref' handleChangeData={handleChangeData} data={data.ref} placeholder='???????????????' title='???????????????????????????' reminders={reminders}/>
          <FormData name='advice' handleChangeData={handleChangeData} data={data.advice} placeholder='???????????????' title='???????????????????????????'/>
          <SubmitButton>??????</SubmitButton>
          <FormRemark>???????????????????????????????????????</FormRemark>
        </Form>
      </Wrapper>
      <Footer>?? 2020 ?? Copyright. All rights Reserved.</Footer>
    </Root>
  )
}

export default App
