import { useState } from 'react'
import iconSearch from '/assets/iconSearch/iconSearch.png'

interface SearchBarProps {
	onSearch: (searchTerm: string) => void
	initialValue: string
}

const SearchBar = ({ onSearch, initialValue }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState<string>(initialValue)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (searchTerm.trim()) {
			onSearch(searchTerm.trim())
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='mb-6'
		>
			<div className='flex font-bold bg-white rounded-lg'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Buscar usuário do GitHub...'
					className='flex-grow px-4 py-2 border-gray-300 rounded-lg outline-none'
				/>
					<button
						type='submit'
						className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 border-none outline-none rounded-lg transition duration-200'
					>
						<img
							src={iconSearch}
							alt='Search Icon'
							className='rounded-lg'
						/>
					</button>
			</div>
		</form>
	)
}

export default SearchBar
