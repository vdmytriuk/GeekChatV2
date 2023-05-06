import React, { FC, useState, useRef, useEffect } from 'react';

import "./Nav.scss";

interface INavProps {
    navItems: string[];
    onClick: any;
}

const Nav: FC<INavProps> = ({ navItems , onClick}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const slideRef = useRef<HTMLDivElement>(null);

    const handleClick = (index: number, text: string) => {
        onClick(text)
        setActiveIndex(index);
    };

    useEffect(() => {
        const slide = slideRef.current;
        const activeNavItem = slide?.parentNode?.querySelector('.nav__item_active') as HTMLDivElement;

        if (slide && activeNavItem) {
            slide.style.transform = `translateX(${activeNavItem.offsetLeft}px)`;
            slide.style.width = `${activeNavItem.offsetWidth}px`;
        }
    }, [activeIndex]);

    return (
        <nav className="nav">
            {navItems.map((navItem, index) => (
                <div
                    key={navItem}
                    onClick={() => handleClick(index, navItem)}
                    className={`nav__item ${index === activeIndex ? 'nav__item_active' : ''}`}
                >
                    <h3 className="small-text bold-weight">
                        {navItem}
                    </h3>
                </div>
            ))}
            <div ref={slideRef} className="nav__slide" />
        </nav>
    );
};

export default Nav;
