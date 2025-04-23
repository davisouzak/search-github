import { GitHubUser } from '../types/github'

interface ProfileCardProps {
	userData: GitHubUser
}

const ProfileCard = ({ userData }: ProfileCardProps) => {
	return (
		<div className='flex items-start space-x-4 mb-6'>
			<img
				src={userData.avatar_url}
				alt={`${userData.login}'s avatar`}
				className='w-24 h-24 rounded-full border-2 border-gray-200'
			/>
			<div>
				<h3 className='text-2xl font-bold text-gray-800'>
					{userData.name || userData.login}
				</h3>
				<p className='text-gray-600 mb-2'>
					{userData.bio || 'Sem biografia disponível'}
				</p>
				<p className='text-sm text-gray-500'>
					{userData.location || 'Localização não especificada'}
				</p>
				<a
					href={userData.html_url}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block'
				>
					Ver no GitHub
				</a>
			</div>
		</div>
	)
}

export default ProfileCard
