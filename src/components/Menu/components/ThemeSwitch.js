import { useContext } from "react"
import styled from "styled-components"
import { ColorModeContext } from "./ColorModeProvider";

export const themes = {
  'light': {
    backgroundBase: "#F9F9F9",
    backgroundLevel1: "#FFFFFF",
    backgroundLevel2: "#F0F0F0",
    borderBase: "#E5E5E5",
    textColorBase: "#222222"
  },
  'dark': {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF"
  }
}

const StyledSwitch = styled.div`
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: ${({ theme }) => theme.backgroundLevel2};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${({ theme }) => theme.backgroundLevel2};;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`
export function ThemeSwitch () {
  const colorModeContext = useContext(ColorModeContext)

  return (
    <StyledSwitch>
      <label class="switch">
        <input type='checkbox' checked={colorModeContext.mode == 'dark'} onChange={(event) => {
          colorModeContext.toggleMode()
        }} />
        <span class="slider round"></span>
      </label>
    </StyledSwitch>
  )
}