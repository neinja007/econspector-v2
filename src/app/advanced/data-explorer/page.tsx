import DatasetCard from './components/dataset-card';
import { datasets } from './data/datasets';

const DataExplorer = () => {
	return (
		<div>
			<div className='text-lg text-center'>
				Here, you can get quick access to all of our data. You can explore and download all the datasets we have to
				offer. Select a dataset to get started!
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-32 mt-10'>
				{datasets.map((dataset) => (
					<DatasetCard key={dataset.slug} {...dataset} />
				))}
			</div>
		</div>
	);
};

export default DataExplorer;
