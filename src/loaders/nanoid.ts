import { customAlphabet } from 'nanoid';

const customAlphabetString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoidInstance = customAlphabet(customAlphabetString, 10);

export default nanoidInstance;
