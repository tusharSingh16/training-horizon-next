const express = require("express");
const Review = require("../models/Review");
const Listing = require("../models/Listing");

const writeReview = async (req, res) => {
  try {
    const { listingId, name, review, rating, date } = req.body;

    // Validate required fields
    if (!listingId || !name || !review || typeof rating !== 'number') {
      return res.status(400).json({ error: 'All fields are required, and rating must be a number' });
    }

    // Create and save the new review
    const newReview = new Review({
      name,
      review,
      rating,
      date: date || Date.now(),
    });

    await newReview.save();

    // Find the listing and add the review
    const listing = await Listing.findById(listingId).populate('reviews');
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    listing.reviews.push(newReview._id);

    // Get all valid ratings, including the new rating
    const validRatings = listing.reviews
      .map((rev) => rev.rating)
      .filter((rating) => typeof rating === "number");

    // Add the new rating to the list for average calculation
    validRatings.push(rating);

    // Calculate the new avgRating with one decimal place
    const newAverageRating = validRatings.length
      ? validRatings.reduce((acc, rating) => acc + rating, 0) / validRatings.length
      : 0;

    
    // Save avgRating with one decimal place
    listing.avgRating = parseFloat(newAverageRating.toFixed(1));
    await listing.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to fetch reviews and average rating for a listing
const getReview = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Find the listing and populate its reviews
    const listing = await Listing.findById(listingId).populate('reviews');
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res.status(200).json({
      reviews: listing.reviews,
      averageRating: listing.avgRating || 0, // Use stored avgRating, defaulting to 0 if undefined
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getReview,
  writeReview
};
