<template>
	<div id="app">
		<Modal v-if="currentAction">
			<template v-slot:header>
				{{ currentAction }}
			</template> 
			<template v-slot:body>
				<TargetPath />
			</template>
		</Modal>
		<CatalogTabs />
		<Actions />
	</div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>
