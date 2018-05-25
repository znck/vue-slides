import Keynote from '@keynote/core'
import Theme from '@keynote/theme-default'

if (!('Vue' in window)) {
  console.log('You may want to add "<script src="//unpkg.com/vue"></script>" to the "<head>" section of the page.')
  throw Error('Cannot detect Vue on page.')
}

Vue.use(Keynote)
Keynote.use(Theme)

export default Keynote
