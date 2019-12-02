<template>
	<div id="app">
		<header class="title">
			<h1>WebTComm</h1>
		</header>
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
