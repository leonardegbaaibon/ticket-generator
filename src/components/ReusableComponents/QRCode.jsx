import React, { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

const QRCode = ({ data, size = 128 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, JSON.stringify(data), {
        width: size,
        margin: 2,
        color: {
          dark: '#24A0B5',
          light: '#041E23'
        }
      });
    }
  }, [data, size]);

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCode; 