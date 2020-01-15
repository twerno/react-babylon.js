import MaterialIcon from '@material/react-material-icon';
import TopAppBar, { TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from '@material/react-top-app-bar';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { IMeshOptions } from '../state/IMasterState';
import { MasterDispatcherType } from '../state/MasterStateReducer';
import { MaterialSidebarMenu } from './MaterialSidebarMenu';
import { MeshOptions } from './MeshOptions';

export interface IMaterialTopAppBarProps extends RouteComponentProps {
    meshOptions?: IMeshOptions;
    dispatch: MasterDispatcherType;
}

export const MaterialTopAppBar = withRouter<IMaterialTopAppBarProps, React.FC<IMaterialTopAppBarProps>>(
    (props) => {

        const [isMenuVisible, setMenuVisibility] = React.useState<boolean>(false);

        return (
            <>
                <TopAppBar>
                    <TopAppBarRow>
                        <TopAppBarSection align="start">
                            <TopAppBarIcon navIcon tabIndex={0}>
                                <MaterialIcon hasRipple icon="menu" onClick={() => setMenuVisibility(true)} />
                            </TopAppBarIcon>
                            <TopAppBarTitle>
                                Babylon.js examples
                        </TopAppBarTitle>
                        </TopAppBarSection>
                        <TopAppBarSection align="end" role="toolbar">
                            <MeshOptions {...props} />
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <MaterialSidebarMenu
                    isMenuVisible={isMenuVisible}
                    closeHandler={() => setMenuVisibility(false)}
                />
            </>
        );
    }
);
