import { useState } from "react";
import { StyledRegisterVideo } from "./styles";

function useForm ({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange (event) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function clearForm () {
    setValues(initialValues)
    setErrors({})
  }

  function handleSubmit (event) {
    event.preventDefault()
    const errorsResponse = validate?.(values)
    setErrors(errorsResponse)
    if (Object.keys(errorsResponse).length == 0) {
      onSubmit?.(values);
    }
  }

  function clearErrors () {
    setErrors({})
  }

  return {
    values,
    handleChange,
    clearForm,
    handleSubmit,
    errors,
    clearErrors,
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
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = 'Required';
      }
      if (values.title.length < 3) {
        errors.title = 'Minimum length is 3';
      }
      if (
        !/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/i.test(values.url)
      ) {
        errors.url = 'Invalid Youtube url address';
      }
      return errors;
    },
  })

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => {
        setIsModalVisible(true)
      }}>
        +
      </button>
      {
        isModalVisible &&
        (
          <form onSubmit={createVideoForm.handleSubmit}>
            <div>
              <button type="button" className="close-modal" onClick={() => {
                createVideoForm.clearForm()
                setIsModalVisible(false)
              }}>
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
              {
                <p>{createVideoForm.errors.title}</p>
              }
              <input
                placeholder='Youtube url'
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
              {
                <p>{createVideoForm.errors.url}</p>
              }
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