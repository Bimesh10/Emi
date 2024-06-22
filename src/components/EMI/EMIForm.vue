<template>
  <div class="columns">
    <div class="column p-0 pt-2 pl-2 pr-2">
      <label class="label is-size-7">Principal Amount</label>

      <div class="field has-addons">
        <p class="control is-expanded">
          <input
            id="emidetails0"
            class="input is-small"
            type="number"
            :value="emiDetails[0]"
            @input="
              $emit(
                'update:emiDetails',
                updateValue(
                  !isNaN($event.target.value) && $event.target.value > Math.pow(10, 7)
                    ? Math.pow(10, 7)
                    : $event.target.value,
                  0
                )
              )
            "
            placeholder="Principal Amount"
          />
        </p>
        <p class="control">
          <a class="button is-static is-small is-clickable">
            <strong class="cs-addon-input">$</strong>
          </a>
        </p>
      </div>
    </div>
    <div class="column p-0 pt-2 pl-2 pr-2">
      <div class="field">
        <label class="label is-size-7"
          >Int. - ({{ emiDetails[1] }} %) -
          <small
            class="has-text-link is-underlined is-clickable"
            @click="showIntInput = !showIntInput"
            >{{ showIntInput ? 'Bar' : 'Custom' }}</small
          ></label
        >
        <div class="control">
          <input
            id="emidetails1"
            class="input is-small"
            type="number"
            v-if="showIntInput"
            :value="emiDetails[1]"
            @input="
              $emit(
                'update:emiDetails',
                updateValue(
                  !isNaN($event.target.value) && $event.target.value > 20
                    ? 20
                    : $event.target.value,
                  1
                )
              )
            "
            placeholder="Rate of Interest"
          />
          <template v-else>
            <input
              id="emidetails1"
              type="range"
              min="0"
              step="0.25"
              max="20"
              :value="emiDetails[1]"
              @input="$emit('update:emiDetails', updateValue($event.target.value, 1))"
              style="width: 100%"
            />
            <div class="is-flex is-justify-content-space-between is-size-7">
              <strong>0</strong>
              <strong>20</strong>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="column p-0 pt-2 pl-2 pr-2">
      <label class="label is-size-7"
        >No. of {{ emiDetails[3] == 0 ? 'Years (<= 100)' : 'Months (<=1200)' }}</label
      >
      <div class="field has-addons">
        <p class="control is-expanded">
          <input
            id="emidetails2"
            class="input is-small"
            type="number"
            :value="emiDetails[2]"
            @input="$emit('update:emiDetails', updateValue(updateData($event), 2))"
            :placeholder="`No. of ${emiDetails[3] == 0 ? 'years' : 'months'}`"
          />
        </p>
        <p class="control" @click="$emit('update:emiDetails', updateValue(0, 3))">
          <a
            class="button is-static is-small is-clickable"
            :class="emiDetails[3] === 0 ? 'has-background-info has-text-white' : 'is-static'"
          >
            <strong class="cs-addon-input">Yr</strong>
          </a>
        </p>
        <p class="control" @click="$emit('update:emiDetails', updateValue(1, 3))">
          <a
            class="button is-small is-clickable"
            :class="emiDetails[3] === 1 ? 'has-background-info has-text-white' : 'is-static'"
          >
            <strong class="cs-addon-input">Mo</strong>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps(['emiDetails'])
defineEmits(['update:emiDetails'])
const showIntInput = ref(false)
const updateValue = (val, key) => {
  return props.emiDetails.map((item, index) => (key == index ? val : item))
}
const updateData = (event) => {
  var value = event?.target.value

  if (props.emiDetails[3] == 0) {
    return !isNaN(value) && value <= 100 ? value : 100
  } else {
    return !isNaN(value) && value <= 1200 ? value : 1200
  }
}
</script>
