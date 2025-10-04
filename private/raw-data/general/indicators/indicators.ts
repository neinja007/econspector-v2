export const indicators = [
	{
		name: 'GDP',
		subindicators: [
			{
				name: '% growth',
				frequencies: [
					{
						frequency: 'Annual',
						sources: [
							{
								source: 'World Bank',
								unit: '%',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KD.ZG'
							}
						]
					}
				]
			},
			{
				name: 'constant 2015 US$',
				frequencies: [
					{
						frequency: 'Annual',
						sources: [
							{
								source: 'World Bank',
								unit: 'USD',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KD'
							}
						]
					}
				]
			},
			{
				name: 'constant LCU',
				frequencies: [
					{
						frequency: 'Annual',
						sources: [
							{
								source: 'World Bank',
								unit: 'LCU',
								worldBankIndicatorCode: 'NY.GDP.MKTP.KN'
							}
						]
					}
				]
			},
			{
				name: 'current US$',
				frequencies: [
					{
						frequency: 'Annual',
						sources: [
							{
								source: 'World Bank',
								unit: 'USD',
								worldBankIndicatorCode: 'NY.GDP.MKTP.CD'
							}
						]
					}
				]
			}
		]
	}
];
