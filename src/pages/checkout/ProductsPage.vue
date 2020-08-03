<template>
  <q-page padding>

    <TileInfo
      :total="totalFormatted"
      :date="dateFormatted"
    />

    <TileActions
      back-to="/"
      next-to="/checkout/tickets"
      :back-button="true"
      :middle-button="true"
    />

    <div
      class="row justify-center"
      v-if="state.products.length >= 1"
    >
      <div
        class="col-md-4 col-xs-12 q-pr-md q-pa-xs"
        v-for="product in state.products"
        :key="product.id"
      >
        <CardItem
          :cart="state.cart"
          :product="product"
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
  </q-page>
</template>

<script lang="ts">
import CardItem from 'pages/checkout/components/CardItem.vue';
import TileInfo from 'pages/checkout/components/TileInfo.vue';
import TileActions from 'pages/checkout/components/TileActions.vue';
import {
  reactive,
  onMounted,
  computed,
  onBeforeMount
} from '@vue/composition-api';
import { ProductsService } from '../../services/ProductsService';
import { Loading, QSpinnerGears, QSpinnerBall, LocalStorage } from 'quasar';
import moment from 'moment';

export default {
  components: {
    CardItem,
    TileInfo,
    TileActions
  },

  setup(props: any, { root }) {
    const state = reactive({
      products: [],
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
      const p = new ProductsService();
      state.products = (await p.fetch()) as any;
      state.cart.total = LocalStorage.getItem('totalCart') || 0;
      Loading.hide();
    });

    onBeforeMount(async () => {
      const p = new ProductsService();
      const disabledBomboniere = (await p.jumpStepProducts()) as any;
      if (disabledBomboniere) {
        root.$router.push('/checkout/tickets');
      }
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
