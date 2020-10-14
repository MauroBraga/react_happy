import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map,TileLayer, Marker, Popup} from 'react-leaflet'

import mapIcon from '../utils/mapIcon'
import mapMarkerImg from '../imagens/map-marker.svg'
import api from '../services/api'

import '../styles/pages/orphanage-map.css'

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    about: string,
    instructions: string,
    opening_hours: string,
    open_on_weekends: boolean,
    images: string  
}


function OrphanagesMap(){


    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    
    useEffect(() =>{
        api.get('orphanages').then(resp =>{
            console.log(resp.data)
            setOrphanages(resp.data);
        })
    },[])



    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muias crianças estão esperando a sua vida :)</p>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span> Rio de  Janeiro</span>
                </footer>

            </aside>

            <Map 
                center={[-22.9376882,-43.339121]} 
                zoom={12}
                style={{width:'100%', height:'100%'}}
            >
                {/*<TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                 
                <TileLayer  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> 
                
                {orphanages.map(orphanage => {
                    return (
                        <Marker key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}>
                            <Popup closeButton={false} minWidth={240} maxWidth={40}
                                className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>    

                        </Marker>
                        
                    )
                })}
                
                
                
                             

            </Map>    
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    )
}

export default OrphanagesMap