<template>
  <div class="ui section"> 
                  
        <div class="extra content">  
             <i class="close icon"></i>Chcesz zamówić - to proste!
        </div>
          
        <div class="extra content">

              <div class="ui ordered fluid steps">

              <div class="step">
                <div class="content">
                  <div class="title">Wynierz opcje</div>
                  <div class="description">Zaproponuj datę, przekaż informacje kontaktowe</div>
                </div>
              </div>
              <div class="step">
                <div class="content">
                  <div class="title">Kliknij zamów</div>
                  <div class="description">Nie musisz się nawet rejestrować</div>
                </div>
              </div>
              <div class="step">
                <div class="content">
                  <div class="title">Gotowe!</div>
                  <div class="description">Ogłoszeniodawca się z tobą skontaktuje</div>
                </div>
              </div>
          </div>
  
        </div>
        
     </div>   
  
  </div>
  
</template>

<script>
import $ from 'jquery'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  ready: function () {
    $('.section .close').on('click', function () {
      $(this).closest('.section').transition('fade')
    })
  },
  events: {
  }
}
</script>
