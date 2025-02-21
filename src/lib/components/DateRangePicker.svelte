<script lang="ts">
	export let startDate: string = '';
	export let endDate: string = '';

	let touched = {
		start: false,
		end: false
	};

	// Get today's date in YYYY-MM-DD format
	const today = new Date().toISOString().split('T')[0];

	// Get date 1 year from now
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);
	const maxDateStr = maxDate.toISOString().split('T')[0];

	function formatDate(dateString: string): string {
		if (!dateString) return '';
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}

	function onStartDateChange(event: Event) {
		touched.start = true;
		const input = event.target as HTMLInputElement;
		startDate = input.value;

		// If end date is before new start date, clear it
		if (endDate && new Date(endDate) < new Date(startDate)) {
			endDate = '';
			touched.end = false;
		}
	}

	function onEndDateChange(event: Event) {
		touched.end = true;
		const input = event.target as HTMLInputElement;
		endDate = input.value;
	}
</script>

<div class="space-y-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- Start Date -->
		<div>
			<label for="startDate" class="mb-2 block text-sm font-medium text-gray-700">
				Start Date
			</label>
			<div class="relative">
				<input
					type="date"
					id="startDate"
					name="startDate"
					value={startDate}
					on:change={onStartDateChange}
					min={today}
					max={maxDateStr}
					required
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black"
				/>
				{#if startDate}
					<div class="absolute -bottom-6 left-0 text-sm text-gray-600">
						{formatDate(startDate)}
					</div>
				{/if}
			</div>
		</div>

		<!-- End Date -->
		<div>
			<label for="endDate" class="mb-2 block text-sm font-medium text-gray-700"> End Date </label>
			<div class="relative">
				<input
					type="date"
					id="endDate"
					name="endDate"
					value={endDate}
					on:change={onEndDateChange}
					min={startDate || today}
					max={maxDateStr}
					required
					disabled={!startDate}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:bg-gray-50"
				/>
				{#if endDate}
					<div class="absolute -bottom-6 left-0 text-sm text-gray-600">
						{formatDate(endDate)}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Helper text -->
	<div class="text-sm text-gray-600">
		{#if !startDate && !touched.start}
			Select a start date to begin
		{:else if !endDate && !touched.end}
			Now select an end date
		{:else if startDate && endDate}
			Selected range: {formatDate(startDate)} to {formatDate(endDate)}
		{/if}
	</div>
</div>
