'use client';

import Loader from '@/components/Loader';
import { UserdataContext } from '@/providers/Userdata';
import React, { useContext } from 'react';

const List: React.FC = () => {
	const { userdata } = useContext(UserdataContext);

	if (!userdata.loaded) {
		return <Loader />;
	}

	return (
		<div className='flex flex-col gap-1 h-24'>
			{userdata.kills.length > 1 && (
				<>
					<div className='absolute bg-gradient-to-t from-light-500 dark:from-dark-500 to-transparent size-full z-10' />
					{userdata.kills
						.slice(-5)
						.reverse()
						.map((kill, i) => (
							<div key={i} className='flex gap-5'>
								<p className='text-highlight-500 font-bold italic'>KILL TOOK {kill.pace}s</p>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default List;
