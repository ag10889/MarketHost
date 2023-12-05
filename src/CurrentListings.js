import React from 'react';
import ListingIndex from './Sell';
import { useState, useEffect } from 'react';


function CurrentListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Load from local storage on component mount
    const savedListings = JSON.parse(localStorage.getItem('saved_listings')) || [];
    // Parse the createdAt property back to Date objects
    setListings(savedListings.map(listing => ({ ...listing, createdAt: new Date(listing.createdAt) })));
  }, []);

  return (
    <div>
      <h2>Welcome to the Current Listings Page</h2>
      <ListingIndex listings={listings} />
    </div>
  );
}

export default CurrentListings;