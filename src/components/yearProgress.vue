<template>
  <div class="progressbar">
    <progress :percent="dayPercent" activeColor="red" />
    <p>{{year}}年过了{{days}}天，{{dayPercent}}%</p>
  </div>
</template>
<script>
  export default{
    data(){},
    created() {

    },
    methods:{
      isLeapYear(year){
        if(year%400===0){
          return true
        }else if(year%4===0 && year%100!==0){
          return true
        }else{
          return false
        }
      },

    },
    computed:{
      year() {
        return new Date().getFullYear();
      },
      days() {
        
        let start= new Date()
        start.setMonth(0)
        start.setDate(1)
        let dayOffset=new Date().getTime() - start.getTime()

        return parseInt(dayOffset/1000/60/60/24)+1
      },

      dayPercent(){
        let year=new Date().getFullYear()
        let totalDays=this.isLeapYear(year) ? 366 : 365
        return (this.days/totalDays).toFixed(1)*100
      }
    }
  }
</script>
<style lang="scss">
.progressbar{
  margin:20rpx;
  progress{
    margin-bottom: 20rpx;
  }
}
</style>
