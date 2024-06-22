<template>
  <div
    class="columns is-mobile is-gapless has-text-right p-1 pl-3 pr-3 m-0 is-clickable is-size-7 emi-border"
    :class="classVar"
    @click="isOpen = !isOpen"
  >
    <div class="column has-text-weight-bold has-text-left is-1">
      <Transition mode="out-in" appear>
        <div>{{ isOpen ? '-' : '+' }} {{ year }}</div>
      </Transition>
    </div>
    <div class="column">{{ formatingAmount(yearlyData.emiPrincipal) }}</div>
    <div class="column">{{ formatingAmount(yearlyData.emiInterest) }}</div>
    <div class="column">{{ formatingAmount(yearlyData.totalPayment) }}</div>
    <div class="column">{{ formatingAmount(yearlyData.principalOutstanding) }}</div>
    <div class="column">{{ yearlyData.percentage }} %</div>
  </div>
  <Transition name="slide-fade">
    <div
      class="box pr-1 pl-1 p-0 mb-2 mt-2"
      :class="{ 'has-background-grey-dark ': isDark }"
      v-if="isOpen"
    >
      <table
        class="table is-size-7 has-text-right is-fullwidth mb-1 is-hoverable"
        :class="{ 'has-background-grey-dark has-text-white': isDark }"
      >
        <tbody>
          <tr class="columns p-0 m-0 is-mobile" v-for="(item, index) in monthlyData" :key="index">
            <th
              class="column is-1 has-text-centered pl-0 pr-0"
              :class="{ 'has-text-white': isDark }"
            >
              {{ item.month }}
            </th>
            <td class="column pl-0 pr-0">{{ formatingAmount(item.emiPrincipal) }}</td>
            <td class="column pl-0 pr-0">{{ formatingAmount(item.emiInterest) }}</td>
            <td class="column pl-0 pr-0">{{ formatingAmount(item.totalPayment) }}</td>
            <td class="column pl-0 pr-0">{{ formatingAmount(item.principalOutstanding) }}</td>
            <td class="column pl-0 pr-0">{{ item.percentage }} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  </Transition>
</template>
<script setup>
import { ref, inject, computed } from 'vue'
const formatingAmount = inject('formatAmount')
const { isDark } = inject('isDark')

defineProps({
  year: {
    type: [Number, String]
  },
  yearlyData: {
    type: Object,
    default() {
      return {
        emiInterest: 0,
        emiPrincipal: 0,
        totalPayment: 0,
        principalOutstanding: 0
      }
    }
  },
  monthlyData: {
    type: Array,
    default() {
      return []
    }
  }
})
const isOpen = ref(false)
const classVar = computed(() => {
  if (!isOpen.value) {
    if (isDark.value) {
      return 'has-background-grey-dark has-text-white has-text-weight-bold emi-black-border'
    } else {
      return 'has-background-white'
    }
  } else {
    if (isDark.value) {
      return 'has-background-grey has-text-white emi-black-border'
    } else {
      return 'has-background-grey-dark has-text-white has-text-weight-bold'
    }
  }
})
</script>
