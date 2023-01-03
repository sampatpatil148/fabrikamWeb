import { isJSON } from '../common';

class AppCache { 
  get = (key = 'SessionId',val) => {
    try {
      const data = localStorage.getItem(key);
      if (!isJSON(data)) {
        return this.set(key,val);
      }
      return JSON.parse(data);
    } catch(e) {
      console.log('not valid json');
      return false;
    }
  }
  set = (key, obj) => {
    try {
      localStorage.setItem(key,JSON.stringify(obj))
    } catch(e) {
      console.log(e,'not valid json for set object');
    
    }  
    return obj;
  }
  clear = (key) => { 
    key && localStorage.removeItem(key);
    !key && localStorage.clear();
  }
  reset = () => { 
    localStorage.clear();
  }

}
const useLocalStorage = new AppCache();

export default useLocalStorage;