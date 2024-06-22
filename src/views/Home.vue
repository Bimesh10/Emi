<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-12">
      <div class="tile is-parent">
        <article
          class="tile is-child notification"
          id="emi-datepicker"
          :class="{ 'has-background-grey-darker': isDark }"
        >
          <EMIForm v-model:emiDetails="emiDetails" ref="emiForm" />
        </article>
      </div>

      <div class="tile is-parent">
        <article
          class="tile is-child notification is-light p-1 is-3"
          :class="{ 'has-background-grey-darker': isDark }"
          v-if="showBox"
        >
          <EMITotal :monthlyEMIDetails="monthlyEMIDetails" :showBox="true" />
          <div class="column p-1">
            <div class="field">
              <div class="control">
                <label class="is-size-7 has-text-weight-semibold"
                  >Starting EMI Month and Year</label
                >
                <VueDatePicker v-model="emiDetails[4]" month-picker />
              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="radio ml-2">
                  <input type="radio" :value="true" v-model="emiDetails[5]" name="question" />
                  Calendar Year
                </label>
                <label class="radio">
                  <input type="radio" :value="false" v-model="emiDetails[5]" name="question" />
                  Fiscal Year
                </label>
              </div>
            </div>
          </div>
        </article>

        <article
          class="tile is-child notification is-light p-1"
          :class="{ 'is-12': !showBox, 'has-background-grey-darker has-text-white': isDark }"
        >
          <div
            class="columns is-mobile is-gapless has-text-right p-1 pl-3 pr-3 m-0 is-clickable is-size-7 emi-border has-text-weight-bold"
          >
            <div class="column has-text-centered is-1 is-flex" @click="showBox = !showBox">
              <Transition name="bounce" appear>
                <div class="burger-menu mt-1">
                  <div class="bar has-background-info"></div>
                  <div class="bar has-background-info"></div>
                  <div class="bar has-background-info"></div>
                </div>
              </Transition>
              <div class="ml-1">Year</div>
            </div>
            <div class="column">Principal</div>
            <div class="column">Interest</div>
            <div class="column">Total Payment</div>
            <div class="column">Balance</div>
            <div class="column">Paid %</div>
          </div>
          <EMITotal
            :monthlyEMIDetails="monthlyEMIDetails"
            v-if="!showBox"
            v-model:date="emiDetails[4]"
            v-model:isCalendar="emiDetails[5]"
            @updateDate="updateDate"
            :showBox="false"
          />
          <EMIList
            v-for="(item, index) in monthlyEMIDetails.eachYearMonth"
            :key="index"
            v-bind="item"
          />
        </article>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useEMICalcuation } from '@/helpers/useEMICalc.js'
import { ref, watch, inject } from 'vue'
import EMIForm from '@/components/EMI/EMIForm.vue'
import EMIList from '@/components/EMI/EMIList.vue'
import EMITotal from '@/components/EMI/EMITotal.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { isDark } = inject('isDark')
const query = route.query
const principal = query.p && query.p <= Math.pow(10, 7) ? query.p : 5000000
const interest = query.r && query.r <= 20 ? query.r : 9
const year = query.n && query.n <= 100 ? query.n : 20
const emiDetails = ref([principal, interest, year, 0, new Date(), true])
const emiForm = ref(null)
const monthlyEMIDetails = useEMICalcuation(emiDetails)

const showBox = ref(false)
watch(
  () => emiDetails.value[3],
  (oV, nV) => {
    if (oV == 0 && nV == 1) {
      emiDetails.value[2] = parseFloat(Number(emiDetails.value[2] / 12).toFixed(2))
    } else if (oV == 1 && nV == 0) {
      emiDetails.value[2] = Math.round(emiDetails.value[2] * 12)
    }
  }
)
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(2.25);
  }
  100% {
    transform: scale(1);
  }
}
.bar {
  width: 14px;
  height: 2px;
  margin: 1px;
}
</style>
