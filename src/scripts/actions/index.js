export function setting(book) {
	// setting is an ActionCreator, it needs to return an action, an object with a type property
	// Payload is more information about the action that was just taken
	return {
		type: 'BOOK_SELECTED',
		payload: book
	};
}