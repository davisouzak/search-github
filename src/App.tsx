import { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import SearchBar from './components/SearchBar'
import { GitHubUser } from './types/github'
import githubLogo from '/assets/logoGithub/image1.png'
import camada from '/assets/camada/Camada.png'

export default function App() {
	const [username, setUsername] = useState<string>('')
	const [userData, setUserData] = useState<GitHubUser | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (username) {
			fetchUserData(username)
		}
	}, [username])

	const fetchUserData = async (username: string) => {
		setLoading(true)
		setError(null)
		try {
			const response = await fetch(`https://api.github.com/users/${username}`)
			if (!response.ok) {
				throw new Error(
					'Nenhum perfil foi encontrado com ese nome de usuário. Tente novamente'
				)
			}
			const data: GitHubUser = await response.json()
			setUserData(data)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Erro desconhecido')
			setUserData(null)
		} finally {
			setLoading(false)
		}
	}

	const handleSearch = (searchTerm: string) => {
		setUsername(searchTerm)
	}

	return (
		<div className='min-h-screen bg-neutral-800 p-6 flex items-center'>
			<div className='absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-600 rounded-full blur-3xl opacity-60'></div>
			<div className='absolute left-0 bottom-0 w-32 h-32 md:w-64 md:h-64 bg-blue-600 rounded-full blur-3xl opacity-50'></div>

			<div className='absolute top-0 right bg-neutral-800'>
				<img src={camada} alt="camada" />
			</div>
			<div className='w-full h-full max-w-2xl mx-auto bg-black rounded-lg shadow-md p-4 md:p-10 relative z-10 '>
				<div className='flex p-5 justify-center md:p-5'>
					<img
						src={githubLogo}
						alt='GitHub Logo'
						className='h-6 w-6 md:h-8 md:w-8'
					/>
					<h1 className='text-2xl md:text-3xl text-white px-1'>Perfil</h1>
					<h1 className='text-2xl md:text-3xl font-bold text-white px-1'>
						GitHub
					</h1>
				</div>
				<SearchBar
					onSearch={handleSearch}
					initialValue={username}
				/>

				{loading && (
					<p className='text-center py-4 text-white'>Carregando...</p>
				)}
				{error && (
					<p className='text-red-500 text-center py-4 bg-neutral-300 rounded-xl p-5 md:p-5 text-sm md:text-base'>
						{error}
					</p>
				)}
				{userData && (
					<div className='justify-center bg-neutral-300 rounded-xl p-3 md:p-5 w-full'>
						<ProfileCard userData={userData} />

						<div className='border-t border-gray-200 my-4 md:my-6'></div>

						<div className='mb-4 md:mb-6'>
							{' '}
							<h3 className='text-lg md:text-xl font-semibold text-gray-700 mb-3 md:mb-4'>
								{' '}
								Perfil GitHub
							</h3>
							<div className='grid grid-cols-3 gap-2 md:gap-4'>
								<div className='bg-gray-50 p-2 md:p-4 rounded-lg text-center'>
									<h4 className='text-xs md:text-sm font-medium text-gray-500'>
										{' '}
										Repositórios
									</h4>
									<p className='text-xl md:text-2xl font-bold text-gray-800'>
										{' '}
										{userData.public_repos}
									</p>
								</div>
								<div className='bg-gray-50 p-2 md:p-4 rounded-lg text-center'>
									<h4 className='text-xs md:text-sm font-medium text-gray-500'>
										Seguidores
									</h4>
									<p className='text-xl md:text-2xl font-bold text-gray-800'>
										{userData.followers}
									</p>
								</div>
								<div className='bg-gray-50 p-2 md:p-4 rounded-lg text-center'>
									<h4 className='text-xs md:text-sm font-medium text-gray-500'>
										Seguindo
									</h4>
									<p className='text-xl md:text-2xl font-bold text-gray-800'>
										{userData.following}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
