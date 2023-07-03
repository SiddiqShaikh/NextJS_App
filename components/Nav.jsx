'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropDown, setToggleDropDown] = useState(false);
	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/logo.svg'
					width={30}
					height={30}
					alt='Logo'
					className='object-contain'
				/>
				<p className='logo_text'>Prompt App</p>
			</Link>
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						<button type='button' onClick={signOut} className='outline_btn'>
							Sign Out
						</button>
						<Link href='/profile'>
							<Image
								src={session?.user?.image}
								className='rounded-full'
								width={37}
								height={37}
								alt='profile-icon'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									className='black_btn'
									key={provider.id}
									onClick={() => signIn(provider.id)}
								>
									SignIn
								</button>
							))}
					</>
				)}
			</div>
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user?.image}
							className='rounded-full'
							width={37}
							height={37}
							alt='profile-icon'
							onClick={() => setToggleDropDown((prev) => !prev)}
						/>
						{toggleDropDown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_item'
									onClick={() => setToggleDropDown(false)}
								>
									My profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_item'
									onClick={() => setToggleDropDown(false)}
								>
									Create New Prompt
								</Link>
								<button
									className='black_btn w-full mt-5'
									type='button'
									onClick={() => {
										setToggleDropDown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									className='black_btn'
									key={provider.id}
									onClick={() => signIn(provider.id)}
								></button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
