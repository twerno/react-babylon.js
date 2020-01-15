import './MaterialSidebarMenu.css';
import '@material/react-list/dist/list.css';

import Drawer, { DrawerContent, DrawerHeader, DrawerSubtitle, DrawerTitle } from '@material/react-drawer';
import List, { ListDivider, ListGroupSubheader, ListItem, ListItemGraphic, ListItemText } from '@material/react-list';
import { ListItemTextProps } from '@material/react-list/dist/ListItemText';
import MaterialIcon from '@material/react-material-icon';
import React from 'react';
import { Link } from 'react-router-dom';

import { Path } from '../routes/Path';

export interface IMaterialSidebarMenuProps {
    isMenuVisible: boolean;
    closeHandler: () => void;
}

export const MaterialSidebarMenu: React.FC<IMaterialSidebarMenuProps> = (props) => {
    return (
        <div>
            <Drawer
                modal
                open={props.isMenuVisible}
                onClose={() => props.closeHandler()}
            >
                <DrawerHeader> {/*defaults to div*/}
                    <DrawerTitle tag="h2"> {/*defaults to h3*/}
                        Demo
                </DrawerTitle>
                    <DrawerSubtitle> {/*defaults to h6*/}
                        twerno@gmail.com
                    </DrawerSubtitle>
                </DrawerHeader>

                <DrawerContent tag="main">

                    <List>

                        <MenuItem
                            url={Path.homeUrl()}
                            icon="home"
                            primaryText="Home"
                        />

                        <MenuGroup>Basic shapes</MenuGroup>

                        <MenuItem
                            url={Path.sphereDemoUrl()}
                            icon="category"
                            primaryText="Sphere"
                        />

                        <MenuItem
                            url={Path.triangleMeshDemoPathUrl()}
                            icon="category"
                            primaryText="Mesh demo: triangle"
                        />

                        <MenuItem
                            url={Path.boxMeshDemoUrl()}
                            icon="category"
                            primaryText="Mesh demo: box"
                        />

                        <MenuItem
                            url={Path.boxMeshDemoUrl()}
                            icon="category"
                            primaryText="Mesh demo: box"
                        />

                        <MenuGroup>Parts</MenuGroup>

                        <MenuItem
                            url={Path.spartMeshDemoUrl()}
                            icon="directions_bike"
                            primaryText="Mesh demo: part"
                        />

                        <MenuItem
                            url={Path.previewMeshUrl()}
                            icon="cloud_upload"
                            primaryText="Upload an *.STL"
                        />

                    </List>
                </DrawerContent>
            </Drawer>
        </div >
    );
};

const MenuGroup: React.FC<{}> = (props) => (
    <>
        <ListDivider />
        <ListGroupSubheader tag="h6"> {/*defaults to h3*/}
            {props.children}
        </ListGroupSubheader>
    </>
);

interface IMenuItem extends ListItemTextProps {
    icon?: string;
    url: string;
}
const MenuItem: React.FC<IMenuItem> = (props) => (
    <Link className="MaterialSidebarItemMenu__link" to={props.url}>
        <ListItem>
            {props.icon && <ListItemGraphic graphic={<MaterialIcon icon={props.icon} />} />}
            <ListItemText {...props} />
        </ListItem>
    </Link>
);
