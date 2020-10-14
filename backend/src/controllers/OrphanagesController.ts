import {Request, Response} from 'express'
import orphanagesView from "../views/orphanages_views"
import { getRepository } from 'typeorm'
import Orphanage from '../model/Orphanage'
import * as yup from 'yup'

export default {

    async show (request: Request, response: Response){
        const { id } = request.params
        
        const orphanagesRepository = getRepository(Orphanage);

        const  orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return  response.json(orphanagesView.render(orphanage))
    },

    async index (request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const  orphanages = await orphanagesRepository.find({

            relations: ['images']
        });

        return  response.json(orphanagesView.renderMany(orphanages))
    },

    async create (req: Request, res: Response) {
        const {
            name, 
            latitude, 
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends} = req.body;
    
        const orphanagesRepository = getRepository(Orphanage);
        
        const requestImages = req.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return {path: image.filename}
        })

        const data  = {
            name, 
            latitude, 
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images    
        }

        const schema = yup.object().shape({
            name: yup.string().required('Name obrigatório'), 
            latitude: yup.number().required(), 
            longitude: yup.number().required(),
            about: yup.string().required().max(300),
            instructions: yup.string().required(),
            opening_hours: yup.string().required(),
            open_on_weekends: yup.boolean().required(),
            images: yup.array(yup.object().shape({
                path: yup.string().required()
            }))  
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanagesRepository.create(data)
    
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    }
}