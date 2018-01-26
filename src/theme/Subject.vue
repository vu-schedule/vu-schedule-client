<template>
  <div class="columns">
    <div class="container content has-text-centered">
      <i v-show="loading" class="fa fa-spinner fa-spin"></i>
      <p class="inline" v-show="loading">Kraunami duomenys</p>
    </div>
    <div class="column is-one-third" v-for="subject in subjects" v-bind:key="subject.title">
      <div class="card">
        <div class="card-content">
          <label :for="subject.title">{{subject.title}}</label>

          <div v-if="subject.subgroupsCount != null" v-for="n in subject.subgroupsCount" v-bind:key="n">

              <input type="checkbox" :id="subject.title+n" :name="subject.title" :value="{title:subject.title,subgroup:n}" v-model="checkedSubjects">
              <label :for="subject.title+n">Pogrupis {{n}}</label>
          </div>
          <div v-if="subject.subgroupsCount == null">

              <input type="checkbox" :id="subject.title" :name="subject.title" :value="{title:subject.title,subgroup:null}" v-model="checkedSubjects">
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <span>Pasirinkti kursai: {{ checkedSubjects.map(x => x.title + (x.subgroup == null ? "" : " (Pogrupis " + x.subgroup + ")")) }}</span>
    </div>
    <div v-show=!downloading class="container content has-text-centered">
      <a  v-on:click="getCalendar" class="button is-primary">Gauti kalendorių</a>
    </div>
    <div class="container content has-text-centered ">
      <i v-show="downloading" class="fa fa-spinner fa-spin"></i>
      <p class="inline" v-show="downloading">Generuojama</p>
    </div>
  </div>
</template>
<script>
  import appService from '../app.service.js'
  export default {
    data () {
      return {
        loading: true,
        downloading: false,
        checkedSubjects: [],
        subjects: []
        }
    },
    methods:{
      loadSubjects: function(event){
        appService.getSubjects(this.$route.params.id).then(data => {
            this.checkedSubjects = data.filter(x => x.isMandatory).map(x => {
              return {
                title: x.title,
                subgroup: x.subgroupsCount == null ? null : 1
              };
            })
            this.loading = false;
            this.subjects = data;
          })
      },
      getCalendar: function(event){
        this.downloading = true;

        appService.getCalendar(this.checkedSubjects, this.$route.params.id).then(data => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'VU-tvarkarastis.ics');
            document.body.appendChild(link);
            link.click();
            this.downloading = false;
          })
      }
    },
    created () {
      this.loadSubjects()
    }
  }
</script>
<style lang="scss">
@import '~bulma';

  .columns{
    flex-wrap: wrap
  }

</style>
