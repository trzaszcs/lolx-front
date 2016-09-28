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
       <form id="upload" style="display:none" enctype="multipart/form-data">
         <input type="file" name="file" id="fileInput"/>
         <input type="submit" value="Dodaj" name="submit"/>
       </form>
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
      $form: null,
      file: null,
      fileSelected: false,
      fileUploaded: false,
      loading: false,
      message: null
    }
  },
  methods: {
    add: function () {
      this.$fileInput.click()
    },
    upload: function () {
      const formData = new window.FormData(this.$form[0])
      this.loading = true
      $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        async: false,
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
    remove: function () {
      this.file = null
      this.fileSelected = false
      this.fileUploaded = false
      this.$dispatch('img-uploaded', null)
    }
  },
  ready: function () {
    this.$form = $('form#upload')
    this.$fileInput = this.$form.find('input[type=\'file\']')
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
