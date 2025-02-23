import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export default function SearchableSelect({ isMultiple, onSearch, onChange, options, inputName, loading, getShowInfo, className = '', disabled = false }) {
  const [searchTerm, setSearchTerm] = useState(''); // User's search input
  const [selectedOptions, setSelectedOptions] = useState([]); // Currently selected option

  // Handle selecting an option
  const handleOptionClick = (option, e) => {
    e.preventDefault()
    console.log('option checked:', option)
    const optionValue = option
    let newOptions = optionValue
    if (isMultiple) {
      const duplicateIndex = selectedOptions.findIndex(op => op.id == optionValue.id)
      if (duplicateIndex == -1) {
        newOptions = [...selectedOptions, optionValue]
        setSelectedOptions(newOptions)
      } else {
        newOptions = [...selectedOptions.slice(0, duplicateIndex), ...selectedOptions.slice(duplicateIndex + 1)]
        setSelectedOptions(newOptions)
      }
    } else {
      if (selectedOptions.length == 1)
        setSelectedOptions([]);
      else
        setSelectedOptions([optionValue]);
    }
    setSearchTerm(''); // Reset search term after selection

    onChange(newOptions)
  };

  const onSearching = (e) => {
    setSearchTerm(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <div className={"dropdown " + className} disabled={disabled}>
      {/* Selected Option Display */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost m-1 indicator w-full"
        disabled={disabled}
      >
        {selectedOptions?.length && (selectedOptions.length > 1 ?
          (
            <div className="w-full">
              {getShowInfo(selectedOptions[0]).title}
              <span class="indicator-item indicator-middle indicator-end badge badge-info">+{selectedOptions.length-1}</span>
            </div>
          )
          : getShowInfo(selectedOptions[0]).title
        ) || 'Select an option'}
      </div>

      {/* Dropdown Menu */}
      <div className="dropdown-content menu bg-base-100 rounded-box z-1 w-full min-w-52 p-2 shadow-sm">
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
                  type="button"
                  onClick={(event) => handleOptionClick(option, event)}
                  className="p-2 hover:bg-base-200 cursor-pointer"
                >
                  {getShowInfo(option).title}
                  {selectedOptions.some(op => op.id == option.id) && <CheckIcon className="h-full text-accent" />}
                </button>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No options found</li>
          )}
        </ul>
      </div>

      {selectedOptions?.map(selectedOption => (
        <input type="hidden" key={"selected" + selectedOption.id} name={inputName + '[]'} value={getShowInfo(selectedOption).value} />
      ))}
    </div>
  );
}