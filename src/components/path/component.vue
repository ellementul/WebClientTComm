<template>
  <div class="navigation">
    <select class="disk" @change="setDisk">
      <option
        v-for="(disk, key) in disks" 
        :key="key"
        :value="key"
        :selected="selectedDisk == key"

      >{{ key }}</option>
    </select>
    <input class="path" :value="path" @input="changePath"/>
    <button class="escape-button" @click="escapeCatalog">↑</button>
  </div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
