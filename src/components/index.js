import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
