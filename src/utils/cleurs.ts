export const cleanUpParams = (params: Record<string, string>) => {
	if ('dui' in params && params.dui[params.dui.length - 1] === '/') {
		params.dui = params.dui.slice(0, params.dui.length - 1);
	}
	return params;
};