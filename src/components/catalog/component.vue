<template>
	<ul class="catalog">
		<File 
			v-for="(file, index) in files" 
			v-bind:key="index"
			v-bind:file="file"
		/>
	</ul>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
