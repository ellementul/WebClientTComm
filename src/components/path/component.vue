<template>
  <div class="container">
    <select>
      <option
        v-for="(disk, key) in disks" 
        v-bind:key="key"
        v-bind:value="key"

      >{{ key }}</option>
    </select>
    <div>{{ path }}</div>
  </div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
