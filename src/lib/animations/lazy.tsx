'use client';

import { LazyMotion } from 'framer-motion';

const Animations = ({ children }: { children: React.ReactNode }) => (
	<LazyMotion features={() => import('./features').then((res) => res.default)}>{children}</LazyMotion>
);

export default Animations;
