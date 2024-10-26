'use client';

import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserdataContext } from '@/providers/Userdata';

const Setup: React.FC = () => {
	const { updateUserdata } = useContext(UserdataContext);

	const schema = z.object({
		startingXP: z.coerce.number().positive(),
		xpPerKill: z.coerce.number().positive(),
		xpNeeded: z.coerce.number().positive(),
	});

	type FormValues = z.infer<typeof schema>;

	const {
		control,
		handleSubmit,
		formState: { isValid, errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		mode: 'onChange',
		defaultValues: {
			startingXP: 0,
			xpPerKill: 0,
			xpNeeded: 0,
		},
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);

		updateUserdata({
			xp: data.startingXP,
			xpPerKill: data.xpPerKill,
			xpNeeded: data.xpNeeded,
			completedSetup: true,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='h-full center'>
			<div className='w-[90%] md:w-1/2 xl:w-1/4 flex flex-col gap-2'>
				<h1 className='text-5xl font-black font-title mb-5'>Slayer Setup</h1>

				<div className='flex flex-col gap-2 mb-5'>
					<p className='text-xl'>XP per kill</p>
					<Controller
						name='xpPerKill'
						control={control}
						render={({ field }) => (
							<input {...field} type='number' className='input' placeholder='625' />
						)}
					/>
					{errors.xpPerKill && <p className='text-red-500'>{errors.xpPerKill.message}</p>}
				</div>

				<div className='flex items-center gap-5'>
					<div className='flex flex-col gap-2'>
						<p className='text-xl'>Starting XP</p>
						<Controller
							name='startingXP'
							control={control}
							render={({ field }) => (
								<input {...field} type='number' className='input' placeholder='32,545' />
							)}
						/>
						{errors.startingXP && <p className='text-red-500'>{errors.startingXP.message}</p>}
					</div>
					<p className='font-black text-7xl font-title'>/</p>
					<div className='flex flex-col gap-2'>
						<p className='text-xl'>XP Required</p>
						<Controller
							name='xpNeeded'
							control={control}
							render={({ field }) => (
								<input {...field} type='number' className='input' placeholder='100,000' />
							)}
						/>
						{errors.xpNeeded && <p className='text-red-500'>{errors.xpNeeded.message}</p>}
					</div>
				</div>
				<p className='text-highlight-500 font-xl mt-1 mb-5'>(Check in the slayer menu)</p>

				<button className='button mt-10' type='submit'>
					Calculate
				</button>
			</div>
		</form>
	);
};

export default Setup;
