import React, { useEffect, useRef } from 'react';

import './App.css';

function componentDidMount(props) {
	document.body.classList.add('container');
}

function treatValue(value, index, headerList) {
	let newValue;
	
	if (value.trim().length === 0) {
		newValue = `''`;
	} else if (isNaN(value)) {
		if (['true', 'false', 'null'].includes(value.trim().toLowerCase())) {
			newValue = value;
		} else {
			newValue = `'${value}'`;
		}
	} else {
		newValue = value;
	}

	return `${newValue} -- ${headerList[index]}`;
}

function App(props) {

	const didMountRef = useRef(false);

	useEffect(() => {
		if (didMountRef.current) {
			// componentDidUpdate(props, prevProps);
		} else {
			didMountRef.current = true;
			componentDidMount(props);
		}
	});

	return <><textarea className='input' id='input' /><textarea className='output' id='output' /><input className='button' onClick={() => {
		const inputElement = document.getElementById('input');
		const input = inputElement.value.split('\n');

		const headerListString = input[0];
		const headerList = headerListString.split('\t');

		const valueListString = input[1];
		const valueList = valueListString.split('\t');

		const outputElement = document.getElementById('output');
		outputElement.value = `INSERT INTO * (\n${headerList.join('\n, ')}\n) VALUES (\n${valueList.map((value, index) => treatValue(value, index, headerList)).join('\n, ')}\n);`;
	}} type='button' value='generate' /></>;
}

export default App;
