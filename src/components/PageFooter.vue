<template>
    
  <div class="fbar ui vertical footer segment">
  
  <div class="ui center aligned container">
    
  <div class="ui section divider"></div>
  
    
  <div class="categories ui centered tiny images">
    <a
      v-for="cat in categories"
      v-link="categoryPath(cat.id)">
        <img :src="categoryImg(cat)" class="ui image"/>
    </a>
  </div>

    <div class="ui section divider"></div>

      <div class="ui stackable divided grid">
        <div class="three wide column">
          <h4 class="ui header">Wyszukaj</h4>
          <div class="ui link list">
            <a v-link="{ path: '/search' }" class="item">Strona wyszukiwania</a>
          </div>
        </div>
        <div class="three wide column">
          <h4 class="ui header">Ogłoszenia</h4>
          <div class="ui link list">
            <a v-link="{ path: '/addAnounce' }" class="item">Dodaj ogłoszenie</a>
            <a v-link="{ path: '/myAccount' }" class="item">Moje ogłoszenia</a>
            <a v-link="{ path: '/myAccount' }" class="item">Moje zamówienia</a>
            <a v-link="{ path: '/search' }" class="item">Szukaj ogłoszenia</a>
          </div>
        </div>
        <div class="three wide column">
          <h4 class="ui header">Moje konto</h4>
          <div class="ui link list">
            <a v-link="{ path: '/register' }" class="item">Załuż konto</a>
            <a v-link="{ path: '/myAccount' }" class="item">Dane publiczne</a>
            <a v-link="{ path: '/myAccount' }" class="item">Edytuj konto</a>
            <a v-link="{ path: '/resetPasswordRequest' }" class="item">Reset hasła</a>
          </div>
        </div>
        <div class="seven wide column">
          <h4 class="ui header">Dorobie.pl</h4>
          
          <p>Pozwalamy na znalezienie odpowiedniego dla Ciebie ogłoszenia mikro usługi - czyli rzeczy na którą nie masz czasu (np. sprzątanie, codzienne zakupy)
          i w której wyręczyć Ciebie mogą Ogłoszeniodawcy. Ty także możesz dodawać swoje ogłoszenia!</p>
          
          <div class="fb-like" v-bind:data-href="siteUrl" data-layout="button_count" data-action="recommend" data-show-faces="true" data-share="true"></div>

        </div>
      </div>
      <div class="ui section divider"></div>
      <img src="../assets/small-logo.png" class="ui small centered image">
      <div class="ui horizontal  small divided link list">
        <a class="item" v-link="{ path: '/sitemap' }">Mapa strony</a>
        <a class="item" v-link="{ path: '/contact' }">Kontakt</a>
        <a class="item" v-link="{ path: '/terms' }">Regulamin</a>
        <a class="item" v-link="{ path: '/privacy' }">Polityka prywatności</a>
      </div>
    </div>
  
  </div>
  
</template>

<script>
import sp from '../socialplugin'
import {categories} from '../const'

export default {
  data () {
    return {
      siteUrl: '',
      categories: categories
    }
  },
  methods: {
    categoryImg: function (cat) {
      return require(`../assets/categories/v3/${cat.img}`)
    },
    categoryPath: function (categoryId) {
      const query = { category: categoryId }
      if (this.$route.path.startsWith('/search')) {
        return { query: {...this.$route.query, category: categoryId}, replace: true }
      } else {
        return { path: '/search', query }
      }
    }
  },
  ready: function () {
    this.siteUrl = window.location.href
    sp.facebookInit(document, 'script', 'facebook-jssdk')
  }
}
</script>
