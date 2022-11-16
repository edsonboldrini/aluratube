import { useState, createContext } from "react"

export const ColorModeContext = createContext({
  mode: '',
  setMode: () => { alert('Missing config setMode()') },
  toggleMode: () => { alert('Missing config toggleMode()') },
})

export default function ColorModeProvider (props) {
  const [mode, setMode] = useState(props.initialMode)

  function toggleMode () {
    if (mode === 'dark') setMode('light')
    if (mode === 'light') setMode('dark')
  }

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {props.children}
    </ColorModeContext.Provider >
  )
}