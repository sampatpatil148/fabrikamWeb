import { v4 as uuidv4 } from 'uuid';

export const getUrlParameter = function getUrlParameter(sParam) {
	let url_string = window.location.href
	let url = new URL(url_string);
	let arg = url.searchParams.get(sParam);
	return arg === undefined ? false : arg;
};
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const getURlarg = (position) => {
	// eslint-disable-next-line no-restricted-globals
	let url = location.pathname.split('/').filter(i => i.trim() !== '');
	url = url.map((i) => decodeURIComponent(i));
	if (position === undefined) return url;
	if (url[position] !== undefined) {
		return url[position];
	}
	return false;
}

export const uqiSID=()=>{
	return uuidv4().replace(/[^a-zA-Z0-9]/g, '');
}

export const removeSpecials = (string)=>{
	if(string.includes("&")) {
		string = string.replace("&", "and");
	}
	return string.replace(/[^a-zA-Z0-9"]/g, ' ')
}
export const base64Encode = (text) => {
	return btoa(text);
};
export const base64Decode = (base64data) => {
	return atob(base64data);
};

export const isEmpty = (value) => {
	if (value === null || value=== undefined) { 
		return true;
	}
	if (typeof value === 'object' &&  value.constructor === Object) { 
		return Object.keys(value).length === 0;
	}
	if (typeof value === 'object' &&  value.constructor === Array) { 
		return value.length === 0;
	}
	if (typeof value === 'string' && value.trim() === '') { 
		return true;
	}
	return false;
}

export  const debounce =(func, timeout = 300)=>{
	let timer;
	return (...args) => {
	  clearTimeout(timer);
	  timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
}
export  const throttle =(func, delay)=>{
	let timeout = null
	return function(...args) {
	  if (!timeout) {
		timeout = setTimeout(() => {
		  func.call(this, ...args)
		  timeout = null
		}, delay)
	  }
	}
  }
export function capitalizeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const filterAzur = () => { 
	const filters = [];
	const categories = getURlarg();
	categories.shift();
	categories.length && categories.forEach((fieldname) => { 
		filters.push({
			field: "category1",
			value: capitalize(fieldname)
		})
	})
	return filters;
}

export const strToBool =( val ) => {
	return val;
    //return !!JSON.parse(String(val).toLowerCase());
}
export const filterArray = (data, keys, searchKey) => {
	
	return data.filter((item)=>{	
		return keys.find((key)=>{
			if (typeof item[key] === 'string') {
				return item[key].trim().toLowerCase().includes(searchKey.trim().toLowerCase());
			}
			else if (key !== 'category1' && Array.isArray(item[key])) {
				return item[key].find((i) => {
					return i.trim().toLowerCase().includes(searchKey.trim().toLowerCase());
				})
			} else { 
				return item[key] && item[key].find((i) => {
					return i.trim().toLowerCase() === searchKey.trim().toLowerCase();
				})
			}
			 
		})
	})
}
export  const isJSON = (str)=>{
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

export const objectToSingleArray = (object) => {
	const keyObject = Array.from(object, ([key, value]) => ({ key, value })).map((i) => {
		return i.value;
	});
	return [...new Set([].concat(...keyObject))];
}
