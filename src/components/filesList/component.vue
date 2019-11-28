<template>
  <ul>
    <li v-for="(file, index) in files" v-bind:key="index">File: {{ file }}</li>
  </ul>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
