import React, { useState, useEffect, useRef } from 'react';

export default function ({
  inputName,
  options,
  onSearch,
  onChange,
  loading,
  getShowInfo,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
    setSearchQuery('');
  };

  const displayValue = selectedOption ? getShowInfo(selectedOption).title : '';

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <input
        type="hidden"
        name={inputName}
        value={selectedOption ? getShowInfo(selectedOption).value : ''}
      />

      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border rounded cursor-pointer"
          value={displayValue}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
          placeholder="Select..."
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          ▼
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full p-2 focus:outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              autoFocus
            />
          </div>

          <ul className="max-h-48 overflow-y-auto">
            {loading ? (
              <li className="p-2 text-gray-500">Loading...</li>
            ) : options.length === 0 ? (
              <li className="p-2 text-gray-500">No options found</li>
            ) : (
              options.map((option) => (
                <li key={getShowInfo(option).value}>
                  <button
                    type="button"
                    className="w-full p-2 text-left hover:bg-gray-100 focus:outline-none"
                    onClick={() => handleSelect(option)}
                  >
                    {getShowInfo(option).title}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}