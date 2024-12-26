import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { openSTXTransfer } from '@stacks/connect';
// import { StacksTestnet } from '@stacks/network';
import { polygon, area } from "@turf/turf";
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet's CSS
import { Select, Input, Button, Checkbox } from "@chakra-ui/react"; // Using Chakra UI for Select and Input
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";

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
function App() {
  const [data, setData] = useState(null);
  const [chosenArea, setChosenArea] = useState(null);
  const [walletInformation, setWalletInformation] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const featureGroupRef = useRef(null)

  // Handle events for drawn layers
  const handleDrawCreate = (e) => {
    const layer = e.layer;
    const geojson = layer.toGeoJSON();
    const poly = polygon(geojson.geometry.coordinates);
    setChosenArea({
      coordinate: geojson.geometry.coordinates[0][0],
      size: area(poly)
    })
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

  let authenticate = () => {
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
      },
      userSession,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const response = await axios.get(
          `https://api.testnet.hiro.so/extended/v1/address/${walletInformation.profile.stxAddress.testnet}/stx`
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

  return (
    <div className="mx-auto container">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold my-5">InFarmerity Insurance Registration</h1>
        <div className="w-11/12 md:w-8/12">
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">What do you grow on your farm?</p>
              <p className="text-sm">
                Please specify the type of crops you cultivate. This will help us determine the best insurance policy tailored to your needs.
              </p>
            </div>
            <Input placeholder="Crop Type" />
          </div>
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">When did you start farming?</p>
              <p className="text-sm">
                Select the start date of your farming activity. This information will be used to calculate the coverage period for your insurance.
              </p>
            </div>
            <Input placeholder="Select Date" size="md" type="date" />
          </div>
          <div>
            <div className="my-3">
              <p className="text-lg font-semibold">Risk Category</p>
              <p className="text-sm">
                Choose the risk category that reflects your farm's conditions. Higher risk areas may have higher premiums but provide more coverage.
              </p>
            </div>
            <Select>
              <option>High Risk (3 STX per Area)</option>
              <option>Medium Risk (1.5 STX per Area)</option>
              <option>Low Risk (0.5 STX per Area)</option>
            </Select>
          </div>
          <div className="my-5">
            <div className="my-3">
              <p className="text-lg font-semibold">Select Farm Area</p>
              <p className="text-sm">
                Use the map below to outline your farm area. You can draw polygons to mark your land boundaries. Ensure the selected area matches your farm size for accurate premium calculations.
              </p>
              <Button size={"sm"} className="my-2" colorScheme="orange" variant={"outline"}>
                Enable Location
              </Button>
            </div>
            <div className="p-3 bg-orange-600 rounded-t-lg font-semibold text-sm text-white">
              <p>Coordinates: {chosenArea?.coordinate.join(",")}</p>
              <p>Size: {(chosenArea?.size || 0 / 10000).toFixed(2)} Hectares</p>
            </div>
            <div className="w-full h-[30em] border">
              <MapContainer
                center={[-5.358857142758962, 105.31535375096503]} // Default coordinates
                zoom={20}
                scrollWheelZoom={true}
                style={{ width: "100%", height: "100%" }}
              >
                {/* Tile Layer */}
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
          <button className="w-full p-3 rounded-lg bg-orange-500 text-white mb-5" onClick={authenticate}>
            {!loading ? (
              <>Sign with <b>Stacks Wallet</b></>
            ) : (
              <span className="animate-pulse transition-all">Loading</span>
            )}
          </button>
        </div>
      </div>
      {walletInformation && <div>Welcome, {walletInformation.profile.stxAddress.testnet}</div>}
      {data && <div>Current Balance: {data.balance / 1000000} STX</div>}
    </div>

  )
}

export default App