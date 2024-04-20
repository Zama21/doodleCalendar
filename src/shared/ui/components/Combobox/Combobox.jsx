import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

// const options = [
//     { value: 'apple', label: 'Apple' },
//     { value: 'banana', label: 'Banana' },
//     { value: 'cherry', label: 'Cherry' },
// ];

function formatCreateLabelCreator(value) {
    return `Создайте: ${value}`;
}

export default function Combobox({
    selectedOptions,
    setSelectedOptions,
    options,
}) {
    // const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = selected => {
        setSelectedOptions(selected);
    };

    return (
        <CreatableSelect
            options={options}
            isMulti
            value={selectedOptions}
            onChange={handleChange}
            placeholder='Выберите или создайте вариант'
            formatCreateLabel={value => formatCreateLabelCreator(value)}
        />
    );
}
