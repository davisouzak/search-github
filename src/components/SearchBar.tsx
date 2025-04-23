import { useState } from 'react'

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
			<div className='flex'>
				<input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Buscar usuário do GitHub...'
					className='flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-200'
				>
					Buscar
				</button>
			</div>
		</form>
	)
}

export default SearchBar
