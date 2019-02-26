import * as React from 'react'
import { act, cleanup, renderHook } from 'react-hooks-testing-library'

import useBeforeUnload from './index'

afterEach(cleanup)

test('Can use a string if given', () => {
  const addSpy = jest.spyOn(window, 'addEventListener')
  const removeSpy = jest.spyOn(window, 'removeEventListener')

  renderHook(() => useBeforeUnload('No, please do not close me!'))
  const addCall = addSpy.mock.calls.find(
    ([eventName, callback]) => eventName === 'beforeunload'
  )
  expect(addCall).toEqual(['beforeunload', expect.any(Function)])

  cleanup()

  const removeCall = removeSpy.mock.calls.find(
    ([eventName, callback]) => eventName === 'beforeunload'
  )
  expect(removeCall).toEqual(['beforeunload', expect.any(Function)])
})

test('Executes callback if given', () => {
  const addSpy = jest.spyOn(window, 'addEventListener')
  const cbSpy = jest.fn(() => 'No, please do not close me!')

  renderHook(() => useBeforeUnload(cbSpy))
  const addCall = addSpy.mock.calls.find(
    ([eventName, callback]) => eventName === 'beforeunload'
  )
  expect(addCall).toEqual(['beforeunload', expect.any(Function)])

  const beforeUnloadEvent = document.createEvent('Event')
  beforeUnloadEvent.initEvent('beforeunload', true, true)
  window.dispatchEvent(beforeUnloadEvent)

  expect(cbSpy).toHaveBeenCalled()
})
