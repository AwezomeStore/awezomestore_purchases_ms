const Car = require("../Models/Shoping_car")
const Product = require("../Models/Product");
const CarCtrl = {};

CarCtrl.addCar = async (req, res, next) => {
    try {
    const { id_User } = req.body;

    if (!id_User){
        throw "The required data is incomplete.";
    }
        
    const car = new Car(req.body);
    await car.save();

    return res.status(201).json(car);
    } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "Error creating  Shoping Car .", res , err
      });
    }
  }
};

CarCtrl.getCar = async (req, res, next) => {
  try {
    const {Id_User} = req.body;

    if (!Id_User)
      throw "The required data is incomplete";

    const car = await Car.find({id_User: Id_User});

    return res.status(200).json(car);
  } catch (err) {
    if (!err.message) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(400).json({
        message: "The  Shoping_car  does not exist",
      });
    }
  }
};

CarCtrl.addProductincar = async (req, res, next) => {
  try {
    const { Id, id_product, Value_product } = req.body;

    if (!Id || !id_product || !Value_product)
      throw "The required data is incomplete";

    var product = await Product.findById(id_product)
    console.log(product)
    var car1 = await Car.findById(Id)
    if (car1.Products.includes(id_product))
      return res.status(400).json({
        message: "You are already a Product of this Shoping car."
      })
    car1.Value = (Value_product * product.Amound) + car1.Value
    car1.Total_products = product.Amound + car1.Total_products
    car1.Products.push(id_product);
    await Car.findByIdAndUpdate(Id, car1);

    return res.status(200).json({
      message: "You have successfully joined the Shoping car."
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

CarCtrl.removeProductinCar = async (req, res, next) => {
  try {
    const { Id, Id_Product, Value_product } = req.body;

    if (!Id || !Id_Product)
      throw "The required data is incomplete";

    var product = await Product.findById(Id_Product)
    var car = await Car.findById(Id);
    console.log(car)
    var flag = 0
    for(var i in car.Products){
      if (Id_Product == car.Products[i].toString()){
        car.Products.splice(i, 1);
        flag = 1
        break
      }
    }
    if (flag == 0){
      return res.status(400).json({
        message: "The Product is not a exist of the Shoping_Car."
      })
    }
    car.Value = (Value_product * product.Amound) - car.Value
    car.Total_products = product.Amound - car.Total_products
    await Car.findByIdAndUpdate(Id, car);

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

CarCtrl.getCarall = async (req, res, next) => {
    try {
      const { id_Car  } = req.body;
  
      if (!id_Car)
        throw "The required data is incomplete";
  
      const car = await Car.findById(id_Car).populate("Products").populate("Coupons")
      return res.status(200).json(car);
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


module.exports = CarCtrl;