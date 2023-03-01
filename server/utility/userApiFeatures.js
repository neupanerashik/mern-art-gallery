class UserApiFeatures {

    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search(){
      if (this.queryStr.keyword) {
        const keyword = new RegExp(this.queryStr.keyword, 'i');
        this.query = this.query.find({ $or: [{ name: keyword }, { role: keyword }, {email: keyword}]});
      }
  
      return this;    
    }
  }
    
  export default UserApiFeatures;  