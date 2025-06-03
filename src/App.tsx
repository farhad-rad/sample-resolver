import React from 'react'
import Resolver from '@/resolver/Resolver'

const App: React.FC = ()=>{
    return (
        <Resolver.Card>
            <Resolver.CardHeader>
                <Resolver.CardTitle>
                    Welcome!
                </Resolver.CardTitle>
                <Resolver.CardDescription>
                    This is a nice sample of Resolver.
                </Resolver.CardDescription>
            </Resolver.CardHeader>
            <Resolver.CardContent>
                <Resolver.Button
                variant="dominant-filled"
                >
                    This is a nice button!
                </Resolver.Button>
            </Resolver.CardContent>
        </Resolver.Card>
    );
}
export default App;