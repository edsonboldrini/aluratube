import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledHeader } from '../src/components/Header'
import { StyledTimeline } from '../src/components/Timeline'
import { StyledFavorites } from '../src/components/Favorites'
import { useState } from 'react'
import Link from 'next/link'

function HomePage () {
  const [searchInput, setSearchInput] = useState('')

  return (
    <>
      <div>
        <Menu searchInput={searchInput} setSearchInput={setSearchInput} />
        <Header />
        <Timeline searchInput={searchInput} playlists={config.playlists} />
        <Favorites favoriteUsers={config.favoriteUsers} />
      </div>
    </>
  )
}
const StyledBanner = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
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

function Timeline ({ playlists, searchInput }) {
  const playlistNames = Object.keys(playlists)

  return (
    <StyledTimeline>
      {playlistNames.map((name) => {
        const videos = playlists[name]
        return (
          <section key={name}>
            <h2>{name}</h2>
            <div>
              {
                videos
                  .filter((video) => {
                    return video.title.toLowerCase().includes(searchInput.toLowerCase())
                  })
                  .map((video, index) => {
                    return (
                      <Link key={index} href={`/video?title=${video.title}&id=${video.url.split('v=')[1]}`}>
                        <img src={video.thumb} />
                        <span>
                          {video.title}
                        </span>
                      </Link>
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

function Favorites ({ favoriteUsers }) {
  return (
    <StyledFavorites>
      <section>
        <h2>AluraTubes favoritos</h2>
        <div>
          {favoriteUsers.map((user, index) => {
            return (
              <Link key={index} href={`https://www.youtube.com/@${user.name}`} target='_blank'>
                <img src={user.img} />
                <h4>
                  @{user.name}
                </h4>
              </Link>
            )
          })}
        </div>
      </section>
    </StyledFavorites>
  )
}

export default HomePage