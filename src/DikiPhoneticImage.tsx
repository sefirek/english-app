import React, { useEffect, useRef } from 'react';

interface DikiPhoneticImageProps {
	expression: string;
}

const BASE_URL =
	'https://etutor-images-common.s3.eu-central-1.amazonaws.com/en/transcriptions/';

export default function DikiPhoneticImage({
	expression
}: DikiPhoneticImageProps) {
	const imageRef = useRef<HTMLImageElement>();
	const words = expression.split(' ');
	const isSimpleWord = words.length === 1 || words.length === 2;

	useEffect(() => {
		if (imageRef?.current && isSimpleWord) {
			const word = words.at(-1);
			if (!word) return;
			const urlStrategy = createUrlStrategy(word);
			imageRef.current.onerror = () => {
				if (imageRef.current) {
					imageRef.current.src = urlStrategy();
				}
			};
			imageRef.current.src = urlStrategy();
		}
	}, [expression, isSimpleWord]);

	return (
		<img
			ref={imageRef as React.RefObject<HTMLImageElement>}
			alt={expression}
			hidden={!isSimpleWord}
		></img>
	);
}

function createUrlStrategy(word: string) {
	let testNumber = 0;
	return () => {
		let url = '';
		switch (testNumber) {
			case 0: {
				url = BASE_URL + word + '.png';
				break;
			}
			case 1: {
				url = BASE_URL + word + '-en-GB.png';
				break;
			}
			case 2: {
				url = BASE_URL + word + '-v.png';
				break;
			}
			case 3: {
				url = BASE_URL + word + '-v-en-GB.png';
				break;
			}
			default: {
				break;
			}
		}
		testNumber += 1;
		return url;
	};
}
