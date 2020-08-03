<template>
  <div>
    <q-dialog v-model="state.showList">
      <TableProducts :show-ok="true" />
    </q-dialog>

    <div class="row justify-around">
      <div
        class="col-4"
        v-show="backButton"
      >
        <q-btn
          class="q-mb-lg"
          color="primary"
          :to="backTo"
          rounded
          outline
        >
          <q-icon name="keyboard_arrow_left" />
          Página anterior
        </q-btn>
      </div>
      <div
        class="col-4 text-center"
        v-show="middleButton || false"
      >
        <q-btn
          class="q-mb-lg"
          color="primary"
          @click="showList"
          rounded
          outline
        >Ver itens selecionados</q-btn>
      </div>
      <div class="col-4 text-right">
        <q-btn
          class="q-mb-lg"
          color="primary"
          :to="nextTo"
          @click="clickNext || undefined"
          rounded
          outline
        >Próxima página
          <q-icon name="keyboard_arrow_right" />
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive } from '@vue/composition-api';
import TableProducts from 'pages/checkout/components/TableProductsSelected.vue';
export default {
  props: {
    nextTo: String,
    backTo: String,
    clickNext: Function,
    backButton: Boolean,
    middleButton: Boolean
  },
  components: {
    TableProducts
  },
  setup() {
    const state = reactive({
      showList: false
    });
    const showList = () => {
      state.showList = true;
    };

    return { state, showList };
  }
};
</script>
