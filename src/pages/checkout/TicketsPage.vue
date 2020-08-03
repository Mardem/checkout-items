<template>
  <q-page padding>

    <TileInfo
      :total="totalFormatted"
      :date="dateFormatted"
    />

    <TileActions
      back-to="/checkout/products"
      next-to="/checkout/payment"
      :back-button="true"
      :middle-button="true"
    />

    <div class="row justify-center">
      <div v-if="state.tickets.length >= 1">
        <div
          class="col-md-4 col-xs-12 q-pr-md q-pa-xs"
          v-for="ticket in state.tickets"
          :key="ticket.id"
        >
          <CardItem
            :cart="state.cart"
            :product="ticket"
          />
        </div>
      </div>
      <div v-else>
        <div class="col-4">
          <q-card
            class="text-white"
            style="background: radial-gradient(circle, rgb(255, 53, 53) 0%, rgb(136, 1, 1) 100%)"
          >
            <q-card-section>
              <div class="text-h6">Nenhum produto cadastrado</div>

            </q-card-section>

            <q-card-section class="q-pt-none">
              Ainda não há produtos cadastrado nessa seção
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts">
import CardItem from 'pages/checkout/components/CardItem.vue';
import TileInfo from 'pages/checkout/components/TileInfo.vue';
import TileActions from 'pages/checkout/components/TileActions.vue';
import { reactive, onMounted, computed } from '@vue/composition-api';
import { TicketsService } from '../../services/TicketsService';
import { Loading, QSpinnerGears, QSpinnerBall, LocalStorage } from 'quasar';
import moment from 'moment';

export default {
  components: {
    CardItem,
    TileInfo,
    TileActions
  },

  setup() {
    const state = reactive({
      tickets: [],
      cart: {
        total: 0
      }
    });

    const totalFormatted = computed(() =>
      state.cart.total.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
      })
    );

    onMounted(async () => {
      Loading.show({
        spinner: QSpinnerBall as any,
        message: 'Carregando os produtos'
      });
      const t = new TicketsService();
      state.tickets = (await t.fetch()) as any;
      state.cart.total = LocalStorage.getItem('totalCart') || 0;
      Loading.hide();
    });

    const dateFormatted = computed(() =>
      moment(LocalStorage.getItem('dateSelected') as number).format(
        'DD/MM/YYYY'
      )
    );

    return { state, totalFormatted, dateFormatted };
  }
};
</script>
