import ConfiguredSnackbarProvider from "./ConfiguredSnackbarProvider"
import ThemeProvider from "./ThemeProvider"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return [
    ConfiguredSnackbarProvider,
    ThemeProvider,
  ].reduce((provided, Provider) => {
    return <Provider>{provided}</Provider>
  }, children) as JSX.Element
}
