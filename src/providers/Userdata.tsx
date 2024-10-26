'use client';

import { createContext, useEffect, useState } from 'react';

export interface Kill {
	date: Date;
	pace: number;
}

interface Userdata {
	kills: Kill[];
	xp: number;
	xpPerKill: number;
	xpNeeded: number;
	averagePace: number | undefined;
	completedSetup: boolean;
	loaded: boolean;
}

interface C {
	addKill: () => void;
	removeKill: () => void;
	wipeUserdata: () => void;
	updateUserdata: (to: Partial<Userdata>) => void;
	userdata: Userdata;
}

interface P extends React.HTMLAttributes<HTMLBodyElement> {
	children: React.ReactNode;
}

const defaultUserdata = {
	averagePace: undefined,
	completedSetup: false,
	kills: [],
	xp: 0,
	xpPerKill: 0,
	xpNeeded: 0,
	loaded: false,
};

export const UserdataContext = createContext<C>({
	addKill: () => {},
	removeKill: () => {},
	wipeUserdata: () => {},
	updateUserdata: () => {},
	userdata: defaultUserdata,
});

export const UserdataProvider: React.FC<P> = ({ children }) => {
	const [userdata, setUserdata] = useState<Userdata>(defaultUserdata);

	const addKill = () => {
		if (!userdata.loaded) {
			return;
		}

		const time = new Date();
		let pace = 0;

		if (userdata.kills.length > 0) {
			pace = Number(
				(
					(time.getTime() - new Date(userdata.kills[userdata.kills.length - 1].date).getTime()) /
					1000
				).toPrecision(2)
			);
		}

		setUserdata({
			...userdata,
			kills: [
				...userdata.kills,
				{
					date: new Date(),
					pace: pace,
				},
			],
			xp: userdata.xp + userdata.xpPerKill,
		});
	};

	const removeKill = () => {
		if (!userdata.loaded) {
			return;
		}

		userdata.kills.pop();

		setUserdata({
			...userdata,
			xp: userdata.xp - userdata.xpPerKill,
		});
	};

	const caluclateAveragePace = () => {
		if (!userdata.averagePace) {
			userdata.averagePace = Number(
				(
					userdata.kills[userdata.kills.length - 1].pace - userdata.kills[userdata.kills.length - 2].pace
				).toPrecision(2)
			);
		}

		let avg = userdata.averagePace;

		userdata.kills.forEach((kill) => {
			avg += kill.pace;
		});

		return Number((avg /= userdata.kills.length).toPrecision(2));
	};

	const wipeUserdata = () => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.removeItem('userdata');

		setUserdata(defaultUserdata);
	};

	useEffect(() => {
		if (!userdata.loaded) {
			return;
		}

		if (userdata.kills.length < 2) {
			return;
		}

		const avg = caluclateAveragePace();

		setUserdata({ ...userdata, averagePace: avg });
	}, [userdata.kills]);

	const updateUserdata = (to: Partial<Userdata>): void => {
		setUserdata({ ...userdata, ...to });
	};

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (!userdata.loaded) {
			const storedUserdata = window.localStorage.getItem('userdata');

			if (!storedUserdata) {
				setUserdata({ ...defaultUserdata, loaded: true });
				console.log('Created userdata');
				return;
			}

			const loadedUserdata: Userdata = JSON.parse(storedUserdata);

			setUserdata({ ...loadedUserdata, loaded: true });
			console.log('Loaded userdata');
			return;
		}

		window.localStorage.setItem('userdata', JSON.stringify(userdata));
		console.log('Saved userdata');
	}, [userdata]);

	return (
		<UserdataContext.Provider value={{ addKill, updateUserdata, wipeUserdata, removeKill, userdata }}>
			{children}
		</UserdataContext.Provider>
	);
};
