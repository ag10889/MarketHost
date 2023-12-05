import './App.css';
import { useState } from 'react';
import AppRouter from './AppRouter';
import BlueBackground from './blue.jpg';
import Select from 'react-select';
/*  Run these to install the proper depencies, this assumes you already have Node.JS installed */
/*  npm install react-native-dropdown-picker   */
/*  npm install react-select                   */
/*  npm install                                */

class Listing {
  constructor(name, description, location, createdAt, price) {
    this.name = name;
    this.description = description;
    this.location = location;
    this.createdAt = createdAt;
    this.price = price;
  }

}



function ListingIndex({listings}) {
  return <ul>{listings.map(listing => <li>{listing.location}, {listing.createdAt.toLocaleDateString('en-US')} - <b>{listing.name}(Price: {listing.price})</b>: {listing.description.substring(0,50)}</li>)}</ul>
}

function ListingForm({listings, setListings}) {
  const [listing, setListing] = useState(new Listing("", "", "", new Date(0)));

  function handleNameChange(name) {
    setListing({
      ...listing,
      name: name.target.value
    })
  }

  function handleDescriptionChange(description) {
    setListing({
      ...listing,
      description: description.target.value
    })
  }

  function handleLocationChange(location) {
    setListing({
      ...listing,
      location: location.target.value
    })
  }

  function handlePriceChange(price){
    setListing({
      ...listing,
      price: price.target.value
    })
  
  }

  function handleFormSubmit() {
    const finalizedListing = {
      ...listing,
      createdAt: new Date()
    }
    setListing(new Listing("", "", "", new Date(0),""));
    setListings([...listings, finalizedListing])

  }

  return (
    <>
      <h5>Create new listing</h5>
      <label>Name: <input value={listing.name} onChange={handleNameChange}/></label><br></br>
      <label>Location: <input value={listing.location} onChange={handleLocationChange}/></label><br></br>
      <label>Price: <input value={listing.price} onChange={handlePriceChange}/></label><br></br>
      <label>Description: <textarea value={listing.description} onChange={handleDescriptionChange }/></label>
      
      <br></br>
      <button onClick={handleFormSubmit}>
        Submit
      </button>
    </>
  );
}

function Listingdropdown(listings){ 
  const sortedListings = listings.sort((a, b) => a.location < b.location ? -1 : 1)
  return (
    <>
      <h2>All Listings</h2>
      <ul>
        {sortedListings.map((item, index) => (
          <li key={index}>
            {item.name} - {item.location} - {item.price}
          </li>
        ))}
      </ul>
    </>
  );
}



function App() {
  const [listings, setListings] = useState([
    new Listing("test listing 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque viverra. Velit sed ullamcorper morbi tincidunt ornare. At lectus urna duis convallis convallis tellus id. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Viverra nibh cras pulvinar mattis nunc. Odio eu feugiat pretium nibh ipsum. Sem fringilla ut morbi tincidunt augue interdum velit euismod in. Aliquam faucibus purus in massa tempor nec feugiat nisl. Lectus mauris ultrices eros in cursus. Turpis egestas maecenas pharetra convallis. In est ante in nibh mauris cursus mattis.", "Atlanta", new Date(0), 500)
  ]);

  const [showList, setShowList] = useState(false); //Sets the list of listings to not show up by default


  return (
    <div className="App" style={{ backgroundImage: `url(${BlueBackground})`, minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'cover'}}>
      <header className="App-header">
        <h1>MarketHost</h1>
      </header>
      <ListingIndex listings={listings}></ListingIndex>
      <ListingForm listings={listings} setListings={setListings}></ListingForm>


      <button onClick={() => setShowList(!showList)}>Toggle Listings: {showList ? 'Hide' : 'Show'}</button> {/* Button that can toggle between the listings being visible and not */}
      {showList && Listingdropdown(listings)}
      

      
      
    </div>
  );
}

export default App;