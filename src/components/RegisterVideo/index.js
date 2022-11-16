import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm (props) {
  const [values, setValues] = useState(props.initialValues)

  function handleChange (event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function clearForm () {
    setValues(props.initialValues)
  }

  return {
    values,
    handleChange,
    clearForm,
  }
}

export default function RegisterVideo () {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const createVideoForm = useForm({ initialValues: { title: "", url: "" } })

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setIsModalVisible(true)}>
        +
      </button>
      {
        isModalVisible &&
        (
          <form onSubmit={(event) => {
            event.preventDefault()
            setIsModalVisible(false)
            createVideoForm.clearForm()
          }}>
            <div>
              <button type="button " className="close-modal" onClick={() => setIsModalVisible(false)}>
                X
              </button>
              <input
                placeholder='Video title'
                name='title'
                value={createVideoForm.values.title}
                onChange={createVideoForm.handleChange}
              />
              <input
                placeholder='URL'
                name='url'
                value={createVideoForm.values.url}
                onChange={createVideoForm.handleChange}
              />
              <button type='submit'>
                Cadastrar
              </button>
            </div>
          </form>
        )
      }
    </StyledRegisterVideo>
  )
}