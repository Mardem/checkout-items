import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/checkout/DateEvents.vue'),
        name: 'calendar'
      },
      {
        path: '/checkout/tickets',
        component: () => import('pages/checkout/TicketsPage.vue'),
        name: 'tickets'
      },
      {
        path: '/checkout/products',
        component: () => import('pages/checkout/ProductsPage.vue'),
        name: 'products'
      },
      {
        path: '/checkout/payment',
        component: () => import('pages/checkout/PaymentPage.vue'),
        name: 'payment'
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
