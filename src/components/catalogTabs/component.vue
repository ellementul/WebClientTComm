<template>
  <div class="tabs-container">
	<Catalog 
		v-for="(catalog, index) in catalogs" 
		v-bind:key="index" 
		v-bind:id-catalog="index"
	/>
  </div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
