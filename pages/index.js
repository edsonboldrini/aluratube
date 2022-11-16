import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledHeader } from '../src/components/Header'
import { StyledTimeline } from '../src/components/Timeline'
import { StyledFavorites } from '../src/components/Favorites'
import { useState } from 'react'

function HomePage () {
  const [searchInput, setSearchInput] = useState('')
  const [isDark, setIsDark] = useState(false)

  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu searchInput={searchInput} setSearchInput={setSearchInput} isDark={isDark} setIsDark={setIsDark} />
        <Header />
        <Timeline searchInput={searchInput} playlists={config.playlists} />
        <Favorites favoriteUsers={config.favoriteUsers} />
      </div>
    </>
  )
}
const StyledBanner = styled.div`
  background-color: gray;
  background-image: url(${(props) => props.url});
  height: 230px;
`
function Header () {
  return (
    <StyledHeader>
      <StyledBanner url={config.bannerUrl} />
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
          <section key={name}>
            <h2>{name}</h2>
            <div>
              {
                videos
                  .filter((video) => {
                    return video.title.toLowerCase().includes(props.searchInput.toLowerCase())
                  })
                  .map((video, index) => {
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