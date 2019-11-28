import FilesList from './components/filesList/component.vue'

export default {
  name: 'app',
  components: {
    FilesList
  },
  data: function(){
	return {
		mess: [
			"Hello Vue!",
			"Hello Brouser"
		]
	}
  }
}
