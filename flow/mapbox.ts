// Mapbox Static Images API service for Simon's Dog Sitting
// Docs: https://docs.mapbox.com/api/overlays/static-images/

const MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
const FALLBACK_TOKEN = ''; // No fallback - if no token, we use the SVG fallback

export const isMapboxConfigured = !!MAPBOX_ACCESS_TOKEN && MAPBOX_ACCESS_TOKEN !== '';

// Default center: Maple Street area (fictional, but we'll use a real coordinate)
// Using a generic urban area coordinate as base
const DEFAULT_CENTER: [number, number] = [-73.9857, 40.7484]; // NYC area
const DEFAULT_ZOOM = 15;

// Style options - using a warm, neutral style that matches our brand
// "streets-v12" is the default, but we can use "outdoors-v12" for more green
// or custom styles. For warmth, we'll use a light style.
const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';

/**
 * Generate a Mapbox Static Image URL
 * @param center [longitude, latitude]
 * @param zoom Zoom level (0-22)
 * @param width Image width in pixels
 * @param height Image height in pixels
 * @param markers Optional markers to add (format: "pin-s-dog+ff0000(LNG,LAT)")
 * @returns URL or null if Mapbox is not configured
 */
export function getMapboxStaticImageUrl(
  center: [number, number] = DEFAULT_CENTER,
  zoom: number = DEFAULT_ZOOM,
  width: number,
  height: number,
  markers: string[] = []
): string | null {
  if (!isMapboxConfigured) return null;

  const [lng, lat] = center;
  
  // Build the URL
  let url = `https://api.mapbox.com/styles/v1/${MAP_STYLE}/static/`;
  
  // Add markers if any
  if (markers.length > 0) {
    url += `${markers.join(',')}/`;
  }
  
  // Add center and zoom
  url += `${lng},${lat},${zoom}/`;
  
  // Add dimensions
  url += `${width}x${height}`;
  
  // Add access token
  url += `?access_token=${MAPBOX_ACCESS_TOKEN}`;
  
  // Additional parameters for better quality
  url += `&logo=false`; // Hide Mapbox logo (allowed for Static Images API)
  url += `&attribution=false`; // Hide attribution
  
  return url;
}

/**
 * Generate a marker string for Mapbox Static Images
 * @param lng Longitude
 * @param lat Latitude
 * @param color Hex color without # (e.g., "ff0000" for red)
 * @param label Optional label (single character)
 * @param size "s" (small), "m" (medium), "l" (large)
 * @returns Marker string for URL
 */
export function createMarker(
  lng: number,
  lat: number,
  color: string = 'ff0000',
  label?: string,
  size: 's' | 'm' | 'l' = 'm'
): string {
  // Remove # from color if present
  const cleanColor = color.replace('#', '');
  
  // Build marker string
  let marker = `pin-${size}-${cleanColor}(${lng},${lat})`;
  
  // Add label if provided
  if (label) {
    marker += label;
  }
  
  return marker;
}

/**
 * Get the default map URL for the Discover screen
 * Uses a fixed center that matches the design coordinates
 */
export function getDiscoverMapUrl(width: number, height: number, sitters: Array<{x: number, y: number}>): string | null {
  if (!isMapboxConfigured) return null;
  
  // For now, we'll use a fixed center since the current coordinates are design-space (0-322)
  // In a real implementation, we'd convert design coords to real GPS coords
  // But for the demo, we'll center on a nice area and place markers approximately
  
  const center: [number, number] = [-73.9857, 40.7484];
  const zoom = 15;
  
  // Convert design coordinates (0-322) to longitude/latitude offsets
  // This is a simplified approach - in production you'd have real GPS data
  const markers = sitters.map(sitter => {
    // Scale design coords to small offsets around the center
    const lngOffset = (sitter.x - 161) / 322 * 0.01; // ~1% longitude offset max
    const latOffset = (sitter.y - 200) / 400 * 0.008; // ~0.8% latitude offset max
    
    return createMarker(
      center[0] + lngOffset,
      center[1] + latOffset,
      'E07A5F' // terracotta color
    );
  });
  
  return getMapboxStaticImageUrl(center, zoom, width, height, markers);
}

/**
 * Get the map URL for the LiveWalk screen
 * Shows a route path (simplified - Static Images doesn't support paths directly)
 */
export function getLiveWalkMapUrl(width: number, height: number): string | null {
  if (!isMapboxConfigured) return null;
  
  // For LiveWalk, we'll show a map centered on the walk area
  // The route will be drawn on top using SVG (as in the original)
  const center: [number, number] = [-73.9857, 40.7484];
  const zoom = 16;
  
  return getMapboxStaticImageUrl(center, zoom, width, height);
}

/**
 * Pre-defined map URL for a specific location (Maple Street area)
 * This can be used as a fallback when we don't have dynamic coordinates
 */
export function getDefaultMapUrl(width: number, height: number): string | null {
  if (!isMapboxConfigured) return null;
  
  // A nice park area in Brooklyn as our "Maple Street"
  const center: [number, number] = [-73.968, 40.785]; // Prospect Park area
  const zoom = 15;
  
  return getMapboxStaticImageUrl(center, zoom, width, height);
}
