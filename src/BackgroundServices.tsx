import { View, Text, NativeEventEmitter, NativeModules, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
const {BackgroundServiceCheck} = NativeModules;
interface BackGroundServicesInterFace {
    Title: string;
    Text: string;
    onEachSecond: number;
  onServiceRunning:()=>void;
  IsServiceRunning?: (boolean: boolean) => void;
  killService:boolean;
 
}

const BackGroundServices:React.FC<BackGroundServicesInterFace> = ({Text,Title,onServiceRunning,onEachSecond,killService,IsServiceRunning}) => {
  const [isServiceRunning, setIsServiceRunning] = useState(false);

  const [ServiceContent,setServiceContent]=useState({
    Title:Title,
    Text:Text
  })


  const RunTheFunction =async()=>{


    if(IsServiceRunning){
      const status = await BackgroundServiceCheck.isBackgroundServiceRunning();

      IsServiceRunning(status);

      setIsServiceRunning(status);


    }

    onServiceRunning();
  }

  useEffect(()=>{
    RunTheFunction()

  },[isServiceRunning])

  useEffect(()=>{
    if(killService){
      console.log("Services Stoped");
        BackgroundServiceCheck.stopBackgroundService()
        if(IsServiceRunning){
          IsServiceRunning(false);

        }

    
      
      }else{


        const eventEmitter = new NativeEventEmitter(BackgroundServiceCheck);

        if (BackgroundServiceCheck) {
          console.log("jkj")
          BackgroundServiceCheck.startBackgroundService(onEachSecond*1000,ServiceContent);
          eventEmitter.addListener('backgroundServiceTriggered',RunTheFunction);
        }else{  
          console.log("native module Not Exist")
        }
      }

  },[killService])

 

 


 



 


 
  return (
    <View>
    </View>
  )
}

export default BackGroundServices