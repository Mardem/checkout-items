export const locale = {
  days: 'Domingo Segunda Terça Quarta Quinta Sexta Sábado'.split(' '),
  daysShort: 'Dom Seg Ter Qua Qui Sex Sáb'.split(' '),
  months: 'Janeiro Fevereiro Março Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro'.split(
    ' '
  ),
  monthsShort: 'Jan Fev Mar Abr Mai Jun Jul Ago Set Out Nov Dez'.split(' '),
  firstDayOfWeek: 0,

  urlDaysDev: 'http://localhost:8000/api/days',
  urlDayProd: 'https://vendas.cinemaspremier.com.br/api/days',

  urlValidateDayDev: 'http://localhost:8000/api/day',
  urlValidateDayProd: 'https://vendas.cinemaspremier.com.br/api/day'
};
