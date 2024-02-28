const Service = require("../models/Service.model");
const User = require("../models/User.model");

//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createService = async (req, res, next) => {
  try {
    const idAuth = req.user._id;
    await Service.syncIndexes();

    /** hacemos una instancia del modelo  */
    const customBody = {
      title: req.body?.title,
      description: req.body?.description,
      tag: req.body?.tag,
      offerer: req.user?._id,
      request: req.params.request,
    };

    const newService = new Service(customBody);
    const savedService = await newService.save();

    try {
      await User.findByIdAndUpdate(idAuth, {
        $push: { offeredServices: savedService._id },
      });

      return res
        .status(savedService ? 200 : 404)
        .json(savedService ? savedService : "error al crear el servicio");
    } catch (error) {
      try {
        await Service.findByIdAndDelete(savedService._id);
      } catch (error) {
        return res.status(404).json({
          error: "error al borrar service y no hemos actualizado el user ",
          message: error.message,
        });
      }
      return res.status(404).json({
        error: "error catch update User",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: "error catch create service",
      message: error.message,
    });
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------DELETE -------------------------------
//! ---------------------------------------------------------------------

const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (service) {
      // lo buscamos para vr si sigue existiendo o no
      const findByIdService = await Service.findById(id);

      try {
        const test = await Service.updateMany(
          { service: id },
          { $pull: { service: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            //*------> actualizamos sus servicios favs o sus servicios?
            { service: id }, // todo: cambiar las variables del modelo de User
            { $pull: { service: id } }
          );

          return res.status(findByIdService ? 404 : 200).json({
            deleteTest: findByIdService ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update servicio",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------get by id --------------------------
//! ---------------------------------------------------------------------
const getByIdService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const serviceById = await Service.findById(id);
    if (serviceById) {
      return res.status(200).json(ServiceById);
    } else {
      return res.status(404).json("no se ha encontrado el servicio");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------------------------------------------------------------------
//? -------------------------------UPDATE -------------------------------
//! ---------------------------------------------------------------------

const updateService = async (req, res, next) => {
  await Service.syncIndexes();

  try {
    const { id } = req.params;
    const serviceById = await Service.findById(id);
    if (serviceById) {
      const customBody = {
        _id: serviceById._id,

        title: req.body?.title ? req.body?.title : serviceById.title,
      };

      try {
        await Service.findByIdAndUpdate(id, customBody);

        //** ------------------------------------------------------------------- */
        //** VAMOS A TESTEAR EN TIEMPO REAL QUE ESTO SE HAYA HECHO CORRECTAMENTE */
        //** ------------------------------------------------------------------- */

        // ......> VAMOS A BUSCAR EL ELEMENTO ACTUALIZADO POR ID

        const serviceByIdUpdate = await Service.findById(id);

        // ......> uso el req.body y vamos a sacarle las claves para saber que elementos nos ha dicho de actualizar
        const elementUpdate = Object.keys(req.body);

        /** vamos a hacer un objeto vacio donde meteremos los test */

        let test = {};

        /** vamos a recorrer las claves del body y vamos a crear un objeto con los test */

        elementUpdate.forEach((item) => {
          if (req.body[item] == serviceByIdUpdate[item]) {
            test[item] = true;
          } else {
            test[item] = false;
          }
        });

        /** vamos a ver que no haya ningun false. Si hay un false lanzamos un 404,
         * si no hay ningun false entonces lanzamos un 200 porque todo esta correctoo
         */

        let acc = 0;
        for (clave in test) {
          test[clave] == false && acc++;
        }

        if (acc > 0) {
          return res.status(404).json({
            dataTest: test,
            update: false,
          });
        } else {
          return res.status(200).json({
            dataTest: test,
            update: true,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update",
          message: error.message,
        });
      }
    } else {
      return res.status(404).json("este servicio no existe");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

//!-------
//?GET ALL
//!-------

const getAll = async (req, res, next) => {
  try {
    const allServices = await Service.find();
    /** el find nos devuelve un array */
    if (allServices.length > 0) {
      return res.status(200).json(allServices);
    } else {
      return res.status(404).json("No services found");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  deleteService,
  getByIdService,
  updateService,
  getAll,
};
