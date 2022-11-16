import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledHeader } from '../src/components/Header'
import { StyledTimeline } from '../src/components/Timeline'
import { StyledFavorites } from '../src/components/Favorites'

function HomePage () {
  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists} />
        <Favorites favoriteUsers={config.favoriteUsers} />
      </div>
    </>
  )
}

function Header () {
  return (
    <StyledHeader>
      <img className='banner' src='https://media.istockphoto.com/id/537331500/pt/foto/fundo-abstrato-tecnologia-de-c%C3%B3digo-de-programa%C3%A7%C3%A3o-de-deve-software.jpg?s=1024x1024&w=is&k=20&c=sjcsvE53PphQQOrSDuNv_Par1fwlg5hRNxfOdKQdnL4=' />
      <section className='user-info'>
        <img className='user-img' src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline (props) {
  const playlistNames = Object.keys(props.playlists)

  return (
    <StyledTimeline>
      {playlistNames.map((name) => {
        const videos = props.playlists[name]
        return (
          <section>
            <h2>{name}</h2>
            <div>
              {
                videos.map((video, index) => {
                  return (
                    <a key={index} href={video.url} target='_blank'>
                      <img src={video.thumb} />
                      <span>
                        {video.title}
                      </span>
                    </a>
                  )
                })
              }
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

function Favorites (props) {
  const { favoriteUsers } = props

  return (
    <StyledFavorites>
      <section>
        <h2>AluraTubes favoritos</h2>
        <div>
          {favoriteUsers.map((user, index) => {
            return (
              <a key={index} href={`https://www.youtube.com/@${user.name}`} target='_blank'>
                <img src={user.img} />
                <h4>
                  @{user.name}
                </h4>
              </a>
            )
          })}
        </div>
      </section>
    </StyledFavorites>
  )
}

export default HomePage