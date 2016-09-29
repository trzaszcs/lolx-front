<template>
   <div class="attachments">
     {{message}}

     <div v-if="!fileUploaded">
       <button v-show="!fileSelected" class="mini ui button" v-on:click="add">Wybierz zdjęcie</button>
       <div v-show="fileSelected">
         Wybrano plik {{file}}
         <button v-on:click="upload" class="mini ui button" v-bind:class="{'loading': loading}">Zapisz</button>
         <button v-on:click="remove" class="mini ui button">Anuluj</button>
       </div>
       <input type="file" name="file" id="fileInput" style="display:none"/>
     </div>

     <div v-else>
       Dodano plik {{file}}
       <button v-on:click="remove" class="mini ui button">Anuluj</button>
     </div>

   </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      $fileInput: null,
      file: null,
      fileSelected: false,
      fileUploaded: false,
      loading: false,
      message: null
    }
  },
  methods: {
    add: function (e) {
      e.preventDefault()
      this.$fileInput.click()
    },
    upload: function (e) {
      e.preventDefault()
      let formData = new window.FormData()
      formData.append('file', this.$fileInput[0].files[0])
      this.loading = true
      $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: (returndata) => {
          console.log('file uploaded', returndata)
          this.$dispatch('img-uploaded', {'imgName': returndata.fileName})
          this.fileUploaded = true
          this.loading = false
        }
      })
    },
    remove: function (e) {
      e.preventDefault()
      this.file = null
      this.fileSelected = false
      this.fileUploaded = false
      this.$dispatch('img-uploaded', null)
    }
  },
  ready: function () {
    this.$fileInput = $('input#fileInput')
    const imgExtensions = ['.jpg', '.png', '.bmp', '.gif']
    const extractExtension = (fileName) => {
      return fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase()
    }

    this.$fileInput.change((e) => {
      this.file = e.target.value
      const ext = extractExtension(this.file)
      if (imgExtensions.indexOf(ext) <= 0) {
        this.message = 'Plik nie jest obrazkiem'
      } else {
        this.fileSelected = true
      }
    })
  },
  events: {
    'clear': function (event) {
      this.remove()
    }
  }
}
</script>
