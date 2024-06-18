import { cloneDeep } from 'lodash'

export default function useResetStore({ store }) {
  console.log(store)
  console.log(store.$state)
  const initialState = cloneDeep(store.$state)
  store.$reset = () => {
    console.log(initialState)
    store.$patch(cloneDeep(initialState))
  }
}
