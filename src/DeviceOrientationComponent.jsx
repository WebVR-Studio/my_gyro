import React, { useEffect, useCallback, useState } from 'react';

function DeviceOrientationComponent() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleDeviceOrientation = useCallback((event) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  }, []);

  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
        } else {
          console.warn('Device orientation permission denied.');
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
      }
    } else {
      setPermissionGranted(true); // Permission not required or automatically granted
    }
  };

  useEffect(() => {
    if (permissionGranted) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [handleDeviceOrientation, permissionGranted]);

  return (
    <div>
      <h1>Device Orientation</h1>
      {!permissionGranted && (
        <button onClick={requestOrientationPermission}>
          Grant Device Orientation Permission
        </button>
      )}
      {permissionGranted && (
        <>
          <p>Alpha: {orientation.alpha?.toFixed(2)}</p>
          <p>Beta: {orientation.beta?.toFixed(2)}</p>
          <p>Gamma: {orientation.gamma?.toFixed(2)}</p>
        </>
      )}
    </div>
  );
}

export default DeviceOrientationComponent;