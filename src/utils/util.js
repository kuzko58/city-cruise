import * as crypto from 'crypto';

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const getDistance = (userLat, userLng, riderLat, riderLng) => {
  const earthRadiusKm = 6371; // Radius of the earth in km
  const dLat = deg2rad(riderLat - userLat);
  const dLon = deg2rad(riderLng - userLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) *
      Math.cos(deg2rad(riderLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c; // Distance between user and rider point in km

  return distance;
};

export const isWithinRadius = (userLat, userLng, riderLat, riderLng, radius) => {
  const distance = getDistance(userLat, userLng, riderLat, riderLng);

  return distance <= radius;
};

export const generateRandomString = (num) => {
  const bytes = new Uint8Array(num);
  crypto.randomFillSync(bytes, 0, num);
  return bytes.toString();
};
