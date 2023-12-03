import { useEffect, useRef, useState } from "react"
import { useMIDI } from "./MIDIProvider"
import "./display.css"

export default function Display() {

    const { granted, inputs, outputs } = useMIDI()
    const selectInputRef = useRef(null)
    const selectOutputRef = useRef(null)

    const [selectedInput, setSelectedInput] = useState({})
    const [selectedOutput, setSelectedOutput] = useState({})



    useEffect(() => {

        // setSelectedInput(null)
        // setSelectedOutput(null)

        if (selectInputRef.current) {
            selectInputRef.current.onchange = (e) => {
                console.log(inputs[e.target.value])
                setSelectedInput(inputs[e.target.value])
            }
        }

        if (selectOutputRef.current) {
            selectOutputRef.current.onchange = (e) => {
                console.log(inputs[e.target.value])
                setSelectedOutput(inputs[e.target.value])
            }
        }


    }, [inputs, outputs])

    useEffect(() => {
        console.log(inputs)
    }, [inputs])


    return (
        <div className="container text-center my-5">

            <div className="d-flex flex-column justify-content-center">
                <span id="permission-span">
                    MIDI Permission:
                    {granted ? " TRUE" : " FALSE"}</span>

                <div className="d-flex flex-column justify-content-center">

                    <div className="d-flex flex-column m-1 io-select">

                        <IODropdown myRef={selectInputRef} type={"Input"} items={inputs} />

                        <div className="d-flex  justify-content-between">
                            <div className="fw-bold">ID</div>
                            <div> {selectedInput?.id}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">Name</div>
                            <div> {selectedInput?.name}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">MFG</div>
                            <div> {selectedInput?.manufacturer}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">CONNECTION</div>
                            <div> {selectedInput?.connection}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">VERSION</div>
                            <div> {selectedInput?.version}</div>
                        </div>
                    </div>

                    <div className="d-flex flex-column m-1 io-select">
                        <IODropdown myRef={selectOutputRef} type={"Output"} items={outputs} />

                        <div className="d-flex  justify-content-between">
                            <div className="fw-bold">ID</div>
                            <div> {selectedOutput?.id}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">Name</div>
                            <div> {selectedOutput?.name}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">MFG</div>
                            <div> {selectedOutput?.manufacturer}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">CONNECTION</div>
                            <div> {selectedOutput?.connection}</div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="fw-bold">VERSION</div>
                            <div> {selectedOutput?.version}</div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}


function IODropdown({ myRef, type, items }) {
    return (
        <select ref={myRef} className="form-select form-select-sm">
            <option >{type}</option>
            {items.map((item, index) => (
                <option key={item.id} >{index}</option>
            ))}
        </select>)
}


