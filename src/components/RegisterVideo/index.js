import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm ({ initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues)

  function handleChange (event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function clearForm () {
    setValues(initialValues)
  }

  function handleSubmit (event) {
    event.preventDefault()
    onSubmit?.(values);
  }

  return {
    values,
    handleChange,
    clearForm,
    handleSubmit,
  }
}

export default function RegisterVideo () {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const createVideoForm = useForm({
    initialValues: { title: "", url: "", thumb: "" },
    onSubmit: () => {
      const regex = new RegExp(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, 'gmi')
      const videoId = (regex.exec(createVideoForm.values.url))[7]
      createVideoForm.handleChange({
        target: {
          name: 'thumb',
          value: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        }
      })
      setTimeout(() => {
        setIsModalVisible(false)
        createVideoForm.clearForm()
      }, 1000)
    }
  })

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setIsModalVisible(true)}>
        +
      </button>
      {
        isModalVisible &&
        (
          <form onSubmit={createVideoForm.handleSubmit}>
            <div>
              <button type="button " className="close-modal" onClick={() => setIsModalVisible(false)}>
                X
              </button>
              <input
                placeholder='Video title'
                name='title'
                value={createVideoForm.values.title}
                onChange={createVideoForm.handleChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    createVideoForm.handleSubmit(event)
                  }
                }}
              />
              <input
                placeholder='URL'
                name='url'
                value={createVideoForm.values.url}
                onChange={createVideoForm.handleChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    createVideoForm.handleSubmit(event)
                  }
                }}
              />
              <button type='submit'>
                Cadastrar
              </button>
              {
                createVideoForm.values.thumb &&
                <img style={{ marginTop: '16px' }} src={createVideoForm.values.thumb} />
              }
            </div>
          </form>
        )
      }
    </StyledRegisterVideo>
  )
}