<script lang="ts">
	import { icons, type IconName } from '$lib/icons';

	interface Props {
		name: IconName;
		size?: number;
		/** Icons are decorative by default; pass a label to expose them to AT. */
		label?: string;
	}
	let { name, size = 24, label }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	role={label ? 'img' : 'presentation'}
	aria-label={label}
	aria-hidden={label ? undefined : 'true'}>
	{@html icons[name]}
</svg>
