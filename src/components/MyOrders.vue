<template>
      <div class="ui message">
       <div class="header">
        Historia zamówień usług
       </div>
       <div class="content">
         Tu możesz zobaczyć jakie usługi zamówiłeś oraz kto jest ich wykonawcą.
       </div>
     </div>
       
       <div class="ui fluid card">
         
          <div class="ui top attached label">
            <i class="ui shop icon"></i>Moje zamówienia usług
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
