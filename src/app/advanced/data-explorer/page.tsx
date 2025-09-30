import { Landmark } from 'lucide-react';
import DatasetCard from './components/dataset-card';

const DataExplorer = () => {
	return (
		<div>
			<div className='text-lg text-center'>
				Here, you can get quick access to all of our data. You can explore and download all the datasets we have to
				offer. Select a dataset to get started!
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-32 mt-10'>
				<DatasetCard
					name='Countries'
					description='This dataset contains information about countries, including their currencies, country codes, region, and a lot more.'
					icon={Landmark}
					slug='countries'
				/>
			</div>
		</div>
	);
};

export default DataExplorer;
