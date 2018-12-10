import Vue from 'vue'
import index from '@/views/registry/index'

describe('registry.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(index)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
