import { isJSON } from './common';
import { v4 as uuidv4 } from 'uuid';

const key = 'SessionId';
class AppCache { 
  get = () => {
    try {
      const data = localStorage.getItem(key);
      if (!isJSON(data)) {
        return this.set(key,uuidv4());
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
  }
  clear = (key) => { 
    key && localStorage.removeItem(key);
    !key && localStorage.clear();
  }
}
const useLocalStorage = new AppCache();

export default useLocalStorage;