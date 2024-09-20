# Pulse Library

**Pulse Library** is a collection of custom React components and utility hooks designed to streamline the development
process for the Pulse Project. This library includes a set of pre-built form components, a logo loader, and custom hooks
to help you build responsive and efficient applications with ease.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Custom Components](#custom-components)
- [Custom Hooks](#custom-hooks)
- [Acknowledgements](#acknowledgements)

## Installation

To install the Pulse Library, use npm:

```bash
npm install @Qinastha/pulse_library@0.7.6
```

## Features

- **Form Components**: Includes a customizable form component with various input types like text, select, date input,
  image uploader, checklist, and a member search feature.
- **Logo Loader**: A loading spinner component designed to be used during page load.
- **Debounce Hook**: A hook for debouncing input values, ideal for optimizing search inputs or other frequently
  triggered events.
- **Resize Hook**: Provides the current viewport width and height, useful for responsive design.

## Usage

Here is a basic example of how to use the PulseForm component in your application:

```javascript
import React, {useState} from 'react';
import {PulseForm} from "@Qinastha/pulse_library";

const MyComponent = () => {
    const [inputValues, setInputValues] = useState({});

    const handleChange = (e) => {
        const {name, value} = event.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const requiredInputs = [
        {
            type: 'text',
            name: 'username',
            className: 'input-class',
            required: true,
            label: 'Username',
        },
        {
            type: 'select',
            name: 'role',
            className: 'select-class',
            required: true,
            label: 'Role',
            options: [
                {name: 'Admin', value: 'admin'},
                {name: 'User', value: 'user'},
            ],
        },
    ];

    return (
        <PulseForm
            requiredInputs={requiredInputs}
            inputValues={inputValues}
            formTitle="Create New User"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default MyComponent;
```

## Available Scripts

- **`build`**: Bundles the library for production using Rollup.
- **`watch`**: Watches the source files and rebuilds the library on changes.
- **`lint`**: Runs ESLint to check for code quality issues.
- **`test`**: Runs Jest to execute tests.
- **`prepare`**: Prepares the package for publishing by running the build script.

## Custom Components

- **PulseForm**: A versatile form component that simplifies form creation by taking a list of required inputs and
  rendering them automatically.
- **Form Inputs**: A collection of input components, including text input, select dropdown, date picker, image uploader,
  checklist, and a member search feature that searches across all registered users.
- **LogoLoader**: A customizable loading spinner that can be displayed while a page or section is loading.

## Custom Hooks

- **useDebounce**: A hook that delays the execution of a function until after a specified delay has passed since the
  last time it was invoked. Ideal for optimizing performance in search input fields.
- **useViewport**: A hook that provides the current viewport width and height, which is useful for responsive design and
  UI adjustments based on screen size.

## Acknowledgements

- **Rollup**: Used as the bundler for creating optimized builds of the library.
- **ECharts**: For powering the charting capabilities in the Pulse Project.