<template>
  <div>
    <q-card>
      <q-card-section class="q-pt-md">
        <q-table
          :title="title || 'Meus produtos selecionados'"
          :data="table.data"
          :columns="table.columns"
          row-key="name"
          no-data-label="Nenhum item encontrado"
          rows-per-page-label="Itens por página"
          :pagination="table.pagination"
        />
      </q-card-section>

      <q-card-actions v-if="showOk" align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script lang="ts">
import { LocalStorage } from 'quasar';
export default {
  props: {
    title: String,
    showOk: Boolean
  },
  setup() {
    const table = {
      columns: [
        { name: 'name', required: true, label: 'Nome', field: 'name' },
        { name: 'quantity', label: 'Quantidade', field: 'quantity' },
        {
          name: 'price',
          label: 'Val. Unitário',
          field: 'price',
          format: (val: any, row: any) =>
            val.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              style: 'currency',
              currency: 'BRL'
            })
        }
      ],
      data: LocalStorage.getItem('itemsCart'),
      pagination: {
        rowsPerPage: 20
      }
    };

    return { table };
  }
};
</script>
