<template>
  <q-page padding>
    <TileInfo :total="total" />
    <q-form ref="payment">
      <div class="row justify-around">
        <div class="col-sm-6 col-xs-12 q-gutter-sm">
          <b class="text-h5">Dados pessoais</b>
          <q-input
            label="Nome"
            :rules="[ val => val && val.length > 0 || 'Por favor, digite algo']"
            v-model="state.customer.name"
            lazy-rules
            filled
          />
          <q-input
            label="Sobrenome"
            :rules="[ val => val && val.length > 0 || 'Por favor, digite algo']"
            v-model="state.customer.lastname"
            filled
          />
          <q-input
            label="CPF"
            :rules="[ val => val && val.length > 0 || 'Por favor, digite algo']"
            mask="###.###.###-##"
            v-model="state.customer.document"
            filled
          />
          <div class="row q-col-gutter-sm q-mt-xs">
            <div class="col-sm-12 col-xs-12">
              <q-input
                label="E-mail"
                :rules="[ val => val && val.length > 0 || 'Por favor, digite algo']"
                type="email"
                v-model="state.customer.email"
                filled
              />
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xs-12">
          <Table />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-xs-12 text-left q-mt-md">
          <q-btn
            color="secondary"
            to="/checkout/tickets"
          >
            Voltar
          </q-btn>
        </div>
        <div class="col-md-6 col-xs-12 text-md-right q-mt-md">
          <q-btn
            color="primary"
            @click="validate()"
          >
            Ir para o pagamento
          </q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import TileInfo from 'pages/checkout/components/TileInfo.vue';
import Table from './components/TableProductsSelected.vue';
import { computed, reactive, ref } from '@vue/composition-api';
import { LocalStorage } from 'quasar';
import { ProductType } from '../../types/product';
import { paymentLinks } from 'src/configs/links';

export default {
  components: {
    TileInfo,
    Table
  },
  setup() {
    const state = reactive({
      customer: {
        name: '',
        lastname: '',
        document: '',
        email: ''
      }
    });

    const payment = ref({});

    const validate = async () => {
      const { validate } = payment.value as any;
      const success = await validate();
      if (success) {
        const items = LocalStorage.getItem('itemsCart') as Array<ProductType>;
        const newItems = items.map((x: ProductType) => {
          return {
            name: x.name,
            description: x.description,
            value: x.price,
            quantity: x.quantity,
            sku: ''
          };
        });
        LocalStorage.set('itemsFormatted', newItems);
        LocalStorage.set('customer', state.customer);
        const city = LocalStorage.getItem('citySelected');

        window.location.href =
          paymentLinks.urlPayment + `?city=${city.code}`;
      }
    };

    const total = computed(() =>
      (LocalStorage.getItem('totalCart') as number).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'BRL'
      })
    );

    return { total, state, validate, payment };
  }
};
</script>
