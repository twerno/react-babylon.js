import './MainMenu.css';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { Path } from '../routes/Path';

export interface IMainMenuProps {
}

export const MainMenu: React.FC<IMainMenuProps> = (props) => {

    return (
        <div className="mainMenu">
            <button className="mainMenu__menuButton">Menu</button>
            <ul className="mainMenu__list">
                <MainMenuElement href={Path.homeUrl()}>
                    Home
                </MainMenuElement>

                <MainMenuElement href={Path.sphereDemoUrl()}>
                    Sphere
                </MainMenuElement>

                <MainMenuElement href={Path.triangleMeshDemoPathUrl()}>
                    Mesh demo: triangle
                </MainMenuElement>

                <MainMenuElement href={Path.boxMeshDemoUrl()}>
                    Mesh demo: box
                </MainMenuElement>
            </ul>
        </div>
    );
};

export interface IMainMenuElementProps {
    href: string;
    // pathname: string;
}

export const MainMenuElement: React.FC<IMainMenuElementProps> = (props) => {
    const isActive = document.location.pathname === props.href;

    const linkClasses = 'mainMenu__list__element'
        + (
            isActive
                ? ' mainMenu__list__element--active'
                : ''
        );

    return (
        <li className={linkClasses}>
            <Link className="mainMenu__list__element__link" to={props.href}>
                {props.children}
            </Link>
        </li>
    );
};
