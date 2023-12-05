import React from 'react';
import { useState, useEffect } from 'react';




class Listing {
    constructor(name, description, location, createdAt = new Date(), price) {
      this.name = name;
      this.description = description;
      this.location = location;
      this.createdAt = createdAt;
      this.price = price;
    }
  
  }

function ListingForm({listings, setListings}) {
    const [listing, setListing] = useState(new Listing("", "", "", new Date()));
  
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
        createdAt: new Date(listing.createdAt)
      }
      
    const savedListings = JSON.parse(localStorage.getItem('saved_listings')) || [];
    localStorage.setItem('saved_listings', JSON.stringify([...savedListings, finalizedListing]));
      
      setListing(new Listing("", "", "", new Date(),""));
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



const Sell = () => {
    const [listings, setListings] = useState([
        new Listing("test listing 1", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis urna cursus eget nunc scelerisque viverra. Velit sed ullamcorper morbi tincidunt ornare. At lectus urna duis convallis convallis tellus id. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Viverra nibh cras pulvinar mattis nunc. Odio eu feugiat pretium nibh ipsum. Sem fringilla ut morbi tincidunt augue interdum velit euismod in. Aliquam faucibus purus in massa tempor nec feugiat nisl. Lectus mauris ultrices eros in cursus. Turpis egestas maecenas pharetra convallis. In est ante in nibh mauris cursus mattis.", "Atlanta", new Date(), 500)
      ]);



      useEffect(() => {
        // Load from local storage on component mount
        const savedListings = JSON.parse(localStorage.getItem('saved_listings')) || [];
  // Parse the createdAt property back to Date objects
  setListings(savedListings.map(listing => ({ ...listing, createdAt: new Date(listing.createdAt) })));
}, []);
    return(
        <div>

            <ListingForm listings={listings} setListings={setListings}></ListingForm>
    {/*  <h2>Welcome to the testing sell page ur mum</h2> */}
        </div>
    );

};
function ListingIndex({ listings }) {
    return (
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>
            {listing.location}, {listing.createdAt.toLocaleDateString('en-US')} -{' '}
            <b>{listing.name}(Price: {listing.price})</b>: {listing.description.substring(0, 50)}
          </li>
        ))}
      </ul>
    );
  }
export default Sell;
