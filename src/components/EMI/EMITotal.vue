<template>
  <Transition mode="out-in" appear v-if="showBox">
    <div class="column p-1">
      <div
        class="box is-family-monospace is-size-7 p-2"
        :class="{ 'has-background-grey-dark has-text-white': isDark }"
      >
        <div class="is-flex is-justify-content-space-between">
          <p>Principal</p>
          <p class="has-text-weight-bold">
            {{ formatingAmount(monthlyEMIDetails.principal) }}
          </p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p class="has-text-weight-light">EMI/Month</p>
          <p class="has-text-weight-bold">
            {{ formatingAmount(monthlyEMIDetails.emiAmount) }}
          </p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p>Tot Int</p>
          <p class="has-text-weight-bold">
            {{ formatingAmount(monthlyEMIDetails.totalInterest) }}
          </p>
        </div>
        <div class="is-flex is-justify-content-space-between">
          <p>Tot Pay</p>
          <p class="has-text-weight-bold">
            {{ formatingAmount(monthlyEMIDetails.totalPayment) }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="list" appear v-else>
    <div
      class="totalRow columns box is-mobile is-gapless has-background-white has-text-right p-1 pl-3 pr-3 m-0 is-clickable is-size-7 emi-border has-text-weight-bold"
      :class="{ 'has-background-black-ter has-text-success': isDark }"
    >
      <div class="column is-1 ml-1 has-text-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 100 100"
          class="datepickersvg"
        >
          <!-- Calendar Body -->
          <rect x="10" y="20" width="80" height="60" rx="5" ry="5" fill="#f0f0f0" />

          <!-- Calendar Header -->
          <rect x="10" y="20" width="80" height="10" rx="5" ry="5" fill="#0074d9" />
          <text x="50" y="28" font-size="10" text-anchor="middle" fill="#ffffff">Oct 2023</text>

          <!-- Calendar Dates -->
          <text x="20" y="65" font-size="16" fill="#333">1</text>
          <text x="30" y="65" font-size="16" fill="#333">2</text>
          <text x="40" y="65" font-size="16" fill="#333">3</text>
          <text x="50" y="65" font-size="16" fill="#333">4</text>
          <text x="60" y="65" font-size="16" fill="#333">5</text>
          <!-- Add more date text elements for the rest of the month -->
        </svg>
        <div class="datepicker"><VueDatePicker v-model="date" month-picker /></div>

        <div class="is-flex mt-1">
          <span
            class="tag is-small is-size-8"
            :class="{ 'is-info': isCalendar }"
            @click="isCalendar = true"
          >
            Calendar
          </span>
          <span
            class="tag is-small is-size-8"
            :class="{ 'is-info': !isCalendar }"
            @click="isCalendar = false"
          >
            Fiscal
          </span>
        </div>
      </div>
      <div class="column total-data">{{ formatingAmount(monthlyEMIDetails.principal || 0) }}</div>
      <div class="column total-data">
        {{ formatingAmount(monthlyEMIDetails.totalInterest || 0) }}
      </div>
      <div class="column total-data">
        {{ formatingAmount(monthlyEMIDetails.totalPayment || 0) }}
      </div>
      <div class="column total-data">{{ formatingAmount(0) }}</div>
      <div class="column total-data">100 %</div>
    </div>
  </Transition>
</template>
<script setup>
import { computed, inject } from 'vue'
const emit = defineEmits(['update:date', 'update:isCalendar'])
const props = defineProps(['monthlyEMIDetails', 'showBox', 'date', 'isCalendar'])
const date = computed({
  get() {
    return props.date
  },
  set(value) {
    emit('update:date', value)
  }
})

const isCalendar = computed({
  get() {
    return props.isCalendar
  },
  set(value) {
    emit('update:isCalendar', value)
  }
})
const formatingAmount = inject('formatAmount')
const { isDark } = inject('isDark')
</script>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.totalRow .dp__input_icon_pad {
  padding: 0px !important;
}
.totalRow .dp__input_wrap {
  opacity: 0 !important;
}
.datepicker {
  position: relative;
}
.datepickersvg {
  position: absolute;
}
.totalRow.columns.is-gapless > .total-data {
  padding-top: 20px !important;
}
</style>
