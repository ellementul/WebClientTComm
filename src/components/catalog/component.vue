<template>
	<div class="catalog" @click="setSource">
		<FullPath :id-catalog="idCatalog"/>
		<Files :id-catalog="idCatalog"/>
	</div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
