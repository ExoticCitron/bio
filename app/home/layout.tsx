// app/hoithung/layout.tsx
import { Metadata } from 'next';
import Home from './page'; // Import the BioLink component (which is in page.tsx)

// Set the metadata for the page
export const metadata: Metadata = {
  title: 'exodevs.space - Home', // This sets the tab title for this route
};

export default function Layout() {
  return (
    <div>
      {/* This is where the BioLink component gets rendered */}
      <Home />
    </div>
  );
}