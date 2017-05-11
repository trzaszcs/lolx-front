<template>
   <div class="attachments">
     {{message}}

     <div v-if="uploading">
       <div class="ui active inline loader"></div> Dodawanie pliku {{fileName}} 
     </div>

     <div v-if="!uploading && !file">
       <button class="mini ui button" v-on:click="add($event)">Wybierz zdjęcie</button>
       <input type="file" name="file" id="fileInput" style="display:none"/>
     </div>

     <div v-if="!uploading && file">
       <img class="ui middle aligned tiny image" v-bind:src="imageThumbnail()"/>
       {{fileName}}
       <a v-on:click="cancel($event)">Usuń</a>
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
      uploadedFileId: null,
      message: null,
      uploading: false
    }
  },
  methods: {
    add: function (e) {
      e.preventDefault()
      this.$fileInput.click()
    },
    uploadSelectedFile: function () {
      let formData = new window.FormData()
      formData.append('file', this.$fileInput[0].files[0])
      this.uploading = true
      api.uploadFile(formData, (returndata) => {
        this.uploadedFileId = returndata.fileName
        this.$dispatch('img-uploaded', {'imgName': this.uploadedFileId})
        this.uploading = false
      })
    },
    resetForm: function () {
      this.file = null
      this.fileName = null
      this.uploadedFileId = null
      this.uploading = false
    },
    cancel: function (event) {
      event.preventDefault()
      this.resetForm()
      this.$dispatch('img-uploaded', null)
    },
    imageThumbnail: function () {
      const fileNameParts = this.uploadedFileId.split('.')
      return `/api/upload/${fileNameParts[0]}-SMALL.${fileNameParts[1]}`
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
      const ext = extractExtension(this.fileName)
      if (imgExtensions.indexOf(ext) < 0) {
        this.message = `Plik ${this.fileName} nie jest obrazkiem`
      } else {
        this.uploadSelectedFile()
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
