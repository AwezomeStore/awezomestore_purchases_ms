const Product = require("../Models/Product");

const ProductCtrl = {};

ProductCtrl.addProduct = async (req, res, next) => {
    try {
    const { id_product, Coupons2 } = req.body;

    if (!id_product)
        throw "The required data is incomplete.";

    const product = new Product(req.body);
    
    product.Coupons.push(Coupons2);
    
    await product.save();

    return res.status(201).json(product);
    } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "Error creating  product .", res , err
      });
    }
  }
};

ProductCtrl.getProduct = async (req, res, next) => {
  try {
    const { id_product1  } = req.body;

    if (!id_product1)
      throw "The required data is incomplete";

    const product = await Product.find({id_product: id_product1});

    return res.status(200).json(product);
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "The  product  does not exist",
      });
    }
  }
};

// ! improve grading method
ProductCtrl.updateProduct = async (req, res, next) => {
  try {
    const { id, Avalable1 , Amound1  } = req.body;

    if (!id){
        throw "The required data is incomplete";
    }

    var product = await Product.findById(id);
    console.log(product)
    product.Avalable = Avalable1
    product.Amound = Amound1
    console.log(product)
    await Product.findByIdAndUpdate(id , product);

    return res.status(200).json({
      message: "the Product has been successful."
    })
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "An error occurred while rating the route."
      });
    }
  }
};

ProductCtrl.addCouponinProduct = async (req, res, next) => {
  try {
    const { Id, Id_Coupon } = req.body;

    if (!Id || !Id_Coupon)
      throw "The required data is incomplete";

    var product = await Product.findById(Id);
    if (product.Coupons.includes(Id_Coupon))
      return res.status(400).json({
        message: "You are already a Coupon of this Product."
      })

    product.Coupons.push(Id_Coupon);
    await Product.findByIdAndUpdate(Id, product);

    return res.status(200).json({
      message: "You have successfully joined the Product."
    })
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "Path members update failed."
      });
    }
  }
};

ProductCtrl.removeCouponinProduct = async (req, res, next) => {
  try {
    const { Id, Id_Coupon } = req.body;

    if (!Id || !Id_Coupon)
      throw "The required data is incomplete";

    var product = await Product.findById(Id);
    var flag = 0
    for(var i in product.Coupons){
      if (Id_Coupon == product.Coupons[i].toString()){
        product.Coupons.splice(i, 1);
        flag = 1
        break
      }
    }
    if (flag == 0){
      return res.status(400).json({
        message: "The Product is not a exist of the Shoping_Car."
      })
    }

    await Product.findByIdAndUpdate(Id, product);

    return res.status(200).json({
      message: "The Coupon has been successfully removed from the Product."
    })
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "Path Product update failed."
      });
    }
  }
};

ProductCtrl.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id)
      throw "The required data is incomplete";

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product has been successfully removed"
    });
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "The Product does not exist",
      });
    }
  }
};

ProductCtrl.getProductall = async (req, res, next) => {
    try {
      const { id_product1  } = req.body;
  
      if (!id_product1)
        throw "The required data is incomplete";
  
      const product = await Product.find({id_product: id_product1}).populate("Coupons")
  
      return res.status(200).json(product);
    } catch (err) {
      if (!err.message) {
        return res.status(400).json({ message: err });
      } else {
        return res.status(400).json({
          message: "The  product  does not exist",
        });
      }
    }
  };


module.exports = ProductCtrl;