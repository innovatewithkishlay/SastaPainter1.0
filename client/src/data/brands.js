/**
 * Brands Data Source
 * 
 * To add a new brand:
 * 1. Add the logo image to public/images/
 * 2. Add an object below with:
 *    - id: unique string
 *    - name: Display name
 *    - image: path to image (e.g., '/images/logo.webp')
 *    - slug: URL-friendly identifier for filtering
 */

export const brands = [
    {
        id: 'asianpaints',
        name: 'Asian Paints',
        image: '/images/asian-paints-icon.webp',
        slug: 'asian-paints'
    },
    {
        id: 'haisha',
        name: 'HAISHA Paints',
        image: '/images/haisha-painter-logo.jpg',
        slug: 'haisha-paints'
    },
    {
        id: 'birla-opus',
        name: 'Birla Opus',
        image: '/images/birla-opus-icon.webp',
        slug: 'birla-opus'
    },
    {
        id: 'nerolac',
        name: 'Nerolac Paints',
        image: '/images/nerolac-paints-icon.webp',
        slug: 'nerolac'
    },
    {
        id: 'dulux',
        name: 'Dulux Paints',
        image: '/images/Dulux Paints.webp',
        slug: 'dulux'
    },
    {
        id: 'indigo',
        name: 'Indigo Paints',
        image: '/images/indigo-paints-icon.webp',
        slug: 'indigo'
    },
    {
        id: 'shalimar',
        name: 'Shalimar Paints',
        image: '/images/shalimar-paints-icon.webp',
        slug: 'shalimar'
    },
    {
        id: 'dr-fixit',
        name: 'Dr. Fixit',
        image: '/images/dr-fixit-icon.webp',
        slug: 'dr-fixit'
    }
];
