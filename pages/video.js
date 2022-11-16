import { useRouter } from "next/router"
import styled from "styled-components"
import Menu from "../src/components/Menu"


const StyledVideo = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default function Video (props) {
  const router = useRouter()
  const { id, title } = router.query

  return (
    <>
      <Menu showSearch={false} />
      <StyledVideo>
        <div>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <div>
            {title}
          </div>
        </div>
      </StyledVideo>
    </>
  )
}