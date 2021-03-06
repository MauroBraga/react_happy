import Image from '../model/Image'

export default {
    render(image: Image){
        return {
            id: image.id,
            url: `http://192.168.0.16:3333/uploads/${image.path}`,
        }
    },

    renderMany(images: Image[]){
        return images ? images.map(image => this.render(image)) :[]
    }

}