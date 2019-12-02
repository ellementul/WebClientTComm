<template>
		<ul class="files-container">
			<li 
				class="item"
				v-for="(file, index) in files" 
				:key="index"
				:index="index"
				:class="{ selected: isSelected(index) }"
				@dblclick="openItem(index)"
				@click="switchChange(index)">

				<File
					v-bind:file="file"
				/>
			</li>
		</ul>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
