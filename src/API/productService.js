import axios from 'axios';
import productData from './json/product-data-v4.json';
import productSchema from './json/schema-v3.json';
import {useLocalStorage} from '../library/Storage';
import {uqiSID} from '../library/common'


const userKey = useLocalStorage.get('SessionId',uqiSID()).replace(/[^a-zA-Z0-9]/g, '');

const axiosAPI =  axios.create({
    baseURL: process.env.REACT_APP_domain,
    timeout: 500000,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});
let cancel;
const searchAPI = `${process.env.REACT_APP_searchAPI}`;
const suggestApi = `${process.env.REACT_APP_suggestApi}`;
const lookupApi = `${process.env.REACT_APP_lookupApi}`;
const MirApi = `${process.env.REACT_APP_MirApi}`;
const searchableID = 'MasterProductId'; //use for MIR only
const requireItem = 4;

class ProductService {
    searchItemsSource;
    CancelToken = axios.CancelToken;
    source = this.CancelToken.source();
    
    getProducts = async () => {
        return productData.value;
    }
    getSchema =  async () => {
        return productSchema.fields;
    }
    getMenu = async() => { 
        const data = await this.getProducts();
        const meunItem = new Map();
        let keyItem = undefined;
        let subMenu = [];
        let submenuItem = undefined;
        data.forEach((item) => {
            keyItem = item['category1'][1];
            submenuItem = item['category1'][2]||'';
            if (meunItem.has(keyItem)) {
                subMenu = meunItem.get(keyItem);
                !subMenu.find(i=>i.trim().toLowerCase() === submenuItem.trim().toLowerCase()) && subMenu.push(item['category1'][2]);
                meunItem.delete(keyItem);
                meunItem.set(keyItem, subMenu);
            } else {
                meunItem.set(keyItem, [ submenuItem ]);
            }
        })
        return Array.from(meunItem, ([key, value]) => ({ key, value }));
    }

    azurSearch = async (q, top, skip, filters, orderby,type) => { 
       this.source && this.source.cancel();
       this.source = axios.CancelToken.source();

        const pararmeter = {
            q: q,
            top: parseInt(top),
            skip: skip,
            filters: filters,
            sortby: orderby,
            queryType:q !== '*' ? 'semantic':'full',
            type:type
        }
       return await axiosAPI.post( searchAPI, pararmeter,{
        cancelToken: this.source.token
        })
        .then( response => {
            return response;
        } )
        .catch(error => {
            error.message && console.log(error);
        });
    }
    azurlookup = async (docId) => {
        const pararmeter = {
            params:{
                id: docId,
            }
        }
        return axiosAPI.get(lookupApi,pararmeter)
        .then(response => {
         return response && response.data && (response.data.document||[])
        })
        .catch(error => {
            error.message && console.log(error);
        });
    }
    azurSuggestion = async (q) => { 
        if (cancel !== undefined) {
            cancel();
        }
        const CancelToken = axios.CancelToken;
        const pararmeter = {
            params: {
                q: q,
            top: 5,
            suggester: process.env.REACT_APP_suggester
                   
            },
            cancelToken: new CancelToken(c => cancel = c)
        }

        return axiosAPI.get(suggestApi, pararmeter)
            .then( response => {
                return response.data;
            } )
            .catch(error => {
                error.message && console.log(error);
            });
    }
       
    getSliderValue = async (type,id) => { 
        const url = `${MirApi}?type=${type}${(userKey && type=='recent'||type=='recentP')?`&sessionId=${userKey}`:''}${id?`&searchID=${id}`:``}`;         
        const defaultSliderItems = process.env.REACT_APP_COMMON_PRODUCTS.split(',');
        let SliderItems = [];
        const apiResponse = await axiosAPI.get(url).catch(error => {
            console.log(error);
            return []
        });

        apiResponse && apiResponse.data && apiResponse.data.data && apiResponse.data.data.items.forEach((element) => { 
            if (this.checkProductExits(element.id)) { 
                SliderItems.push(element.id);
            }
        });
       
        //added default item exclude of recent
        /*if(type !== 'recent' && SliderItems.length < requireItem ){
            SliderItems = [...SliderItems,...defaultSliderItems ];
        }*/
       
        const productItems = this.getProductDetails([...new Set(SliderItems)]);
        return productItems.length > requireItem ? productItems:[];
    }

    getProductDetails = (Pids) => { 
        return productData.value.filter((product) => { 
            return  Pids.some((e) => {
                return e === product[`${searchableID}`]
            });
       });
    }
    checkProductExits = (Pid) => {
      return  productData.value.some((e) => {
            return e[`${searchableID}`].toString() === Pid.toString()
        });
    }
}
const ApiAxios = new ProductService();
export default ApiAxios;
