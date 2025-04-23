import { useState, useEffect } from 'react'
import ProfileCard from './components/ProfileCard'
import SearchBar from './components/SearchBar'
import { GitHubUser } from './types/github'

function App() {
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
				throw new Error('Usuário não encontrado')
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
		<div className='min-h-screen bg-gray-100 p-6 flex items-center'>
			<div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 '>
				<h1 className='text-3xl font-bold text-gray-800'>Perfil</h1>
				<SearchBar
					onSearch={handleSearch}
					initialValue={username}
				/>

				{loading && <p className='text-center py-4'>Carregando...</p>}
				{error && <p className='text-red-500 text-center py-4'>{error}</p>}

				{userData && (
					<>
						<ProfileCard userData={userData} />

						<div className='border-t border-gray-200 my-6'></div>

						<div className='mb-6'>
							<h3 className='text-xl font-semibold text-gray-700 mb-4'>
								Perfil GitHub
							</h3>
							<div className='grid grid-cols-3 gap-4'>
								<div className='bg-gray-50 p-4 rounded-lg text-center'>
									<h4 className='text-sm font-medium text-gray-500'>
										Repositórios
									</h4>
									<p className='text-2xl font-bold text-gray-800'>
										{userData.public_repos}
									</p>
								</div>
								<div className='bg-gray-50 p-4 rounded-lg text-center'>
									<h4 className='text-sm font-medium text-gray-500'>
										Seguidores
									</h4>
									<p className='text-2xl font-bold text-gray-800'>
										{userData.followers}
									</p>
								</div>
								<div className='bg-gray-50 p-4 rounded-lg text-center'>
									<h4 className='text-sm font-medium text-gray-500'>
										Seguindo
									</h4>
									<p className='text-2xl font-bold text-gray-800'>
										{userData.following}
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default App
