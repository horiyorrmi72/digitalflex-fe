import { api } from '@/lib/axios';

export const sendFormData = async (data) => {
	if (!data.message) {
		throw new Error('You need to add a message ');
	}
	if (data.message.length < 10) {
		throw new Error('Add a descriptive message, message too short');
	}
	const { name, email, message } = data;
	if (!email || !name || !message) {
		throw new Error(`Missing important parameter'(s)`);
	}
	const response = await api.post('/public/form-message', {
		name,
		email,
		message,
	});

	return response.data;
};
