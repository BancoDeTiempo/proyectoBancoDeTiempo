const Service = require("../models/Service.model");
const User = require("../models/User.model");

//! ---------------------------------------------------------------------
//? -------------------------------POST create --------------------------
//! ---------------------------------------------------------------------

const createService = async (req, res, next) => {
    try {
        await Service.syncIndexes();

        /** hacemos una instancia del modelo  */
        const customBody = {
            description: req.body?.description,
            tags: req.body?.tags,
            offerer: req.body?.offerer
        };
        const newService = new Service(customBody);
        const savedService = await newService.save();

        // test en el runtime
        return res
            .status(savedService ? 200 : 404)
            .json(savedService ? savedService : "error al crear el servicio");
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
                    await User.updateMany(//*------> actualizamos sus servicios favs o sus servicios?
                        { serviceFav: id },// todo: cambiar las variables del modelo de User
                        { $pull: { serviceFav: id } }
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
//? -------------------------------get by tag ---------------------------
//! ---------------------------------------------------------------------
const getByTag = async (req, res, next) => {
    try {
        const { tags } = req.params;
        const serviceByTag = await Service.findByTag(tags);
        if (serviceByTag) {
            return res.status(200).json(serviceByTag);
        } else {
            return res.status(404).json("no se ha encontrado el servicio");
        }
    } catch (error) {
        return res.status(404).json(error.message);
    }
};


module.exports = {
    createService,
    deleteService,
    getByTag
}