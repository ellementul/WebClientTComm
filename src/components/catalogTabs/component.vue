<template>
  <div class="tabs-container">
	<Catalog 
		v-for="catalog in catalogs" 
		v-bind:key="catalog.id" 
		v-bind:id-catalog="catalog.id"
	/>
  </div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
