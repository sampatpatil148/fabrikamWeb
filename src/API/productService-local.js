import axios from 'axios';
import productData from './json/product-data-v4.json';
import productSchema from './json/schema-v3.json';

const axiosAPI =  axios.create({
    baseURL: '/',
    timeout: 500000,
    crossDomain: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});
let cancel;
const searchAPI = '/api/search';
const suggestApi = '/api/suggest';

const getMIRURL = (type) => { 
    let url;
    switch (type) {
        case 'trending':
        case 'bestselling':
          url = `https://${process.env.REACT_APP_MIRDOMIN}/Reco/v1.0/bestselling?ClientType=ExternalTest&EnvironmentId=3a90e016-76bb-4ffa-0011-000000000500`;
          break;
        case 'new':
            url =  `https://${process.env.REACT_APP_MIRDOMIN}/Reco/v1.0/new?ClientType=ExternalTest&EnvironmentId=3a90e016-76bb-4ffa-0011-000000000500`;
            break;
        case 'relatedProduct':
            url = `https://${process.env.REACT_APP_MIRDOMIN}/Reco/v1.0/Similar/8N10XG0VK64C?ClientType=ExternalTest&EnvironmentId=3a90e016-76bb-4ffa-0011-000000000500`;
            break;
        case 'cart':
            url = `https://${process.env.REACT_APP_MIRDOMIN}/Reco/v1.0/Cart/Items?ClientType=ExternalTest&EnvironmentId=3a90e016-76bb-4ffa-0011-000000000500&SeedItemIds=8N10XG0VK64C,2C8VCW8GLN9VRF`;
            break;
        default:
            url = `https://${process.env.REACT_APP_MIRDOMIN}/Reco/v1.0/Cart/Items?ClientType=ExternalTest&EnvironmentId=3a90e016-76bb-4ffa-0011-000000000500&SeedItemIds=8N10XG0VK64C,2C8VCW8GLN9VRF`;
    }
    return url;
}
class ProductService {
    searchItemsSource;
    getProducts = async () => {
        return productData.value;
    }
    getSchema =  async () => {
        return productSchema;
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
    azurSearch = async (q, top, skip, filters, orderby) => {
        const data2 = []
        const body = {
            q: q,
            top: top,
            skip: skip,
            filters: filters,
            sortby: orderby
        };
        const data = await this.getProducts();
       
        for (let i = skip; i < Math.round(skip + top); i++) { 
            data2.push({
                document:data[i]
            })
        }
        
        return Promise.resolve({
            data: {
                results: data2,
                count: data.length,
                facets:{
                    "category1": [
                        {
                            "count": 39,
                            "value": "Fabrikam Fashion"
                        },
                        {
                            "count": 18,
                            "value": "Womenswear"
                        },
                        {
                            "count": 15,
                            "value": "Accessories"
                        },
                        {
                            "count": 7,
                            "value": "Shoes"
                        },
                        {
                            "count": 6,
                            "value": "Menswear"
                        },
                        {
                            "count": 5,
                            "value": "Handbags"
                        },
                        {
                            "count": 5,
                            "value": "Handbags & Wallets"
                        },
                        {
                            "count": 4,
                            "value": "Casual Shirts"
                        },
                        {
                            "count": 4,
                            "value": "Dresses"
                        },
                        {
                            "count": 3,
                            "value": "Jewelry"
                        }
                    ]
                    
                }
            }
        });

    }
    azurlookup = async (docId) => { 
        const data = await this.getProducts();
        return data.find(e =>e.productID === docId);  
    }
    azurSuggestion = async (q) => {
        const data2 = [];
        const data = await this.getProducts();
        for (let i = 0; i < 10; i++) { 
            data2.push({
                text: data[i].productName,
                document: {productID:data[i].productID },
            })
        }
        return Promise.resolve({ suggestions:data2 });
    } 
    getSliderValue = async (type,id) => { 
        //const url = `${MirApi}?type=${type}${`&sessionId=${userKey}`}${id?`&searchID=${id}`:``}`;         
        const defaultSliderItems = process.env.REACT_APP_COMMON_PRODUCTS.split(',');
        let SliderItems = [];
        //added default item
        if(type !== 'recent' && SliderItems.length < 5 ){
            SliderItems = [...SliderItems,...defaultSliderItems ];
        }
        const productItems = this.getProductDetails([...new Set(SliderItems)]);

        return productItems.length > 3 ? productItems:[];
    }
    getProductDetails = (Pids) => { 
        return productData.value.filter((product) => { 
            return  Pids.some((e) => {
                return e == product.MasterProductId
            });
       });
    }
    checkProductExits = (Pid) => {
      return  productData.value.some((e) => {
            return e.productID == Pid
        });
    }
    
}
const ApiAxios = new ProductService();
export default ApiAxios;
