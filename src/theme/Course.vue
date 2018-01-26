<template>
<div class="columns">
  <div class="container content has-text-centered">
    <i v-show="loading" class="fa fa-spinner fa-spin"></i>
    <p class="inline" v-show="loading">Kraunami duomenys</p>
  </div>
  <div class="column is-one-third" v-for="program in programs" v-bind:key="program.title">
    <div class="card">
      <div class="card-content">
      <label :for="program.title">{{program.title}}</label>
      <div>
        <div v-for="studyYear in program.studyYears" v-bind:key="studyYear.title">
          <label :for="studyYear.title">{{studyYear.title}}</label>
          <div class="inline" v-for="studyGroup in studyYear.studyGroups" v-bind:key="studyGroup.title">
          <router-link class="padding-left" :to="studyGroup.id" :for="studyGroup.title">{{studyGroup.title}}</router-link>
          </div>
        </div>
      </div>
     </div>
    </div>
  </div>
</div>
</template>
<script>
  import appService from '../app.service.js'
  export default {
    data () {
      return {
        loading: true,
        programs: []
        }
    },
    methods:{
      loadCourses: function(event){
        appService.getCourses().then(data => {
            this.loading = false
            this.programs = data
          })
      }
    },
    created () {
      this.loadCourses()
    }
  }
</script>
<style lang="scss">
@import '~bulma';

  .columns{
    flex-wrap: wrap
  }

  .inline{
    display: inline;
  }

  .padding-left{
    padding-left: 5px;
  }

</style>
