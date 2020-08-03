<template>
  <div>
    <div class="row justify-around bg-light-blue-9 q-pa-xs q-mb-md custom-bar items-center">
      <div class="col-md-4">
        <div class="row">
          <div class="col-12">
            <span
              class="text-white text-bold"
              style="font-size: 15px"
            >
              <q-icon name="calendar_today" />
              Data
            </span>
          </div>
          <div class="col-12">
            <span
              class="text-bold text-yellow"
              style="font-size: 20px"
            >{{
              state.date.local
            }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 text-right text-white">
        <div class="row">
          <div class="col-12">
            <span
              class="text-yellow text-bold"
              style="font-size: 15px"
            >
              <q-icon name="shopping_bag" />
              Total
            </span>
          </div>
          <div class="col-12">
            <span
              class="text-bold"
              style="font-size: 20px"
            >{{ total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from '@vue/composition-api';
import { LocalStorage } from 'quasar';
import moment from 'moment';
export default {
  props: {
    total: String,
    date: String
  },
  setup(props: any) {
    const state = reactive({
      date: {
        local: moment(
          LocalStorage.getItem('dateSelected'),
          'YYYY-MM-DD'
        ).format('DD/MM/YYYY')
      }
    });
    return { props, state };
  }
};
</script>
