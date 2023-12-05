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
function CurrentListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Load from local storage on component mount
    const savedListings = JSON.parse(localStorage.getItem('saved_listings')) || [];
    // Parse the createdAt property back to Date objects
    setListings(savedListings.map(listing => ({ ...listing, createdAt: new Date(listing.createdAt) })));
  }, []);
  const handleResetListings = () => {
    // Reset listings to an empty array and clear local storage
    setListings([]);
    localStorage.removeItem('saved_listings');
  };
  return (
    <div>
      <h2>Welcome to the Current Listings Page</h2>
      <ListingIndex listings={listings} />
      <button onClick={handleResetListings}>
        Reset Listings
      </button>
    </div>
  );
}

export default CurrentListings;