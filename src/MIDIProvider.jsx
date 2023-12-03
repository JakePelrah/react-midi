
import { createContext, useContext, useEffect, useRef, useState } from "react";


const MIDIContext = createContext();
export const useMIDI = () => useContext(MIDIContext);

export default function MIDIProvider({ children }) {

    const [granted, setGranted] = useState(null)
    const midiRef = useRef(null)
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])


    useEffect(() => {
        navigator.permissions.query({ name: "midi", sysex: true }).then((result) => {
            if (result.state === "granted") {
                // Access granted.
                console.log('access granted')
            } else if (result.state === "prompt") {
                console.log('prompt for permsission')
                navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)

                // Using API will prompt for permission
            }
            // Permission was denied by user prompt or permission policy
        });
    }, [])

    function onMIDIMessage(event) {
        let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
        for (const character of event.data) {
            str += `0x${character.toString(16)} `;
        }
        console.log(str);
    }

    function startLoggingMIDIInput(midiAccess, indexOfPort) {
        midiAccess.inputs.forEach((entry) => {
            entry.onmidimessage = onMIDIMessage;
        });
    }


    function updateDevices(midiAccess) {
        // get i/o
        for (const entry of midiAccess.inputs) {
            const { id, connection, manufacturer, name, version } = entry[1];
            setInputs(prevState => [...prevState, { id, connection, manufacturer, name, version }])
        }

        for (const entry of midiAccess.outputs) {
            const { id, connection, manufacturer, name, version } = entry[1];
            setOutputs(prevState => [...prevState, { id, connection, manufacturer, name, version }])
        }
    }

    // initialize usb and display

    function onMIDISuccess(midiAccess) {
        setGranted(true)
        midiRef.current = midiAccess

        updateDevices(midiAccess)
        midiAccess.onstatechange = (e) => {
            setInputs([])
            setOutputs([])
            updateDevices(midiAccess)
        }

        // startLoggingMIDIInput(midiAccess)


    }

    function onMIDIFailure(msg) {
        console.error(`Failed to get MIDI access - ${msg}`);
    }




    return (
        <MIDIContext.Provider value={{
            granted,
            inputs,
            outputs
        }}>
            {children}
        </MIDIContext.Provider>
    )
}