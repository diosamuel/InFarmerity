import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { polygon, area } from "@turf/turf";
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Select, Input, Button, Checkbox } from "@chakra-ui/react";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { useGeolocated } from "react-geolocated";

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

// Fix Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const UpdateMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};
function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: -5.358857, lng: 105.315353 }); // Default coordinates
  const [chosenArea, setChosenArea] = useState(null);
  const [walletInformation, setWalletInformation] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const featureGroupRef = useRef(null)
  const [formData, setFormData] = useState({
    cropType: '',
    startDate: '',
    riskCategory: '',
    coordinate: null,
    size: null,
  });
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  // Handle events for drawn layers
  const handleDrawCreate = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();
    const poly = polygon(geojson.geometry.coordinates);
    const result = {
      coordinate: geojson.geometry.coordinates[0][0],
      size: area(poly)
    }
    setChosenArea(result)
    setFormData({...formData,...result})
  };

  const handleDrawEdited = (e) => {
    const layers = e.layers;
    layers.eachLayer((layer) => {
      const geojson = layer.toGeoJSON();
      const poly = polygon(geojson.geometry.coordinates);
      setChosenArea({
        coordinate: geojson.geometry.coordinates[0][0],
        size: area(poly)
      })
      console.log("Edited Feature:", geojson);
    });
  };

  const handleDrawDeleted = (e) => {
    const layers = e.layers;
    console.log(`${layers.getLayers().length} layers deleted`);
    setChosenArea(null)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let StacksAuthenticate = () => {
    setLoading(true)
    showConnect({
      appDetails: {
        name: 'InFarmerity',
        icon: window.location.origin + '/vite.svg',
      },
      redirectTo: '/',
      onFinish: () => {
        let userData = userSession.loadUserData();
        console.log(userData)
        setWalletInformation(userData)
        setLoading(false)
        navigate("/")
      },
      userSession,
      onCancel:()=>{
        setLoading(true)
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const response = await axios.get(
          `https://api.testnet.hiro.so/extended/v1/address/${walletInformation?.profile?.stxAddress?.testnet}/stx`
        );
        setData(response.data); // Set fetched data
        console.log(response.data)
      } catch (err) {
        setError(err.message); // Handle error
        throw err
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, [walletInformation])

  const handleEnableLocation = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      console.log(coords)
      setCurrentLocation({ lat: coords.latitude, lng: coords.longitude });
    } else {
      alert("Geolocation is unavailable or not enabled. Please check your settings.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    if (!formData.cropType || !formData.startDate || !formData.riskCategory || !formData.size || !formData.coordinate) {
      alert("Please complete all fields before submitting the form.");
      return;
    }

    // Process or send the form data
    StacksAuthenticate()
  };
  return (
    <div className="flex h-screen">
      <div className='hidden md:block w-9/12 relative'>
        <div className='h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1619918456538-df5b5290950b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <div className='w-full h-full bg-gradient-to-b from-black to-transparent opacity-70'></div>
          <h1 className="text-2xl font-bold my-5 text-white absolute top-0 left-4">InFarmerity Insurance</h1>
        </div>
      </div>
      <div className="flex flex-col items-center overflow-y-scroll">
        <form className="w-11/12" onSubmit={handleFormSubmit}>
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">What do you grow on your farm?</p>
              <p className="text-sm">
                Please specify the type of crops you cultivate. This will help us determine the best insurance policy tailored to your needs.
              </p>
            </div>
            <Input placeholder="Crop Type" name="cropType" value={formData.cropType} onChange={handleInputChange} />
          </div>
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">When did you start farming?</p>
              <p className="text-sm">
                Select the start date of your farming activity. This information will be used to calculate the coverage period for your insurance.
              </p>
            </div>
            <Input placeholder="Select Date" size="md" type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
          </div>
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">Risk Category</p>
              <p className="text-sm">
                Choose the risk category that reflects your farm's conditions. Higher risk areas may have higher premiums but provide more coverage.
              </p>
            </div>
            <Select name="riskCategory" value={formData.riskCategory}
              onChange={handleInputChange}>
              <option>High Risk (1,5 STX per Hectares)</option>
              <option>Medium Risk (1 STX per Hectares)</option>
              <option>Low Risk (0.005 STX per Hectares)</option>
            </Select>
          </div>
          <div className="my-5">
            <div className="my-3">
              <p className="text-lg font-semibold">Select Farm Area</p>
              <p className="text-sm">
                Use the map below to outline your farm area. You can draw polygons to mark your land boundaries. Ensure the selected area matches your farm size for accurate premium calculations.
              </p>
              <Button size={"sm"} className="my-2" colorScheme="green" variant={"outline"} onClick={handleEnableLocation}>
                Current Location
              </Button>
            </div>
            <div className="p-3 bg-green-600 rounded-t-lg font-semibold text-sm text-white">
              <p>Coordinates: {chosenArea?.coordinate.join(",")}</p>
              <p>Size: {(chosenArea?.size || 0 / 10000).toFixed(2)} Hectares</p>
            </div>
            <div className="w-full h-[30em] border">
              <MapContainer
                center={[currentLocation.lat, currentLocation.lng]}
                zoom={20}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
              >
                <UpdateMapCenter center={[currentLocation.lat, currentLocation.lng]} />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                {/* Draw Controls */}
                <FeatureGroup ref={featureGroupRef}>
                  <EditControl
                    position="topright"
                    onCreated={handleDrawCreate}
                    onEdited={handleDrawEdited}
                    onDeleted={handleDrawDeleted}
                    draw={{
                      rectangle: false,
                      polygon: true,
                      circle: false, // Disable drawing circles
                      polyline: false, // Disable polylines
                      marker: false, // Enable markers
                      circlemarker: false, // Disable circle markers
                    }}
                  />
                </FeatureGroup>
              </MapContainer>
            </div>
          </div>
          <div className="my-3">
            <Checkbox>By registering for InFarmerity Insurance, you agree to the following <a href="#" className='underline'>terms and conditions</a></Checkbox>
          </div>
          <button className="w-full p-3 rounded-lg bg-green-500 text-white mb-5" type='submit'>
            {!loading ? (
              <>Sign with <b>Stacks Wallet</b></>
            ) : (
              <span className="animate-pulse transition-all">Loading</span>
            )}
          </button>
        </form>
      </div>
    </div>

  )
}

export default App