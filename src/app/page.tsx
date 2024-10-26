'use client';

import { UserdataContext } from '@/providers/Userdata';
import React, { useContext } from 'react';
import Tracker from './Tracker';
import Setup from './Setup';
import Loader from '@/components/Loader';

const Page: React.FC = () => {
	const { userdata } = useContext(UserdataContext);

	if (!userdata.loaded) {
		return (
			<div className='center h-full'>
				<Loader />
			</div>
		);
	}

	return userdata.completedSetup ? <Tracker /> : <Setup />;
};

export default Page;
