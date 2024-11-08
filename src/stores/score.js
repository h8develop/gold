import { defineStore } from 'pinia';

export const useScoreStore = defineStore('score', {
  state: () => ({
    score: parseInt(localStorage.getItem('score')) || 0,
    energy: parseInt(localStorage.getItem('energy')) || 1000,
    maxEnergy: 1000,
    taps: parseInt(localStorage.getItem('taps')) || 0,
    maxTaps: 1000,
    hourlyEarnings: 100,
    tapEarnings: 1,
    lastEnergyUpdate: parseInt(localStorage.getItem('lastEnergyUpdate')) || Date.now(),
  }),
  actions: {
    incrementScore() {
      if (this.energy > 0) {
        this.score += this.tapEarnings;
        this.energy -= 1;
        this.taps += 1;
        this.saveState();
      } else {
        alert("У вас закончилась энергия!");
      }
    },
    restoreEnergy() {
      this.energy = this.maxEnergy;
      this.saveState();
    },
    restoreEnergyOverTime() {
      const currentTime = Date.now();
      const timeDiff = currentTime - this.lastEnergyUpdate;
      const energyToRestore = Math.floor(timeDiff / (1000 * 60)); // Восстановление 1 единицы энергии каждую минуту

      if (energyToRestore > 0) {
        this.energy = Math.min(this.energy + energyToRestore, this.maxEnergy);
        this.lastEnergyUpdate = currentTime;
        this.saveState();
      }
    },
    saveState() {
      localStorage.setItem('score', this.score);
      localStorage.setItem('energy', this.energy);
      localStorage.setItem('taps', this.taps);
      localStorage.setItem('lastEnergyUpdate', this.lastEnergyUpdate);
    },
    loadState() {
      this.score = parseInt(localStorage.getItem('score')) || 0;
      this.energy = parseInt(localStorage.getItem('energy')) || this.maxEnergy;
      this.taps = parseInt(localStorage.getItem('taps')) || 0;
      this.lastEnergyUpdate = parseInt(localStorage.getItem('lastEnergyUpdate')) || Date.now();
      this.restoreEnergyOverTime();
    },
  },
});
