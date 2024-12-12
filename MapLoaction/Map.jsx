import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { useState } from 'react'
import L from 'leaflet' // Import Leaflet

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false })
const Circle = dynamic(() => import('react-leaflet').then((m) => m.Circle), { ssr: false })
const ZoomControl = dynamic(() => import('react-leaflet').then((m) => m.ZoomControl), { ssr: false })
import { SiOpenstreetmap } from 'react-icons/si'

function Map({
  locationClient = [32.6222364807073, 51.66448222027397],
  zoomClient = 14,
  radiusClient = 0,
  witchMap = 'neshan',
  linkMap = false,
}) {
  const [location, setLocation] = useState(locationClient)
  const [zoom, setZoom] = useState(zoomClient)
  const [radius, setRadius] = useState(radiusClient)
  const [showRegion, setShowRegion] = useState(false)

  const handleLocationChange = (e) => {
    const [lat, lng] = e.target.value.split(',').map(Number)
    setLocation([lat, lng])
  }

  const handleZoomChange = (e) => {
    setZoom(Number(e.target.value))
  }

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value))
    setShowRegion(true)
  }

  const handleShowRegionChange = (e) => {
    setShowRegion(e.target.checked)
  }

  // Create a custom icon
  // const customIcon = L.icon({
  //   iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
  //   iconSize: [25, 25], // Set the size of the icon
  //   iconAnchor: [12.5, 25], // Set the anchor point of the icon (center of the icon)
  //   popupAnchor: [0, -25], // Set the anchor point for the popup (top center of the icon)
  //   tooltipAnchor: [0, -25], // Set the anchor point for the tooltip (top center of the icon)
  // })

  return (
    <div className="flex flex-col gap-4">
      <MapContainer
        attributionControl={false}
        style={{
          height: '600px',
          width: '100%',
          zIndex: 1,
          fontFamily: 'inherit',
          borderRadius: '30px',
        }}
        center={location}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer preferCanvas={true} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl
          position="bottomleft"
          zoomInStyle={{
            backgroundColor: 'black',
            color: 'white',
            border: '2px solid white',
            opacity: 0.5,
          }}
          zoomOutStyle={{
            color: 'white',
            border: '2px solid white',
            backgroundColor: 'black',
            opacity: 0.5,
          }}
          zoomInText="+"
          zoomOutText="-"
        />

        {!showRegion && (
          <Marker
            position={location}
            // icon={customIcon}
          >
            <Popup>Clicked Location</Popup>
          </Marker>
        )}

        {showRegion && radius > 0 && <Circle center={location} radius={radius} />}
      </MapContainer>
      {witchMap == 'balad' && (
        <a
          href={`https://balad.ir/location?latitude=${location[0]}&longitude=${location[1]}&radius=${radius}`}
          target="_blank"
          className="absolute right-2 bottom-2 z-10 bg-transparent text-purple-950 flex  items-center justify-center gap-x-2  p-2 rounded-md font-bold"
        >
          <span className="font-bold">Balad</span>

          <SiOpenstreetmap />
        </a>
      )}
      {witchMap == 'neshan' && (
        <a
          href={linkMap ? linkMap : `https://neshan.org/maps/places/bf0ce${location[0]}-${location[1]}-16z-0p`}
          target="_blank"
          className="absolute right-2 bottom-2 z-10 bg-transparent text-purple-950 flex items-center justify-center gap-x-2 p-2 rounded-md font-bold"
        >
          <span className="font-bold">Neshan</span>
          <SiOpenstreetmap />
        </a>
      )}

      {witchMap == 'google' && (
        <a
          href={`https://www.google.com/maps?q=${location[0]},${location[1]}`}
          target="_blank"
          className="absolute right-2 bottom-2 z-10 bg-transparent text-purple-950 flex  items-center justify-center gap-x-2  p-2 rounded-md font-bold"
        >
          <span className="font-bold">google</span>
          <SiOpenstreetmap />
        </a>
      )}
    </div>
  )
}

// * if you want to use
// npm install leaflet react-leaflet leaflet-defaulticon-compatibility

// * if you want to change //! witchMap !//
// google
// balad
// neshan

export default Map
