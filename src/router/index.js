import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TasksView from '../views/TasksView.vue';
import FriendsView from '../views/FriendsView.vue'; // Импорт FriendsView
import Shop from '../views/Shop.vue';

// Импорт компонентов для подмаршрутов
import DailyMissions from '../components/DailyMissions.vue';
import Boosts from '../components/Boosts.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
    children: [
      {
        path: 'Daily',
        name: 'daily',
        component: DailyMissions,
      },
      {
        path: 'Boost',
        name: 'boost',
        component: Boosts,
      },
    ],
  },
  {
    path: '/friends',
    name: 'friends',
    component: FriendsView, // Маршрут для FriendsView
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
