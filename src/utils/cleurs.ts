export const cleanUpParams = (params: Record<string, string>) => {
	if ('dui' in params && params.dui[params.dui.length - 1] === '/') {
		params.dui = params.dui.slice(0, params.dui.length - 1);
	}
	return params;
};

export const cleanUpParamsID = (params: Record<string, string>) => {
	if ('id' in params && params.id[params.id.length - 1] === '/') {
		params.id = params.id.slice(0, params.id.length - 1);
	}
	return params;
};