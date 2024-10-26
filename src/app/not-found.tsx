import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
	return (
		<div className='size-full center overflow-hidden'>
			<p className='absolute font-special font-bold text-lowlight-100 text-[42vw]'>404</p>
			<div className='text-2xl flex flex-col gap-3 text-center center'>
				<p>We could not find the page you are looking for.</p>
				<Link href='/' title='Home' className='link'>
					<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' className='size-6'>
						<path d='M592-417H189q-26 0-44.5-18.5T126-480q0-26 18.5-44.5T189-543h403L435-700q-19-19-19-45t19-45q19-18 45-18t45 19l264 264q9 9 14 21t5 24q0 12-5 24t-14 21L524-170q-19 19-44.5 19T435-170q-19-19-19-45t19-45l157-157Z' />
					</svg>
					Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
