'use client'

import React, { useReducer } from 'react'
import { initialState } from './data'
import { reducer } from './reducer'
import actions from './actions'
import { Context } from './Context'
import { ShowMessageArgs } from '@/types/global-message'

interface ProviderProps {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const showMessage = (payload: ShowMessageArgs): void => {
    dispatch({ type: actions.SHOW_MESSAGE, payload })
  }

  const hideMessage = (): void => {
    dispatch({
      type: actions.HIDE_MESSAGE,
      payload: null
    })
  }

  return (
    <Context.Provider
      value={{
        state,
        showMessage,
        hideMessage
      }}
    >
      {children}
    </Context.Provider>
  )
}
