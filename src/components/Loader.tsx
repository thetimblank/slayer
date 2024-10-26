import clsx from 'clsx';
import React from 'react';

interface P extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
	styles?: {
		ring?: string;
		/**
		 * use tailwind border
		 * @example border-[5px]
		 */
		ring_width?: string;
		bar?: string;
		size?: string;
	};
}

const Loader: React.FC<P> = ({
	className,
	styles = {
		size: 'size-10',
		ring: 'fill-light-700',
		ring_width: 'border-[3px]',
		bar: 'text-lowlight-900 dark:text-highlight-900',
	},
	...props
}) => {
	return (
		<div
			className={clsx(
				'animate-spin inline-block border-current border-t-transparent rounded-full',
				styles.ring_width,
				styles.bar,
				styles.ring,
				styles.size,
				className
			)}
			role='status'
			aria-label='loading'
			{...props}>
			<span className='sr-only'>Loading...</span>
		</div>
	);
};

export default Loader;
