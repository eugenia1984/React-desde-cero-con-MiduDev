export const NAVIGATION_EVENT = 'pushState'

export function navigate(href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(NAVIGATION_EVENT)
  window.dispatchEvent(navigationEvent)

}