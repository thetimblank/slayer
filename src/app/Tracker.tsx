'use client';

import { UserdataContext } from '@/providers/Userdata';
import NumberFlow from '@number-flow/react';

import React, { useContext } from 'react';
import List from './List';
import Loader from '@/components/Loader';
import { HiTrash } from 'react-icons/hi';

const Tracker: React.FC = () => {
	const { userdata, wipeUserdata, addKill, removeKill } = useContext(UserdataContext);

	if (!userdata.loaded) {
		return <Loader />;
	}

	return (
		<div className='center h-full'>
			<button className='absolute top-0 right-0 m-10 icon' onClick={wipeUserdata}>
				<HiTrash />
			</button>
			<div className='text-center flex items-center flex-col gap-5'>
				<div>
					<p className='text-highlight-500'>You need to kill</p>
					<div className='text-8xl font-title font-black'>
						<NumberFlow
							trend
							value={Math.ceil((userdata.xpNeeded - userdata.xp) / userdata.xpPerKill)}
							locales='en-US'
						/>
					</div>
					<p className='text-highlight-500'>more revenants</p>
				</div>

				<div className='flex max-sm:flex-col gap-10 xl:gap-20'>
					<p className='text-3xl font-title font-black'>
						<span className='text-purple-600'>
							<NumberFlow trend value={userdata.xp} locales='en-US' />
						</span>
						/{userdata.xpNeeded} xp
					</p>

					{userdata.kills.length > 1 && (
						<p className='text-3xl font-title font-black'>
							<span className='text-purple-600'>
								<NumberFlow
									trend
									value={userdata.kills[userdata.kills.length - 1].pace}
									locales='en-US'
								/>
							</span>
							s Last Kill
						</p>
					)}

					{userdata.kills.length > 1 && userdata.averagePace && (
						<p className='text-3xl font-title font-black'>
							<span className='text-purple-600'>
								<NumberFlow trend value={userdata.averagePace} locales='en-US' />
							</span>
							s Average Kill
						</p>
					)}
				</div>

				<button
					className='button scale-150 mt-24'
					onClick={addKill}
					disabled={userdata.xp < 0 || userdata.xp >= userdata.xpNeeded}>
					Another One
				</button>
				<button className='link scale-125 mt-4' onClick={removeKill} disabled={userdata.xp <= 0}>
					Undo One
				</button>
				<List />
			</div>
		</div>
	);
};

export default Tracker;
