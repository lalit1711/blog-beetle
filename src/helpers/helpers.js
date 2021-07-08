export const deBouncingFunction = function (func, delay, cancel = false) {
	let timer;
	return function (...args) {
		const context = this;
		clearInterval(timer);
		if (cancel) return;
		timer = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
};
