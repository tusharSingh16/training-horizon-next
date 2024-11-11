import React from 'react';

interface FilterSidebarProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedCategories, setSelectedCategories }) => {

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category) // Remove category if unchecked
        : [...prevCategories, category] // Add category if checked
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold">Categories</h2>
      <ul className="space-y-2">
        {['Education', 'Sports', 'Music', 'Other'].map((category) => (
          <li key={category}>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              <span>{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSidebar;
