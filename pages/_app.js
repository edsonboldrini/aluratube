import { ThemeProvider } from "styled-components";
import { themes } from "../src/components/Menu/components/ThemeSwitch";
import { CSSReset } from "../src/components/CSSReset";
import { useContext } from "react";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorModeProvider";

function ProviderWrapper (props) {
  return (
    <ColorModeProvider initialMode={'dark'}>
      {props.children}
    </ColorModeProvider>
  )
}

function MyApp ({ Component, pageProps }) {
  const colorModeContext = useContext(ColorModeContext)

  return (
    <ThemeProvider theme={themes[colorModeContext.mode]}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default function _App (props) {
  return (
    <ProviderWrapper>
      <MyApp {...props} />
    </ProviderWrapper>
  )
}