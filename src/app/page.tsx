"use client";

import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import {useState} from "react";

export default function Home() {

  const gridSize = 1000; // 100x100 grid for simplicity (you can scale this up if needed)
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  // Handle the color picker change
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>R/Place Clone</h1>

      {/* Color Picker */}
      <div style={styles.colorPickerContainer}>
        <label style={styles.label}>Choose a color: </label>
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          style={styles.colorPicker}
        />

        <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
        />
        <div
          style={{ ...styles.selectedColorPreview, backgroundColor: selectedColor }}
        />
      </div>

      {/* Pixel Grid */}
      <div style={{ ...styles.grid, gridTemplateColumns: `repeat(${gridSize}, 10px)` }}>
        {[...Array(gridSize)].map((_, row) =>
          [...Array(gridSize)].map((_, col) => (
            <div
              key={`${row}-${col}`}
              onClick={() => console.log(`Clicked on pixel (${row}, ${col}) with color ${selectedColor}`)}
              style={{
                ...styles.pixel,
                backgroundColor: '#FFFFFF', // Initial pixel color
                border: '1px solid #ddd',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  colorPickerContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    fontSize: '18px',
    marginRight: '10px',
  },
  colorPicker: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  },
  selectedColorPreview: {
    width: '50px',
    height: '50px',
    border: '1px solid #000',
    marginLeft: '10px',
  },
  grid: {
    display: 'grid',
    gap: '1px', // Slight gap between pixels
    marginTop: '20px',
    maxWidth: '100%', // To make it responsive
  },
  pixel: {
    width: '10px',
    height: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#eee', // Hover effect
    },
  },
};