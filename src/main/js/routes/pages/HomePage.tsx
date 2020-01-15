import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import * as React from 'react';

export const HomePage: React.FC<{}> = () => (
    <div>
        <TopAppBarFixedAdjust>
            <p style={{ textAlign: 'center' }}>Home screen</p>
        </TopAppBarFixedAdjust>
    </div>
);
