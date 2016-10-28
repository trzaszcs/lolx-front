<template>
       <div class="ui message">
           <div class="header">
            Lista Twoich sprzedanych usług
           </div>
          <div class="content">
            <p>
               Tu możesz sprawdzić na które ogłoszenia spłynęły zamówienia oraz dane zamawiających Twoje usługi. 
               </p>
               <p>
                 <b>Uwaga:</b> Aby zamówić usługę nie trzeba posiadać konta dorobie.pl - wtedy mamy tylko takie dane jak telefon czy email zamawiającego.
               </p>
             </div>
         </div>
     
       <div class="ui fluid card">
         
          <div class="ui top attached label">
             <i class="ui money icon"></i>Zamawiający Twoje usługi
          </div>

         <div class="content">
               
               <div class="ui fluid selection list" v-for="order in orders">
                <div class="ui item" v-link="{ path: '/order', query: { orderId: order.requestId }}">
                  <div class="left floated content">
                    <img class="ui tiny image" src="http://semantic-ui.com/images/wireframe/image.png">
                  </div>
                  <div class="content">
                      <a class="header">
                          {{order.title}} {{order.requestId}} 
                      </a>
                  </div> 
                  <div class="meta">
                          Preferowana data {{order.preferedDate}} {{order.preferedTime}} 
                  </div> 
                </div>
             </div>
          
        </div>
        
      </div>
     
</template>
<script>
export default {
  props: ['orders'],
  data () {
    return {
    }
  },
  methods: {
  },
  ready: function () {
  },
  events: {
  }
}
</script>
