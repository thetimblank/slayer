'use client';

import clsx from 'clsx';
import { createContext, useState } from 'react';

type RequireOnlyOne<T> = {
	[K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];

export namespace Sitemap {
	type BaseGroup = {
		title: string;
		description: string;
		icon?: React.ReactNode;
		exempt?: boolean;
	};

	export type Group = BaseGroup &
		RequireOnlyOne<{
			link?: string;
			callback?: () => void;
			sections?: {
				name: string;
				items: Item[];
			}[];
		}>;

	type BaseItem = {
		title: string;
		description: string;
		icon?: React.ReactNode;
		exempt?: boolean;
		open_in_new?: boolean;
	};

	export type Item = BaseItem &
		RequireOnlyOne<{
			link?: string;
			callback?: () => void;
		}>;
}

export interface Info {
	name: string;
	slogan: string;
	domain: string;
	logo_src: string;
	copyright?: string;
	sitemap: Sitemap.Group[];
	banner?: {
		text: string;
		url: string;
	};
	contact: {
		email?: string;
		phone?: string;
		hours?: string[];
		location?: {
			address: string;
			CSZ: string;
		};
	};
	socials?: {
		name: string;
		url: string;
		icon: React.ReactElement;
	}[];
	last_update: Date;
	analytics: {
		form_contacts: {
			date: Date;
			name: string;
			amount: number;
		}[];
	};
}

export const default_info: Info = {
	name: 'Naples Dental Care',
	slogan: 'Ultra Luxury Window Tinting, For Those Who Expect The BEST.',
	copyright: '©️ 2024 Naples Tint Company',
	logo_src: '/logo.jpg',
	banner: {
		text: 'Hello',
		url: '/test',
	},
	domain: 'https://www.naplestintfl.com',
	sitemap: [
		{
			title: 'Sitemap',
			description: 'A map to our site.',
			link: '/sitemap',
			exempt: true,
		},
		{
			title: 'Tinting',
			description: 'Our automotive tinting services.',
			sections: [
				{
					name: 'Automotive Tinting',
					items: [
						{
							title: 'Car Tinting',
							description: 'Car tints.',
							link: '/car-tinting',
						},
						{
							title: 'Tesla Tinting',
							description: 'Tesla tints.',
							link: '/car-tinting/tesla',
						},
					],
				},
				{
					name: 'Home Tinting',
					items: [
						{
							title: 'Home Window Tinting',
							description: 'Home Window tints.',
							link: '/home-tinting',
						},
						{
							title: 'Decorative Tinting',
							description: 'Home Decorative Window.',
							link: 'https://www.customglassfilm.com/',
							open_in_new: true,
						},
					],
				},
			],
		},
		{
			title: 'Contact',
			description: 'Reach us here.',
			sections: [
				{
					name: 'Contact Us',
					items: [
						{
							title: 'Contact',
							description: 'Our contacts.',
							link: '/contact',
						},
						{
							title: 'Blogs',
							description: 'New updates as blogs!',
							link: '/blogs',
						},
					],
				},
			],
		},
	],
	contact: {
		email: 'naplestint@gmail.com',
		phone: '239-397-2444',
		hours: ['Mon-Fri: 8am to 4pm', 'Sat: By Appointment', 'Sun: Closed'],
		location: {
			address: '1045 Collier Center Way #5',
			CSZ: 'Naples, FL, 34110',
		},
	},
	socials: [],
	last_update: new Date(2024, 9, 1),
	analytics: {
		form_contacts: [
			{
				date: new Date(2024, 7, 24),
				name: 'Quote',
				amount: 2,
			},
			{
				date: new Date(2024, 7, 25),
				name: 'Quote',
				amount: 0,
			},
			{
				date: new Date(2024, 7, 26),
				name: 'Quote',
				amount: 8,
			},
			{
				date: new Date(2024, 7, 27),
				name: 'Quote',
				amount: 6,
			},
			{
				date: new Date(2024, 7, 27),
				name: 'Contact',
				amount: 3,
			},
		],
	},
};

interface C {
	change_info: (to: Info) => void;
	set_scroll_locked: React.Dispatch<React.SetStateAction<boolean>>;
	info: Info;
}

interface P extends React.HTMLAttributes<HTMLBodyElement> {
	children: React.ReactNode;
	font: string;
	className?: string;
	locked?: boolean;
}

export const CostellarContext = createContext<C>({
	change_info: () => {},
	set_scroll_locked: () => {},
	info: default_info,
});

export const CostellarProvider: React.FC<P> = ({ children, className, locked = false, font, ...props }) => {
	const [info, setInfo] = useState<Info>(default_info);
	const [scroll_locked, set_scroll_locked] = useState(locked);

	const change_info = (to: Partial<Info>): void => {
		setInfo({ ...info, ...to });
	};

	return (
		<CostellarContext.Provider value={{ change_info, set_scroll_locked, info }}>
			<body className={clsx('dark', scroll_locked && 'scroll-locked', font, className)} {...props}>
				{children}
			</body>
		</CostellarContext.Provider>
	);
};
