<template>
  <div class="tasks-container">
    <h1>Задания</h1>
    
    <!-- Навигация по подмаршрутам -->
    <div class="tasks-tabs">
      <RouterLink
        :to="{ name: 'daily' }"
        class="tab"
        :class="{ active: $route.name === 'daily' }"
      >
        Daily missions
      </RouterLink>
      <RouterLink
        :to="{ name: 'boost' }"
        class="tab"
        :class="{ active: $route.name === 'boost' }"
      >
        Boost
      </RouterLink>
    </div>
    
    <!-- Рендеринг подмаршрутов -->
    <router-view></router-view>
  </div>
</template>

<style scoped>
.tasks-container {
  padding: 20px;
  color: #ffffff;
  text-align: center;
}

.tasks-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.tab {
  background-color: #2a292e;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.tab.active {
  background-color: #007bff;
}

.tab:hover {
  background-color: #0056b3;
}
</style>
