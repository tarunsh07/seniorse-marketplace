const Joi = require('joi') ;

module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(), 
        category: Joi.string().valid("Calculator", "Books", "Notes", "Electronics", "Apparel", "Others").required(),
        listingType: Joi.string().valid("For Sale", "For Rent (Per Day)", "Free").required(),
        isAvailable: Joi.boolean(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
        contact: Joi.object({
            email: Joi.string().email().required(),
            whatsapp: Joi.string().allow("", null)
        }).required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});