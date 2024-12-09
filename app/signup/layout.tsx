// app/hoithung/layout.tsx
import { Metadata } from 'next';
import XDD from './page'; // Import the BioLink component (which is in page.tsx)

// Set the metadata for the page
export const metadata: Metadata = {
  title: 'exodevs.space - Sign Up', // This sets the tab title for this route
};

export default function Layout() {
  return (
    <div>
      {/* This is where the BioLink component gets rendered */}
      <XDD />
    </div>
  );
}