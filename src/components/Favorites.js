import styled from "styled-components"

export const StyledFavorites = styled.div`
  padding: 16px 32px;

  section > div {
    display: flex;
    text-align: center;
    gap: 16px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }

  a {
    width: 120px;
  }

  img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    margin-bottom: 8px;
  }

  h4 {
    font-size: 14px;
    font-weight: 100;
    color: black;
    word-wrap: break-word;
  }
`