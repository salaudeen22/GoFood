const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;

    // Check if data is an array before using splice
    if (!Array.isArray(data)) {
      data = []; // If not an array, initialize as an empty array
    }

    // Add a new object to the beginning of the array
    data.splice(0, 0, { order_data: req.body.order_data });

    let eID = await Order.findOne({ 'email': req.body.email });
    console.log(eID);

    if (!eID) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error: " + error.message);
  }
});

module.exports = router;
