const express = require("express");
const router = express.Router();
const db = require("../data/db-config");

router.post('/', validateCar, (req, res) => {
    db("cars")
    .insert(req.body)
    .then(addedCar =>{
      res.status(201).json(addedCar);
    })
    .catch(error =>{
      res.status(500).json({message: "There was an error adding this car to the database"})
    })
  });

  router.get("/", (req, res) => {
    db("cars")
    .then(cars => res.status(200).json({data: cars}))
    .catch(err => console.log(err));
  })

  router.get('/:id', validateCarId, (req, res) => {
    res.status(200).json(req.car);
  });

function validateCar(req, res, next) {
    const newCar = req.body;
    if(Object.keys(newCar).length > 0) {
      if(newCar.vin) {
        if(newCar.make) {
            if(newCar.model) {
                if(newCar.mileage) {
                    next();
                } else {
                  res.status(400).json({ message: "The Car mileage is a required field" });
                }
            } else {
              res.status(400).json({ message: "The Car model is a required field" });
            }
        } else {
          res.status(400).json({ message: "The Car make is a required field" });
        }
      } else {
        res.status(400).json({ message: "The Car VIN is a required field" });
      }
    } else {
      res.status(400).json({ message: "We did not receive any new ar info" });
    }
  }

  function validateCarId(req, res, next) {
    const {id} = req.params;
    db("cars")
    .where({id})
    .first()
     .then(car =>{
      console.log("this is the car", car)
      if(car) {
        req.car = car;
        next();
      } else {
        res.status(400).json({ message: "invalid car id" });
      }
      
    })
    .catch(error =>{
      res.status(500).json({message: "There was an error retrieving that car"})
    })
  
  }

module.exports = router;