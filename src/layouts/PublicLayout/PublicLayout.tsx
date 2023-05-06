import './PublicLayout.scss';

export const PublicLayout = ({children}: {
    children: JSX.Element
        | JSX.Element[]
}) => {
    return (
        <div className="container container--public">
            <div className="column column--first">
                {children}
            </div>
        </div>
    );
};