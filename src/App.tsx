import React, { useState } from 'react';
import splitTranslation from './splitTranslation';
import './App.css';
import vocabulary from './vocabulary.json';
import Counter from './Counter';
import DikiPhoneticImage from './DikiPhoneticImage';

function App() {
	const [vocabularyGroupNumber, setVocabularyGroupNumber] = useState(0);
	return (
		<div>
			<Counter max={vocabulary.length} onChange={setVocabularyGroupNumber}></Counter>
			{vocabulary[vocabularyGroupNumber].map((record, id) => {
				const translations = splitTranslation(record[1]);
				// const audio = new Audio(`http://diki.pl/images-common/en/mp3/${record[0].split(" ").at(-1)}.mp3`)
				return (
					<div key={id}>
						<div className="english-expression-container">
							<span>{record[0]}</span>
							<DikiPhoneticImage key={id + record[0]} expression={record[0]} />
						</div>
						<ul>
							{translations.map(({ translation, description }, elementId) => {
								return (
									<li key={elementId}>
										{translation} <span style={{ color: 'green' }}>{description}</span>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
}

export default App;
