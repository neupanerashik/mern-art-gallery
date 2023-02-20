class ApiFeatures {

  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(){
    if (this.queryStr.keyword) {
      const keyword = new RegExp(this.queryStr.keyword, 'i');
      this.query = this.query.find({ $or: [{ name: keyword }, { description: keyword }] });
    }

    if (this.queryStr.category) {
      const category = this.queryStr.category;
      this.query = this.query.find({ category });
    }

    return this;    
  }

// filter() {
//     const queryStringCopy = { ...this.queryStr };
//     const removeFields = ['keyword', 'page', 'sort', 'limit', 'fields'];
//     removeFields.forEach((element) => delete queryStringCopy[element]);

//     // filter for price
//     let queryStr = JSON.stringify(queryStringCopy);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

//     this.query = this.query.find(JSON.parse(queryStr));
//     return this;
// }

  sort() {
    if (this.queryStr.sortByPrice === 'priceHighToLow') {
      this.query = this.query.sort('-price');
    }

    if (this.queryStr.sortByPrice === 'priceLowToHigh') {
      this.query = this.query.sort('price');
    }

    return this;
  }

// paginate() {
//   const page = this.queryStr.page * 1 || 0;
//   const limit = this.queryStr.limit * 1 || 100;
//   this.query = this.query.skip(page*limit).limit(limit);
//   return this;
// }

  filterByPrice() {

    if (this.queryStr.minPrice && this.queryStr.maxPrice) {
      const minPrice = this.queryStr.minPrice * 1;
      const maxPrice = this.queryStr.maxPrice * 1;
      this.query = this.query.find({ price: { $gte: minPrice, $lte: maxPrice } });
    } else if (this.queryStr.minPrice) {
      const minPrice = this.queryStr.minPrice * 1;
      this.query = this.query.find({ price: { $gte: minPrice } });
    } else if (this.queryStr.maxPrice) {
      const maxPrice = this.queryStr.maxPrice * 1;
      this.query = this.query.find({ price: { $lte: maxPrice } });
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
}
  
export default ApiFeatures;  