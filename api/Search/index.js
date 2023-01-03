const { SearchClient, AzureKeyCredential } = require("@azure/search-documents");
const {Mirapi} = require('../Mir');

const indexName = process.env["SearchIndexName"];
const apiKey = process.env["SearchApiKey"];
const searchServiceName = process.env["SearchServiceName"];

// Create a SearchClient to send queries
const client = new SearchClient(
    `https://` + searchServiceName + `.search.windows.net/`,
    indexName,
    new AzureKeyCredential(apiKey),
    {
        apiVersion:process.env["SearchApiVersion"]
    }
);

// creates filters in odata syntax
const createFilterExpression = (filterList, facets, q) => {
    const fields = new Map();
    const catgoryKey = 'category1';
    let str = '';
    const firstCatgoryRequired = q.trim()==='*' ? true : false;
    let firstCatgory = undefined;
    filterList.forEach(obj => { 
        if (fields.has(obj.field)) { 
            let arr = fields.get(obj.field);
            fields.delete(obj.field);
            fields.set(obj.field, [
                ...arr,
                obj.value
            ])
        } else {
            fields.set(obj.field,[obj.value]) 
        }
    })
    let count = 1;

    if (firstCatgoryRequired) { 
        if (fields.has(catgoryKey)) { 
            firstCatgory = fields.get(catgoryKey).shift();
            fields.get(catgoryKey).length ===0 && fields.delete(catgoryKey)       
        } 
    }
    fields.forEach((value, key) => {
        str += '('   
        value.forEach((obj, index) => { 
            if (facets[key] === 'range') {
                let [min,max] = obj.split('-');
                str += ` ${key} ge ${min} and ${key} le ${max} `
            } else {
                str += ` search.ismatch('${obj}', '${key}','full','all') ${index !== (value.length - 1) ? ' or ' : ''} `
            }
        })
        str += ')' + `${ count === fields.size?'':' and '}`;  
        count = count + 1 
    });

    if (firstCatgoryRequired && firstCatgory) {
        str = ` search.ismatch('${firstCatgory}', '${catgoryKey}','full','all') ` + `${str.trim() ===''?'':` and (${str})`}`;
    }
    return str;
}


// reads in facets and gets type
// array facets should include a * at the end 
// this is used to properly create filters
const readFacets = (facetString) => {
    let facets = facetString.split(",");
    let output = {};
    facets.forEach(function (f) {
        if (f.indexOf('*') > -1) {
            output[f.replace('*', '')] = 'array';
        } else if (f.indexOf('-') > -1) {
            output[f.replace('-', '')] = 'range';
        }
        else {
            output[f] = 'string';
        }
    })

    return output;
}

async function newArrival(filters, facets){
   //remove first
    filters.shift();
    const sq = createFilterExpression(filters, facets,'new');
    const pids = await Mirapi('new',null);
    const searchIds = pids.items.map(e=>e.id).join('|');
    const query = `search.in(MasterProductId, '${searchIds}', '|') ${sq.trim() !== ''?` and ${sq}`:''}`;
    return query;
}

module.exports = async function (context, req) {

    //context.log(req);

    try {
        // Reading inputs from HTTP Request
        let q = (req.query.q || (req.body && req.body.q));
        const top = (req.query.top || (req.body && req.body.top));
        const skip = (req.query.skip || (req.body && req.body.skip));
        const sort = (req.query.skip || (req.body && req.body.sortby));
        const filters = (req.query.filters || (req.body && req.body.filters));
        const type = (req.query.type || (req.body && req.body.type));
        const facets = readFacets(process.env["SearchFacets"]);
        const queryLang = 'en-us';
        const speller = 'lexicon';
        const queryType = (req.query.queryType || (req.body && req.body.queryType));
        // If search term is empty, search everything
        if (!q || q === "") {
            q = "*";
        }

        // Creating SearchOptions for query
        let searchOptions = {
            top: top,
            skip: skip,
            includeTotalCount: true,
            facets: Object.keys(facets).map(e => `${e},count:1000`),
            filter: type.trim().toLowerCase() === 'new-arrival'? await newArrival(filters, facets):createFilterExpression(filters, facets,q),
            orderBy: sort,
            queryLanguage:queryLang,
            queryType: queryType,
            speller: speller,
            semanticFields:process.env["semanticFields"].split(',')
        };
        // Sending the search request
        const searchResults = await client.search(q, searchOptions);
        // Getting results for output
        const output = [];
        for await (const result of searchResults.results) {
            output.push(result);
        }
        // Creating the HTTP Response
        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: {
                "Content-type": "application/json"
            },
            body: {
                count: searchResults.count,
                results: output,
                facets: searchResults.facets
            }
        };
    } catch (error) {
        context.log.error(error);

        // Creating the HTTP Response
        context.res = {
            status: 400,
            body: {
                innerStatusCode: error.statusCode || error.code,
                error: error.details || error.message
            }
        };
    }

};
