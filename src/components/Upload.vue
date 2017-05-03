<template>
   <div class="attachments">
     {{message}}

     <div v-if="!fileUploaded">
       <button v-show="!fileSelected" class="mini ui button" v-on:click="add($event)">Wybierz zdjęcie</button>
       <div v-show="fileSelected">
         Wybrano plik {{fileName}}
         <button v-on:click="upload($event)" class="mini ui button" v-bind:class="{'loading': loading}">Zapisz</button>
         <button v-on:click="cancel($event)" class="mini ui button">Anuluj</button>
       </div>
       <input type="file" name="file" id="fileInput" style="display:none"/>
     </div>

     <div v-else>
       Dodano plik {{fileName}}
       <button v-on:click="cancel($event)" class="mini ui button">Anuluj</button>
     </div>

   </div>
</template>

<script>
import $ from 'jquery'
import api from '../api'

export default {
  data () {
    return {
      $fileInput: null,
      fileName: null,
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
      api.uploadFile(formData, (returndata) => {
        this.$dispatch('img-uploaded', {'imgName': returndata.fileName})
        this.fileUploaded = true
        this.loading = false
      })
    },
    resetForm: function () {
      this.file = null
      this.fileName = null
      this.fileSelected = false
      this.fileUploaded = false
    },
    cancel: function (event) {
      event.preventDefault()
      this.resetForm()
      this.$dispatch('img-uploaded', null)
    }
  },
  ready: function () {
    this.$fileInput = $('input#fileInput')
    const imgExtensions = ['.jpg', '.png', '.bmp', '.gif']
    const extractExtension = (fileName) => {
      return fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase()
    }
    const extractFileName = (filePath) => {
      const lastIndexOfBackslash = filePath.lastIndexOf('\\')
      if (lastIndexOfBackslash > 0) {
        return filePath.substring(lastIndexOfBackslash + 1, filePath.length)
      } else {
        return filePath
      }
    }

    this.$fileInput.change((e) => {
      this.file = e.target.value
      this.fileName = extractFileName(this.file)
      console.log(this.fileName)
      const ext = extractExtension(this.fileName)
      if (imgExtensions.indexOf(ext) < 0) {
        this.message = `Plik ${this.fileName} nie jest obrazkiem`
      } else {
        this.fileSelected = true
      }
    })
  },
  events: {
    'clear': function (event) {
      this.resetForm()
    }
  }
}
</script>
