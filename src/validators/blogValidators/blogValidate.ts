import joi from 'joi'

    const schema =  joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        body: joi.string().required()
    })


export const blogValidate = schema