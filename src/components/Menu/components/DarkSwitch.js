import styled from "styled-components"


export function DarkSwitch ({ isDark, setIsDark }) {
  return (
    <input type='checkbox' value={isDark} onChange={(event) => setIsDark(event.target.checked)} />
  )
}