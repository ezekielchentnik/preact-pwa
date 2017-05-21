import { getUrl } from './../selectors/meta'

export const UPDATE_LOCATION = 'meta/UPDATE_LOCATION'

export const updateLocation = (newUrl) => (dispatch, getState) => {
  if (newUrl === getUrl(getState())) {
    return
  }
  dispatch({
    type: UPDATE_LOCATION,
    payload: {
      url: newUrl
    }
  })
}
