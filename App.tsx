import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import BackGroundServices from './BackgroundServices'

const App = () => {
  const [Texts,setText]=useState({
    tit:'jkjk',
    adk:"kk",
    service:true,
  })

  const runthis =()=>{
    console.log("erfrfw")

  }
  return (
    <View>
            <Button title='Stop Services'  onPress={()=>{setText({...Texts,service:true})}}/>
            <Button title='Start Services'  onPress={()=>{setText({...Texts,service:false})}}/>

    <BackGroundServices  killService={Texts.service}  onEachSecond={8} Text={Texts.tit} Title={Texts.adk} onServiceRunning={runthis} IsServiceRunning={(Runing)=>{console.log("Runing",Runing)}}/>
    </View>
  )
}

export default App