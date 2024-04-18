const Area = require("../models/Areas.model")

module.exports.areasController = {
    getAllAreas :async (req, res) => {
      
      res.json(await Area.find({}))
    },
    areasCreate : async (req, res) => {
        try {
            const area = await Area.create({
                ...req.body
            })
            res.json(area)
        } catch (e) {
            res.json(e)
        }
    },
    areasRemoveAdmin : async (req, res) => {
        const { areaId } = req.params
        try {
          const area = await Area.findByIdAndRemove(areaId)
          res.json('Район удалён!')
        } catch (e) {
           res.json(e) 
        }
    },
    areasUpdateAdmin : async (req, res) => {
        const { areaId } = req.params
        try {
          const area = await Area.findByIdAndUpdate(areaId, {
            ...req.body
        })
            res.json('Район изменён!')
        } catch (e) {
            res.json(e)
        }
    }
}