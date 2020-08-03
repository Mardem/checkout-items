<template>
  <div>
    <FullCalendar
      defaultView="dayGridMonth"
      locale="pt-br"
      themeSystem="bootstrap"
      @dateClick="select"
      :header="{
        left: 'prev,next',
        center: 'title',
        right: ''
      }"
      :plugins="state.calendarPlugins"
      :events="state.events"
    />
  </div>
</template>
<style lang="scss">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
.fc-bgevent {
  opacity: 1;
}
.fc-row .fc-highlight-skeleton td,
.fc-row .fc-bgevent-skeleton td {
  border: 1px solid #dddddd;
}
</style>
<script lang="ts">
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import DaysService from '../../../services/DaysService';
import { reactive, onMounted } from '@vue/composition-api';
import { LocalStorage } from 'quasar';
import moment from 'moment';
import Swal from 'sweetalert2';
import { locale } from '../../../configs/calendar';
const axios = require('axios').default;

export default {
  props: {
    date: Object,
    city: Object
  },
  components: {
    FullCalendar
  },
  setup(props: any, { root }) {
    const state = reactive({
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      events: []
    });

    /// Load all days
    const fetchDays = async () => {
      state.events = await new DaysService().fetch();
    };

    onMounted(async () => {
      await fetchDays();
    });

    const select = (val: any) => {
      LocalStorage.set('dateSelected', val.dateStr);
      const date = moment(val.dateStr, 'YYYY-MM-DD').format('DD/MM/YYYY');
      props.date.local = date;
      Swal.fire({
        title: 'Aviso',
        text: `Você realmente deseja selecionar o dia ${date}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then(async res => {
        if (res.value) {
          const r = await axios.post(locale.urlValidateDayProd, {
            date: val.dateStr
          });

          if (props.city != null) {
            if (r.data.length > 0) {
              root.$router.push({ name: 'products' });
            } else {
              Swal.fire({
                title: 'Aviso',
                icon: 'warning',
                text: 'Não há nenhum evento para o dia selecionado',
                confirmButtonText: 'OK'
              });
            }
          } else {
            Swal.fire({
              title: 'Aviso',
              icon: 'warning',
              text: 'Por favor, selecione a cidade',
              confirmButtonText: 'OK'
            });
          }
        }
      });
    };

    return { state, select };
  }
};
</script>
