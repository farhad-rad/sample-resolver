import { Framer as FramerNS } from '@/contracts/ui/framer'
import ContainerDimensions from '@/utilities/container'
import React from 'react'

const Framer: FramerNS.Component = ({ children }) => {
    const calculateFrameVars = (width: number, breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'huge') => {
        if (['sm', 'md'].includes(breakpoint)) {
            return { '--frame-size': width + 'px', '--frame-max-width': width + 'px', '--frame-cols': 1 } as React.CSSProperties
        }
        if (['lg'].includes(breakpoint)) {
            return { '--frame-size': Math.floor((width / 2) - (8 / 2)) + 'px', '--frame-max-width': width + 'px', '--frame-cols': 2 } as React.CSSProperties
        }
        if (['xl', '2xl'].includes(breakpoint)) {
            return { '--frame-size': Math.floor((width / 3) - (16 / 3)) + 'px', '--frame-max-width': width + 'px', '--frame-cols': 3 } as React.CSSProperties
        }
        return { '--frame-size': Math.floor((width / 4) - (24 / 4)) + 'px', '--frame-max-width': width + 'px', '--frame-cols': 4 } as React.CSSProperties
    }
    return (
        <ContainerDimensions>
            {
                ({ width, breakpoint }) => (
                    <div className='framer-flex' style={calculateFrameVars(width, breakpoint)}>
                        {children}
                    </div>
                )}
        </ContainerDimensions>
    )
}

export { Framer }