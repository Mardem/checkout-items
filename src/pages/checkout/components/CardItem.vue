<template>
  <div>
    <div :class="
        state.selected ? 'custom-card custom-card-selected' : 'custom-card'
      ">
      <q-dialog
        v-model="state.terms"
        transition-show="flip-down"
      >
        <CardDialogContent
          :title="'Regras e condições sobre - ' + product.name"
          :description="product.rules"
        />
      </q-dialog>

      <div
        class="row"
        @click="terms"
      >
        <div class="col-12 text-center text-bold text-h6 title-item">
          <img
            :src="product.image"
            style="border-radius: 5px; margin-top: 5px;border: 2px solid white"
            width="150"
            alt=""
          ><br>
          {{ product.name }}
        </div>
        <div class="col-12 text-center item-description text-weight-bold">
          {{ priceFormatted }}
        </div>
        <div class="col-12">
          <p class="text-uppercase text-center text-caption item-description text-weight-medium">
            Regras e condições
          </p>
        </div>
      </div>
      <div
        class="row"
        v-if="state.displayShow"
      >
        <div
          class="col-12 text-center item-more text-white"
          style="font-size: 20px"
          @click="show"
        >
          <q-icon name="add" />
        </div>
      </div>

      <div
        class="row border-card"
        v-if="state.actionButtons"
      >
        <div
          class="col-4 text-center btns minus"
          style="font-size: 20px"
          @click="minus"
        >
          <q-icon name="remove" />
        </div>
        <div
          class="col-4 text-center btns text-weight-bold"
          style="font-size: 20px"
        >
          {{ state.items }}
        </div>
        <div
          class="col-4 text-center btns plus"
          style="font-size: 20px"
          @click="more"
        >
          <q-icon name="add" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../../../css/card-items';
</style>
<script lang="ts">
import { reactive, computed } from '@vue/composition-api';
import CardDialogContent from 'pages/checkout/components/CardDialogContent.vue';
import CartService from '../../../services/CartService';
import { LocalStorage } from 'quasar';

export default {
  props: {
    cart: Object,
    product: Object
  },
  components: {
    CardDialogContent
  },

  setup(props: any) {
    const c = new CartService();

    const priceFormatted = computed(() =>
      props.product.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
      })
    );

    const state = reactive({
      actionButtons: false,
      displayShow: true,
      terms: false,
      selected: false,
      items: 0
    });

    const terms = () => {
      state.terms = true;
    };

    const more = () => {
      state.items++;
      state.selected = true;
      props.cart.total = props.cart.total + props.product.price;
      LocalStorage.set('totalCart', props.cart.total);

      c.add(props.product, state.items);
    };

    const show = () => {
      if (state.actionButtons) {
        state.actionButtons = false;
      } else {
        state.actionButtons = true;
        state.displayShow = false;
        state.selected = true;
        more();
      }
    };

    const minus = () => {
      state.items--;
      props.cart.total = props.cart.total - props.product.price;
      c.updateItem(props.product, state.items);
      LocalStorage.set('totalCart', props.cart.total);

      if (state.items <= 0) {
        state.items = 0;
        props.cart.total = 0; // Reset the total to 0
        state.selected = false;
        LocalStorage.set('totalCart', 0);

        state.displayShow = true; // Show button add a item +
        state.actionButtons = false; // Hide actions + and -
      }
    };
    return { show, more, minus, state, terms, priceFormatted };
  }
};
</script>
