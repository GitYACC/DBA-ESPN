import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface Point {
    x: number
    y: number
}

interface ConnectorProps {
    initial: Point,
    final: Point
}

interface QuadrantProps {
    dh: number
    dw: number
}

interface HorizontalProps {
    dw: number
}

interface VerticalProps {
    dh: number
}

interface DragBoxProps {
    position: { x: number, y: number }
    setPosition: Dispatch<
        SetStateAction<
        { x: number, y: number }
    >>
    setConnector: Dispatch<
        SetStateAction<
        { x: number, y: number }
    >>
    constraints: MutableRefObject<null>
}

type rem = number

function generateGrid(size: rem): { x: number, y: number }[] {
    let grid = []

    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            grid.push({x: (i * size * 16), y: (j * size * 16)})
        }
    }

    return grid
}

function snapToPoint(x: number, y: number, grid: { x: number, y: number }[]) {
    let closestPoint = grid[0]
    let minDistance = Infinity
  
    for (let point of grid) {
        const distance = Math.hypot(point.x - x, point.y - y)
        if (distance < minDistance) {
            minDistance = distance
            closestPoint = point
        }
    }

    return closestPoint
}

function DraggableBox(props: DragBoxProps) {
    const dragBox = useRef(null)
    const control = useAnimation()

    const [update, setUpdate] = useState(true)


    const triggerSnap = () => {
        control.start({
            x: props.position.x,
            y: props.position.y
        })
    }
    
    const handleDrag = (event: any, info: any) => {
        const { x, y, width, height } = (dragBox.current! as HTMLDivElement).getBoundingClientRect()
        props.setConnector({x: x + (width / 2), y: y + (height / 2)})
    }

    const handleDragEnd = (event: any, info: any) => {
        const { x, y, width, height } = (dragBox.current! as HTMLDivElement).getBoundingClientRect()
        const repoint = snapToPoint(x, y, generateGrid(4))
        props.setPosition({
            x: repoint.x, 
            y: repoint.y
        })
        setUpdate(!update)
    }

    useEffect(() => {
        const { width, height } = (dragBox.current! as HTMLDivElement).getBoundingClientRect()
        triggerSnap()
        props.setConnector({
            x: props.position.x + (width / 2),
            y: props.position.y + (height / 2)
        })
    }, [update])

    return (
        <motion.div
            ref={dragBox}
            className="absolute w-[4rem] h-[4rem] bg-gray-800 rounded-lg cursor-grab z-[11]"
            drag
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
            dragConstraints={props.constraints}
            dragMomentum={false}
            animate={control}
        />
    )
}

function Grid() {
    return (
        <div className="absolute h-full w-full">
            <div className="w-full h-full bg-grid-pattern bg-grid-size">
            </div>
        </div>
    )
}

/*
    M (abs) initial point
    h (rel) initial horiz.
    c (rel) initial first curve
    v (rel) initial verti.
    v (rel) final verti.
    c (rel) final second curve
    M (abs) final point
    h (rel) final horiz.
*/

function Q1Connector(props: ConnectorProps & QuadrantProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.initial.x} ${props.initial.y}
            h ${props.dw} 
            c 40 0, 40 0, 40 -40 
            v ${-props.dh} 
            v ${-props.dh} 
            c 0 -40, 0 -40, 40 -40
            M ${props.final.x} ${props.final.y} 
            h ${-props.dw}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}

function Q2Connector(props: ConnectorProps & QuadrantProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.final.x} ${props.final.y}
            h ${props.dw} 
            c 40 0, 40 0, 40 40 
            v ${props.dh} 
            v ${props.dh} 
            c 0 40, 0 40, 40 40
            M ${props.initial.x} ${props.initial.y} 
            h ${-props.dw}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}

function Q3Connector(props: ConnectorProps & QuadrantProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.final.x} ${props.final.y}
            h ${props.dw} 
            c 40 0, 40 0, 40 -40 
            v ${-props.dh} 
            v ${-props.dh} 
            c 0 -40, 0 -40, 40 -40
            M ${props.initial.x} ${props.initial.y} 
            h ${-props.dw}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}


