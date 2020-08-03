<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title || 'Teste'}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ description || '' }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="OK"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: String,
    description: String
  }
};
</script>