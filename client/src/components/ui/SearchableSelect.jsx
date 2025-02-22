import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function SearchableSelect({ onSearch, onChange, options, inputName, loading, getShowInfo, className = '' }) {
  const [searchTerm, setSearchTerm] = useState(''); // User's search input
  const [selectedOption, setSelectedOption] = useState(''); // Currently selected option

  // Handle selecting an option
  const handleOptionClick = (option, e) => {
    e.preventDefault()
    console.log('option checked:', option)
    const optionValue = option
    setSelectedOption(optionValue);
    setSearchTerm(''); // Reset search term after selection

    onChange(optionValue)
  };

  const onSearching = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className={"dropdown " + className}>
      {/* Selected Option Display */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 w-full"
      >
        {getShowInfo(selectedOption).title || 'Select an option'}
      </div>

      {/* Dropdown Menu */}
      <div className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        {/* Search Input */}
        <label class="input">
          {loading ?
            <span className="loading loading-spinner text-info h-full"></span>
            :
            <MagnifyingGlassIcon className="h-full" />
          }
          <input type="search"
            class="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearching(e)}
            autoFocus
          />
        </label>

        {/* Options List */}
        <ul className="max-h-60 overflow-auto">
          {options.length ? (
            options.map((option, index) => (
              <li
                key={index}
              >
                <button
                  // type="button"
                  onClick={(event) => handleOptionClick(option,event)}
                  className="p-2 hover:bg-base-200 cursor-pointer"
                >
                  {getShowInfo(option).title}
                  {selectedOption.id == option.id && <CheckIcon className="h-full text-accent"/>}
                </button>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No options found</li>
          )}
        </ul>
      </div>

      <input type="hidden" name={inputName} value={getShowInfo(selectedOption).value} />
    </div>
  );
}