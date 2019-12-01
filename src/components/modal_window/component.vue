<template>
	<div class="modal">
		<header class="modal-header">
			<slot name="header">
				This is the default tile!
			</slot>
		</header>
		<section class="modal-body">
			<slot name="body">
				I'm the default body!
			</slot>
		</section>
		<footer class="modal-footer">
			<slot name="footer">
				<button @click="makeAction">Ok</button>
				<button @click="close">Canel</button>
			</slot>
		</footer>
	</div>
</template>

<script src="./component.js"></script>
<style src="./component.css"></style>
