export class Product {

    constructor(id, name, description, price, quantity)
    {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.quantity = quantity;
    }
  
    SetName(name) {
      this.name = name;  
    }

    SetDescription(description) {
        this.description = description;  
    }
  
    SetPrice(price) {
      this.price = price;
    }
  
    SetQuantity(quantity) {
      this.quantity = quantity;
    }
  
  }