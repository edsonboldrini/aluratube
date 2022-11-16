import config from '../config.json'
import styled from 'styled-components'
import { CSSReset } from '../src/components/CSSReset'
import Menu from '../src/components/Menu'
import { StyledHeader } from '../src/components/Header'
import { StyledTimeline } from '../src/components/Timeline'
import { StyledFavorites } from '../src/components/Favorites'
import { useState } from 'react'
import { lightTheme } from '../src/components/Menu/components/ThemeSwitch'

function HomePage () {
  const [searchInput, setSearchInput] = useState('')
  const [theme, setTheme] = useState(lightTheme)

  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: theme.backgroundBase
      }}>
        <Menu theme={theme} setTheme={setTheme} searchInput={searchInput} setSearchInput={setSearchInput} />
        <Header theme={theme} />
        <Timeline theme={theme} searchInput={searchInput} playlists={config.playlists} />
        <Favorites theme={theme} favoriteUsers={config.favoriteUsers} />
      </div>
    </>
  )
}
const StyledBanner = styled.div`
  background-color: gray;
  background-image: url(${(props) => props.url});
  height: 230px;
`
function Header ({ theme }) {
  return (
    <StyledHeader>
      <StyledBanner url={config.bannerUrl} />
      <section className='user-info'>
        <img className='user-img' src={`https://github.com/${config.github}.png`} />
        <div>
          <h2 style={{ color: theme.textColorBase }}>{config.name}</h2>
          <p style={{ color: theme.textColorBase }}>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline ({ theme, playlists, searchInput }) {
  const playlistNames = Object.keys(playlists)

  return (
    <StyledTimeline theme={theme}>
      {playlistNames.map((name) => {
        const videos = playlists[name]
        return (
          <section key={name}>
            <h2 style={{ color: theme.textColorBase }}>{name}</h2>
            <div>
              {
                videos
                  .filter((video) => {
                    return video.title.toLowerCase().includes(searchInput.toLowerCase())
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

function Favorites ({ theme, favoriteUsers }) {
  return (
    <StyledFavorites>
      <section>
        <h2 style={{ color: theme.textColorBase }}>AluraTubes favoritos</h2>
        <div>
          {favoriteUsers.map((user, index) => {
            return (
              <a key={index} href={`https://www.youtube.com/@${user.name}`} target='_blank'>
                <img src={user.img} />
                <h4 style={{ color: theme.textColorBase }}>
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