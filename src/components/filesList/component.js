import { mapState } from 'vuex';

export default {
  name: 'filesList',
  computed: mapState({
    files: state => state.catalogs[0].files,
  })

}