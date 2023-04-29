class ArtApiFeatures {

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

    if (this.queryStr.isAuctionItem) {
      const isAuctionItem = this.queryStr.isAuctionItem;
      this.query = this.query.find({ isAuctionItem });
    }

    return this;    
  }

  sort() {
    if (this.queryStr.sortByPrice === 'priceHighToLow') {
      this.query = this.query.sort('-price');
    }

    if (this.queryStr.sortByPrice === 'priceLowToHigh') {
      this.query = this.query.sort('price');
    }

    return this;
  }

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

}
  
export default ArtApiFeatures;  