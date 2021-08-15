class Order {
  constructor(id, items, totalAmount, data) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.data = data;
  }
  get readabledate(){
    return this.data.toLocaleDateString('en-EN',{
      year:"numeric",
      month:'long',
      day:'numeric',
      hour:"2-digit",
      minute:"2-digit"
    })
  }
}

export default Order;
