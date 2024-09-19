class ApiFeatures {

    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    // Searching Keywords 
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",   //case insensitive
            }
        }:{};
        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    // Filter
    filter(){
        const queryCopy = {...this.queryStr};
        // console.log("query copy",queryCopy)
        //Remove some filed for category
        const removeFields = ["keyword", "page", "limit"]

        removeFields.forEach((key)=>delete queryCopy[key])
        // console.log("query ",queryCopy);

        //Filter for price and reting
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //Pagination
    pagination(resultPerpage){
        const currentpage = Number(this.queryStr.page) || 1;

        
        const skip = resultPerpage * (currentpage - 1);
        // console.log("This :",skip);
        this.query = this.query.limit(resultPerpage).skip(skip);

        return this;
    }

} 

module.exports = ApiFeatures;