function Q4Connector(props: ConnectorProps & QuadrantProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.initial.x} ${props.initial.y}
            h ${props.dw} 
            c 40 0, 40 0, 40 40 
            v ${props.dh} 
            v ${props.dh} 
            c 0 40, 0 40, 40 40
            M ${props.final.x} ${props.final.y} 
            h ${-props.dw}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}

function HorizontalConnector(props: ConnectorProps & HorizontalProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.initial.x} ${props.initial.y}
            h ${props.initial.x > props.final.x ? -(props.dw + 40) : props.dw + 40}
            M ${props.final.x} ${props.final.y}
            h ${props.initial.x > props.final.x ? props.dw + 40 : -(props.dw + 40)}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}

function VerticalConnector(props: ConnectorProps & VerticalProps) {
    return (
        <svg className="absolute z-[10] w-screen h-screen" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 100% 100%`} fill="none">
            <path d={`
            M ${props.initial.x} ${props.initial.y}
            v ${props.initial.y > props.final.y ? -(props.dh + 40) : props.dh + 40}
            M ${props.final.x} ${props.final.y}
            v ${props.initial.y > props.final.y ? props.dh + 40 : -(props.dh + 40)}
            `} stroke="black" strokeWidth="2px"/>
        </svg>
    )
}

function Connector(props: ConnectorProps) {
    const dh = Math.abs((props.final.y - props.initial.y) / 2) - 40
    const dw = Math.abs((props.final.x - props.initial.x) / 2) - 40

    if (props.initial.y > props.final.y && props.initial.x < props.final.x) {
        return <Q1Connector {...props} dh={dh} dw={dw} />
    } else if (props.initial.y < props.final.y && props.initial.x < props.final.x) {
        return <Q4Connector {...props} dh={dh} dw={dw} />
    }

    if (props.initial.y > props.final.y && props.initial.x > props.final.x) {
        return <Q2Connector {...props} dh={dh} dw={dw} />
    } else if (props.initial.y < props.final.y && props.initial.x > props.final.x) {
        return <Q3Connector {...props} dh={dh} dw={dw} />
    }

    if (props.final.y - props.initial.y == 0) {
        return <HorizontalConnector {...props} dw={dw}/>
    } else if (props.final.x - props.initial.x == 0) {
        return <VerticalConnector {...props} dh={dh} />
    }
    
}

export default function Home() {
    const constraints = useRef(null)
    const [box1, setBox1] = useState({ x: 0, y: 0 })
    const [box2, setBox2] = useState({ x: 0, y: 0 })
    const [box3, setBox3] = useState({ x: 0, y: 0 })
    const [box4, setBox4] = useState({ x: 0, y: 0 })
    const [connectorInitial, setConnectorInitial] = useState({ x: 0, y: 0 })
    const [connectorFinal, setConnectorFinal] = useState({ x: 0, y: 0 })
    const [connectorFinal2, setConnectorFinal2] = useState({ x: 0, y: 0 })
    const [connectorFinal3, setConnectorFinal3] = useState({ x: 0, y: 0 })

    return (
        <div ref={constraints} className="flex h-screen w-screen overflow-scroll">
            <Grid />
            <DraggableBox 
                position={box1}
                setPosition={setBox1} 
                setConnector={setConnectorInitial}
                constraints={constraints}
            />
            <DraggableBox 
                position={box2}
                setPosition={setBox2} 
                setConnector={setConnectorFinal}
                constraints={constraints}
            />
            <DraggableBox 
                position={box3}
                setPosition={setBox3} 
                setConnector={setConnectorFinal2}
                constraints={constraints}
            />
            <DraggableBox 
                position={box4}
                setPosition={setBox4} 
                setConnector={setConnectorFinal3}
                constraints={constraints}
            />
            <Connector 
                initial={connectorInitial}
                final={connectorFinal}
            />
            <Connector 
                initial={connectorFinal}
                final={connectorFinal2}
            />
            <Connector 
                initial={connectorFinal2}
                final={connectorFinal3}
            />
            <Connector 
                initial={connectorFinal3}
                final={connectorInitial}
            />
        </div>
    )
}