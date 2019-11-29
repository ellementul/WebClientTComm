<template>
	<div class="catalog">
		<FullPath v-bind:id-catalog="idCatalog"/>
		<ul>
			<File 
				v-for="(file, index) in files" 
				v-bind:key="index"
				v-bind:file="file"
				v-on:open-file="openItem"
			/>
		</ul>
	</div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
