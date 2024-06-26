# React Native Background Services

A React Native library for managing background services.

## Installation

To install the library, run:

```bash
npm install react-native-background-services
Setup
Ensure you have linked the native modules properly. If you're using React Native 0.60 and above, the linking is handled automatically.

For manual linking, follow the instructions here.

Usage
Main Component
The main component provided by the library is BackGroundServices. It helps you manage background services in your React Native application.

Importing the Component
javascript
import { BackGroundServices } from 'react-native-background-services';
Props
Title (string): The title of the background service.
Text (string): The text displayed by the background service.
onEachSecond (number): The interval in seconds for the background service to trigger.
onServiceRunning (function): Callback function that is called each time the background service triggers.
IsServiceRunning (function) (optional): Callback function that receives a boolean indicating if the background service is running.
killService (boolean): Boolean to stop the background service.
Example Usage
javascript
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BackGroundServices } from 'react-native-background-services';

const App = () => {
  const [isServiceRunning, setIsServiceRunning] = useState(false);

  const handleServiceRunning = (status) => {
    console.log('Service running:', status);
    setIsServiceRunning(status);
  };

  const handleServiceTriggered = () => {
    console.log('Background service triggered');
  };

  return (
    <View>
      <BackGroundServices
        Title="Background Service"
        Text="Service is running..."
        onEachSecond={1}
        onServiceRunning={handleServiceTriggered}
        killService={false}
        IsServiceRunning={handleServiceRunning}
      />
      <Text>Service Running: {isServiceRunning ? 'Yes' : 'No'}</Text>
    </View>
  );
};

export default App;
Detailed Component Code
javascript
import { View, NativeEventEmitter, NativeModules } from 'react-native';
import React, { useEffect, useState } from 'react';

const { BackgroundServiceCheck } = NativeModules;

interface BackGroundServicesInterFace {
  Title: string;
  Text: string;
  onEachSecond: number;
  onServiceRunning: () => void;
  IsServiceRunning?: (boolean: boolean) => void;
  killService: boolean;
}

const BackGroundServices: React.FC<BackGroundServicesInterFace> = ({ Text, Title, onServiceRunning, onEachSecond, killService, IsServiceRunning }) => {
  const [isServiceRunning, setIsServiceRunning] = useState(false);

  const [serviceContent, setServiceContent] = useState({
    Title: Title,
    Text: Text,
  });

  const runTheFunction = async () => {
    if (IsServiceRunning) {
      const status = await BackgroundServiceCheck.isBackgroundServiceRunning();
      IsServiceRunning(status);
      setIsServiceRunning(status);
    }
    onServiceRunning();
  };

  useEffect(() => {
    runTheFunction();
  }, [isServiceRunning]);

  useEffect(() => {
    if (killService) {
      console.log("Services Stopped");
      BackgroundServiceCheck.stopBackgroundService();
      if (IsServiceRunning) {
        IsServiceRunning(false);
      }
    } else {
      const eventEmitter = new NativeEventEmitter(BackgroundServiceCheck);
      if (BackgroundServiceCheck) {
        console.log("Starting background service");
        BackgroundServiceCheck.startBackgroundService(onEachSecond * 1000, serviceContent);
        eventEmitter.addListener('backgroundServiceTriggered', runTheFunction);
      } else {
        console.log("Native module does not exist");
      }
    }
  }, [killService]);

  return <View />;
};

export default BackGroundServices;
Contributing
Contributions are welcome! Please open an issue or submit a pull request on GitHub.

License
MIT


### Explanation:

1. **Installation Instructions**: Details on how to install the library using npm.
2. **Setup Instructions**: Notes on ensuring proper linking of native modules.
3. **Usage Example**: A sample component demonstrating how to use the `BackGroundServices` component, including handling service running status and triggering events.
4. **Component Code**: The full code of the `BackGroundServices` component for reference.
5. **Contributing**: Information on how to contribute to the project.
6. **License**: Licensing information.

This README should give users a clear understanding of how to install, set up, and use your Rea