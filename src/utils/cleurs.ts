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

export const cleanUpParamsCodePostal = (params: Record<string, string>) => {
	if ('code' in params && params.code[params.code.length - 1] === '/') {
		params.code = params.code.slice(0, params.code.length - 1);
	}
	return params;
};

export const cleanUpParamsTerm= (params: Record<string, string>) => {
	if ('term' in params && params.term[params.term.length - 1] === '/') {
		params.term = params.term.slice(0, params.term.length - 1);
	}
	return params;
};