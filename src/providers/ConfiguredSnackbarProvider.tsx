'use client'

import { SnackbarProvider } from 'notistack'

export default class ConfiguredSnackbarProvider extends SnackbarProvider {
  static defaultProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    maxSnack: 5,
  }
}
