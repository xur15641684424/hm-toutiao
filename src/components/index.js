import MyBread from '@/components/my-bread'
import MyTest from '@/components/my-test'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyTest.name, MyTest)
  }
}
