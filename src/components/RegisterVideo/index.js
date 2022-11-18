import { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { VideoService } from "../../services/VideoService";

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

function getVideoIdFromYoutubeUrl (url) {
  const regex = new RegExp(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, 'gmi')
  const videoId = (regex.exec(url))[7]
  if (videoId) {
    return videoId
  }
}

function getThumbnailFromYoutubeUrl (url) {
  const videoId = getVideoIdFromYoutubeUrl(url)
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export default function RegisterVideo ({ playlists, reloadData }) {
  const videoService = VideoService()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const createVideoForm = useForm({
    initialValues: {
      playlist_id: "",
      title: "",
      url: "",
      thumb: "",
    },
    onSubmit: () => {
      const thumb = getThumbnailFromYoutubeUrl(createVideoForm.values.url)

      createVideoForm.handleChange({
        target: {
          name: 'thumb',
          value: thumb
        }
      })

      const created = videoService.insertOne({
        ...createVideoForm.values,
        thumb
      })

      if (created) {
        setIsModalVisible(false)
        createVideoForm.clearForm()
        reloadData()
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.playlist_id) {
        errors.playlist_id = 'Required';
      }
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

  const nonePlaylist = {
    id: '',
    name: 'Pick one playlist'
  }

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
              <select
                name='playlist_id'
                value={createVideoForm.values.playlist_id}
                onChange={createVideoForm.handleChange}
              >
                {
                  [nonePlaylist, ...playlists].map((p) => {
                    return (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    )
                  })
                }
              </select>
              {
                <p>{createVideoForm.errors.playlist_id}</p>
              }
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