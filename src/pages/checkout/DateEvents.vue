@typescript-eslint/no-unnecessary-type-assertion
<template>
  <q-page padding>
    <TileInfo
      :total="totalFormatted"
      :date="state.date.local"
    />

    <div class="row justify-around">
      <div class="col-sm-6 col-xs-12">
        <q-select
          v-model="state.city"
          id="mySelect"
          :options="state.cities"
          :option-label="(item) => item === null ? 'Null value' : item.label"
          label="Selecione uma cidade"
          bg-color="light-blue-9"
          class=" custom-bar"
          :borderless="true"
          label-color="yellow text-weight-bold text-center"
          :popup-content-style="{backgroundColor: '#0060a1', textAlign: 'center', color: '#fff', fontSize: '15px', fontWeight: '600'}"
          filled
        >
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >

              <q-item-section>
                <q-item-label>
                  {{ scope.opt.label }}
                  <q-badge
                    v-if="scope.opt.code ==3"
                    color="orange"
                    text-color="black"
                    label="Drive-In"
                  />

                </q-item-label>
                <q-item-label caption>{{ scope.opt.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

        </q-select>

        <div class="q-gutter-md">
          <FullCalendar
            :date="state.date"
            :city="state.city"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<style lang="scss">
@import 'src/css/card-items';
#mySelect {
  color: #fff;
  font-weight: 700;
}
</style>
<script lang="ts">
import FullCalendar from 'pages/checkout/components/FullCalendarEvent.vue';
import { reactive, computed, watch, onBeforeMount } from '@vue/composition-api';
import TileInfo from 'pages/checkout/components/TileInfo.vue';
import { locale } from '../../configs/calendar';
import { LocalStorage } from 'quasar';
import moment from 'moment';

export default {
  components: {
    FullCalendar,
    TileInfo
  },
  setup() {
    onBeforeMount(() => {
      LocalStorage.clear();
      LocalStorage.set(
        'dateSelected',
        moment()
          .add(1, 'day')
          .format('YYYY-MM-DD')
      );
    });

    const state = reactive({
      city: {},
      cities: [
        { label: 'Formosa', value: 'formosa', code: 0 },
        { label: 'Barreiras', value: 'barreiras', code: 1 },
        { label: 'Luis Eduardo Magalhães', value: 'lem', code: 2 },
        { label: 'Vitória da Conquista', value: 'guanambi', code: 3 },
        { label: 'Sobradinho', value: 'sobradinho', code: 4 }
      ],
      date: {
        local: moment(
          LocalStorage.getItem('dateSelected'),
          'YYYY-MM-DD'
        ).format('DD/MM/YYYY')
      },
      locale
    });

    watch(
      () => state.city,
      city => {
        LocalStorage.set('citySelected', city);
      }
    );

    const totalFormatted = computed(() =>
      (LocalStorage.getItem('totalCart') || (0 as number)).toLocaleString(
        'pt-BR',
        {
          minimumFractionDigits: 2,
          style: 'currency',
          currency: 'BRL'
        }
      )
    );

    return { totalFormatted, state };
  }
};
</script>
